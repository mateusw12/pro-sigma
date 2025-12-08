'use client';

import { useAuth } from '@/hooks';
import { UserRole, getRoleName } from '@/types/roles';
import { CrownOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { UpgradeContainer, UpgradeDescription, UpgradeTitle } from './styled';

interface RequireRoleProps {
  /** Role mínimo necessário para ver o conteúdo */
  requiredRole: UserRole;
  /** Conteúdo a ser exibido se o usuário tiver permissão */
  children: ReactNode;
  /** Mensagem customizada quando não tem permissão */
  fallbackMessage?: string;
  /** Tipo de fallback: 'alert' | 'upgrade-card' | 'hidden' */
  fallbackType?: 'alert' | 'upgrade-card' | 'hidden';
}

/**
 * Componente para mostrar conteúdo condicional baseado em role
 * Útil para esconder/mostrar recursos dentro de páginas
 *
 * @example
 * <RequireRole requiredRole={UserRole.PRO}>
 *   <AdvancedFeature />
 * </RequireRole>
 */
export function RequireRole({
  requiredRole,
  children,
  fallbackMessage,
  fallbackType = 'alert',
}: RequireRoleProps) {
  const { hasRole, isAdmin } = useAuth();
  const router = useRouter();

  // Admin tem acesso a tudo
  if (isAdmin || hasRole(requiredRole)) {
    return <>{children}</>;
  }

  // Ocultar completamente
  if (fallbackType === 'hidden') {
    return null;
  }

  const requiredRoleName = getRoleName(requiredRole);
  const defaultMessage = `Este recurso está disponível apenas para o plano ${requiredRoleName} ou superior.`;
  const message = fallbackMessage || defaultMessage;

  // Mostrar alerta simples
  if (fallbackType === 'alert') {
    return (
      <Alert
        message="Recurso Bloqueado"
        description={message}
        type="warning"
        icon={<LockOutlined />}
        showIcon
        action={
          <Button
            type="primary"
            size="small"
            onClick={() => router.push('/plans')}
          >
            Ver Planos
          </Button>
        }
      />
    );
  }

  // Mostrar card de upgrade premium
  return (
    <UpgradeContainer>
      <CrownOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
      <UpgradeTitle>Recurso Premium</UpgradeTitle>
      <UpgradeDescription>{message}</UpgradeDescription>
      <Button
        type="primary"
        size="large"
        onClick={() => router.push('/plans')}
        style={{ backgroundColor: 'white', color: '#764ba2', border: 'none' }}
      >
        Fazer Upgrade
      </Button>
    </UpgradeContainer>
  );
}
