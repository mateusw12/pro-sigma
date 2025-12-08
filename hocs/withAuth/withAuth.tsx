'use client';

import { ComponentType, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Spin, Result, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { UserRole, getRoleFromPlan, getRoleName, hasPermission } from '@/types/roles';
import { LoadingContainer, AccessDeniedContainer } from './styled';

export interface WithAuthOptions {
  /**
   * Role mínimo necessário para acessar a página
   * @default UserRole.BASICO - Requer autenticação básica
   */
  requiredRole?: UserRole;

  /**
   * Se true, redireciona para signin quando não autenticado
   * Se false, mostra mensagem de acesso negado
   * @default true
   */
  redirectToSignin?: boolean;

  /**
   * URL de redirecionamento customizado quando não autenticado
   * @default '/auth/signin'
   */
  redirectUrl?: string;

  /**
   * Se true, permite acesso apenas para admin
   * @default false
   */
  adminOnly?: boolean;

  /**
   * Callback chamado quando o usuário não tem permissão
   */
  onAccessDenied?: () => void;
}

/**
 * HOC para proteção de rotas com controle de acesso baseado em roles
 *
 * @example
 * // Requer autenticação básica
 * export default withAuth(MyComponent);
 *
 * @example
 * // Requer plano PRO ou superior
 * export default withAuth(MyComponent, { requiredRole: UserRole.PRO });
 *
 * @example
 * // Apenas admin
 * export default withAuth(AdminPanel, { adminOnly: true });
 *
 * @example
 * // Sem redirecionamento, apenas mostra erro
 * export default withAuth(MyComponent, { redirectToSignin: false });
 */
export function withAuth<P extends object>(
  Component: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const {
    requiredRole = UserRole.BASICO,
    redirectToSignin = true,
    redirectUrl = '/auth/signin',
    adminOnly = false,
    onAccessDenied,
  } = options;

  return function WithAuthComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isLoading = status === 'loading';
    const isAuthenticated = status === 'authenticated' && !!session?.user;

    // Determinar role do usuário
    const userRole = isAuthenticated
      ? session?.user?.isAdmin
        ? UserRole.ADMIN
        : getRoleFromPlan(session?.user?.plan)
      : UserRole.GUEST;

    // Verificar permissão
    const effectiveRequiredRole = adminOnly ? UserRole.ADMIN : requiredRole;
    const hasAccess = hasPermission(userRole, effectiveRequiredRole);

    useEffect(() => {
      if (isLoading) return;

      // Não autenticado
      if (!isAuthenticated && redirectToSignin) {
        const currentPath = window.location.pathname;
        const redirectPath = `${redirectUrl}?callbackUrl=${encodeURIComponent(currentPath)}`;
        router.push(redirectPath);
        return;
      }

      // Autenticado mas sem permissão
      if (isAuthenticated && !hasAccess) {
        onAccessDenied?.();
      }
    }, [isLoading, isAuthenticated, hasAccess, router]);

    // Loading state
    if (isLoading) {
      return (
        <LoadingContainer>
          <Spin size="large" tip="Carregando..." />
        </LoadingContainer>
      );
    }

    // Não autenticado e não redireciona
    if (!isAuthenticated && !redirectToSignin) {
      return (
        <AccessDeniedContainer>
          <Result
            status="403"
            icon={<LockOutlined style={{ fontSize: '72px', color: '#1890ff' }} />}
            title="Autenticação Necessária"
            subTitle="Você precisa estar autenticado para acessar esta página."
            extra={
              <Button type="primary" onClick={() => router.push(redirectUrl)}>
                Fazer Login
              </Button>
            }
          />
        </AccessDeniedContainer>
      );
    }

    // Não autenticado e deve redirecionar (aguarda redirecionamento)
    if (!isAuthenticated) {
      return null;
    }

    // Autenticado mas sem permissão suficiente
    if (!hasAccess) {
      const requiredRoleName = getRoleName(effectiveRequiredRole);
      const userRoleName = getRoleName(userRole);

      return (
        <AccessDeniedContainer>
          <Result
            status="403"
            icon={<LockOutlined style={{ fontSize: '72px', color: '#ff4d4f' }} />}
            title="Acesso Restrito"
            subTitle={
              adminOnly
                ? 'Esta página está disponível apenas para administradores.'
                : `Esta página requer o plano ${requiredRoleName} ou superior. Seu plano atual: ${userRoleName}`
            }
            extra={
              !adminOnly && (
                <Button type="primary" onClick={() => router.push('/plans')}>
                  Ver Planos
                </Button>
              )
            }
          />
        </AccessDeniedContainer>
      );
    }

    // Usuário autenticado e com permissão
    return <Component {...props} />;
  };
}

/**
 * Alias para withAuth com adminOnly: true
 * @example
 * export default withAdminAuth(AdminPanel);
 */
export function withAdminAuth<P extends object>(Component: ComponentType<P>) {
  return withAuth(Component, { adminOnly: true });
}

/**
 * Alias para withAuth sem redirecionamento automático
 * @example
 * export default withOptionalAuth(MyComponent);
 */
export function withOptionalAuth<P extends object>(
  Component: ComponentType<P>,
  options: Omit<WithAuthOptions, 'redirectToSignin'> = {}
) {
  return withAuth(Component, { ...options, redirectToSignin: false });
}
