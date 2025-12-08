import { useAuth } from '@/hooks';
import { UserRole } from '@/types/roles';
import { ReactNode } from 'react';

interface ShowForRoleProps {
  /** Se o usuário tiver este role ou superior, mostra o conteúdo */
  role: UserRole;
  /** Conteúdo a ser mostrado */
  children: ReactNode;
}

export function ShowForRole({ role, children }: ShowForRoleProps) {
  const { hasRole } = useAuth();

  if (!hasRole(role)) {
    return null;
  }

  return <>{children}</>;
}
