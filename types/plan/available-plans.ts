import { PlanType } from "./plan-type.enum";

 /**
 * Value Object: Lista de planos disponíveis para assinatura (exceto admin)
 */
export const AVAILABLE_PLANS: readonly PlanType[] = [
  PlanType.BASICO,
  PlanType.INTERMEDIARIO,
  PlanType.PRO,
] as const;
