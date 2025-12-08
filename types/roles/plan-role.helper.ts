


// ============================================================================
// APPLICATION LAYER - Use Cases / Services
// ============================================================================

import { PlanType } from "../auth";
import { isPlanType, normalizeStringToPlan } from "../plan/plan.helper";
import { PLAN_ROLE_MAPPING, ROLE_PLAN_MAPPING } from "./role-plan.mapper";
import { UserRole } from "./user-role.enum";

/**
 * Use Case: Converter Plan para Role
 * Obtém o role correspondente a um plano
 *
 * @param plan - Plano do usuário (PlanType ou string)
 * @returns UserRole correspondente ou GUEST se inválido
 */
export function getRoleFromPlan(plan: string | PlanType | null | undefined): UserRole {
  if (!plan) return UserRole.GUEST;

  // Normaliza para PlanType se for string
  const planType = isPlanType(plan) ? plan : normalizeStringToPlan(plan);

  if (!planType) return UserRole.GUEST;

  return PLAN_ROLE_MAPPING[planType] ?? UserRole.GUEST;
}

/**
 * Use Case: Converter Role para Plan
 * Obtém o plano correspondente a um role
 *
 * @param role - Role do usuário
 * @returns PlanType correspondente ou 'guest'
 */
export function getPlanFromRole(role: UserRole): PlanType | 'guest' {
  return ROLE_PLAN_MAPPING[role];
}

/**
 * Use Case: Verificar se upgrade é possível
 *
 * @param currentRole - Role atual
 * @param targetPlan - Plano desejado
 * @returns true se o upgrade é válido
 */
export function canUpgradeTo(currentRole: UserRole, targetPlan: PlanType): boolean {
  const targetRole = getRoleFromPlan(targetPlan);
  return targetRole > currentRole && targetRole !== UserRole.ADMIN;
}

/**
 * Use Case: Verificar se downgrade é possível
 *
 * @param currentRole - Role atual
 * @param targetPlan - Plano desejado
 * @returns true se o downgrade é válido
 */
export function canDowngradeTo(currentRole: UserRole, targetPlan: PlanType): boolean {
  const targetRole = getRoleFromPlan(targetPlan);
  return targetRole < currentRole && currentRole !== UserRole.ADMIN;
}
