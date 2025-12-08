/**
 * Enumeração de planos disponíveis
 * Domain Entity: Representa os tipos de planos do sistema
 */
export enum PlanType {
  BASICO = 'basico',
  INTERMEDIARIO = 'intermediario',
  PRO = 'pro',
  ADMIN = 'admin',
}

/**
 * Value Object: Nomes legíveis dos planos
 */
export const PLAN_NAMES: Readonly<Record<PlanType, string>> = {
  [PlanType.BASICO]: 'Básico',
  [PlanType.INTERMEDIARIO]: 'Intermediário',
  [PlanType.PRO]: 'Profissional',
  [PlanType.ADMIN]: 'Administrador',
} as const;
