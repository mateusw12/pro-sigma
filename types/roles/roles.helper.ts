import { UserRole } from './user-role.enum';

/**
 * Business Rule: Verificação de Admin
 * Determina se um role é de administrador
 *
 * @param role - Role a ser verificado
 * @returns true se o role é ADMIN
 */
export function isAdmin(role: UserRole): boolean {
  return role === UserRole.ADMIN;
}

/**
 * Business Rule: Verificação de Guest
 * Determina se um role é de visitante (não autenticado)
 *
 * @param role - Role a ser verificado
 * @returns true se o role é GUEST
 */
export function isGuest(role: UserRole): boolean {
  return role === UserRole.GUEST;
}

/**
 * Business Rule: Comparação de Roles
 * Compara dois roles para determinar qual é superior
 *
 * @param roleA - Primeiro role
 * @param roleB - Segundo role
 * @returns número negativo se A < B, 0 se A === B, positivo se A > B
 */
export function compareRoles(roleA: UserRole, roleB: UserRole): number {
  return roleA - roleB;
}

/**
 * Business Rule: Hierarquia de Permissões
 * Verifica se um role tem permissão suficiente baseado na hierarquia
 *
 * @param userRole - Role atual do usuário
 * @param requiredRole - Role mínimo necessário
 * @returns true se o usuário tem permissão (userRole >= requiredRole)
 *
 * @example
 * hasPermission(UserRole.PRO, UserRole.BASICO) // true - PRO tem acesso a BASICO
 * hasPermission(UserRole.BASICO, UserRole.PRO) // false - BASICO não tem acesso a PRO
 */
export function hasPermission(
  userRole: UserRole,
  requiredRole: UserRole,
): boolean {
  return userRole >= requiredRole;
}

/**
 * Validator: Verifica se um valor é um UserRole válido
 *
 * @param role - Valor a ser verificado
 * @returns true se é um UserRole válido
 */
export function isValidRole(role: number): role is UserRole {
  return Object.values(UserRole).includes(role);
}
