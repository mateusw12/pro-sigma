import { useAuth } from '@/hooks';
import { UserRole } from '@/types/roles';
import { ReactNode } from 'react';

interface HideForRoleProps {
  /** Se o usuário tiver este role ou superior, esconde o conteúdo */
  role: UserRole;
  /** Conteúdo a ser escondido */
  children: ReactNode;
}

/**
 * Componente para esconder conteúdo para determinados roles
 * Útil para esconder mensagens de upgrade para usuários premium
 *
 * @example
 * <HideForRole role={UserRole.PRO}>
 *   <UpgradeMessage />
 * </HideForRole>
 */
export function HideForRole({ role, children }: HideForRoleProps) {
  const { hasRole } = useAuth();

  if (hasRole(role)) {
    return null;
  }

  return <>{children}</>;
}
