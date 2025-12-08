'use client';

import type { Session } from '@/types/auth/auth';
import { getRoleFromPlan, isAdmin, UserRole } from '@/types/roles';
import { useSession } from 'next-auth/react';

/**
 * Verifica se um role tem permissão suficiente
 */
function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  return userRole >= requiredRole;
}

export interface UseAuthReturn {
  user: Session['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  plan: string | null;
  role: UserRole;
  hasRole: (requiredRole: UserRole) => boolean;
}

/**
 * Hook para obter informações do usuário autenticado
 * @returns {UseAuthReturn} Informações do usuário e estado de autenticação
 */
export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated' && !!session?.user;

  // Determinar role do usuário
  const role = isAuthenticated
    ? session?.user?.isAdmin
      ? UserRole.ADMIN
      : getRoleFromPlan(session?.user?.plan)
    : UserRole.GUEST;

  /**
   * Verifica se o usuário tem um role específico ou superior
   */
  const hasRole = (requiredRole: UserRole): boolean => {
    return hasPermission(role, requiredRole);
  };

  return {
    user: session?.user ?? null,
    isAuthenticated,
    isLoading,
    isAdmin: isAdmin(role),
    plan: session?.user?.plan ?? null,
    role,
    hasRole,
  };
}
