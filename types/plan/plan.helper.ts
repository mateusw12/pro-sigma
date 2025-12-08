import { getPlanFromRole } from '../roles/plan-role.helper';
import { UserRole } from '../roles/user-role.enum';
import { PLAN_NAMES, PlanType } from './plan-type.enum';

/**
 * Use Case: Obter nome formatado do Plan
 *
 * @param plan - PlanType ou string
 * @returns Nome legível do plano
 */
export function getPlanName(plan: PlanType | string): string {
  if (isPlanType(plan)) {
    return PLAN_NAMES[plan];
  }

  const planType = normalizeStringToPlan(plan);
  return planType ? PLAN_NAMES[planType] : plan;
}

/**
 * Use Case: Calcular próximo upgrade disponível
 *
 * @param currentRole - Role atual do usuário
 * @returns Próximo PlanType disponível ou null se já está no máximo
 */
export function getNextUpgrade(currentRole: UserRole): PlanType | null {
  if (currentRole >= UserRole.PRO) return null;

  const nextRoleValue = currentRole + 1;
  const nextRole = nextRoleValue as UserRole;
  const nextPlan = getPlanFromRole(nextRole);

  return nextPlan === 'guest' ? null : nextPlan;
}
/*
 * Validator: Verifica se um valor é um PlanType válido
 *
 * @param plan - Valor a ser verificado
 * @returns Type guard para PlanType
 */
export function isValidPlan(plan: string): plan is PlanType {
  return Object.values(PlanType).includes(plan as PlanType);
}

/**
 * Helper: Type guard para PlanType
 *
 * @param value - Valor a ser verificado
 * @returns true se o valor é PlanType
 */
export function isPlanType(value: unknown): value is PlanType {
  return (
    typeof value === 'string' &&
    Object.values(PlanType).includes(value as PlanType)
  );
}

/**
 * Helper: Normaliza string para PlanType
 *
 * @param plan - String do plano
 * @returns PlanType se válido, null caso contrário
 */
export function normalizeStringToPlan(plan: string): PlanType | null {
  const planLower = plan.toLowerCase();

  // Mapeamento de strings legadas
  const legacyMapping: Record<string, PlanType> = {
    basico: PlanType.BASICO,
    básico: PlanType.BASICO,
    intermediario: PlanType.INTERMEDIARIO,
    intermediário: PlanType.INTERMEDIARIO,
    pro: PlanType.PRO,
    professional: PlanType.PRO,
    profissional: PlanType.PRO,
    admin: PlanType.ADMIN,
    administrator: PlanType.ADMIN,
    administrador: PlanType.ADMIN,
  };

  return legacyMapping[planLower] ?? null;
}
