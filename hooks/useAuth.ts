'use client';

import { useSession } from 'next-auth/react';
import type { Session } from '@/types/auth';

export interface UseAuthReturn {
  user: Session['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  plan: string | null;
}

/**
 * Hook para obter informações do usuário autenticado
 * @returns {UseAuthReturn} Informações do usuário e estado de autenticação
 */
export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated' && !!session?.user;

  return {
    user: session?.user ?? null,
    isAuthenticated,
    isLoading,
    isAdmin: session?.user?.isAdmin ?? false,
    plan: session?.user?.plan ?? null,
  };
}
