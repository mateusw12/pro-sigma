import { UserRole } from "@/types/roles";

/**
 * Verifica se um role tem permissão suficiente
 */
export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  return userRole >= requiredRole;
}
