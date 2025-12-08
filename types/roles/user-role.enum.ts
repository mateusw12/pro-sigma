/**
 * Enumeração de roles/papéis de usuário com hierarquia
 * Domain Entity: Representa os níveis de permissão do sistema
 * Quanto maior o número, maior o nível de permissão
 */

export enum UserRole {
  GUEST = 0,
  BASICO = 1,
  INTERMEDIARIO = 2,
  PRO = 3,
  ADMIN = 4,
}

/**
 * Value Object: Nomes legíveis dos roles
 */
export const ROLE_NAMES: Readonly<Record<UserRole, string>> = {
  [UserRole.GUEST]: 'Visitante',
  [UserRole.BASICO]: 'Básico',
  [UserRole.INTERMEDIARIO]: 'Intermediário',
  [UserRole.PRO]: 'Profissional',
  [UserRole.ADMIN]: 'Administrador',
} as const;

/**
 * Use Case: Obter nome formatado do Role
 *
 * @param role - UserRole
 * @returns Nome legível do role
 */
export function getRoleName(role: UserRole): string {
  return ROLE_NAMES[role];
}
