import { PlanType } from '../plan/plan-type.enum';
import { UserRole } from './user-role.enum';

/**
 * Value Object: Mapeamento inverso de UserRole para PlanType
 */
export const ROLE_PLAN_MAPPING: Readonly<Record<UserRole, PlanType | 'guest'>> =
  {
    [UserRole.GUEST]: 'guest',
    [UserRole.BASICO]: PlanType.BASICO,
    [UserRole.INTERMEDIARIO]: PlanType.INTERMEDIARIO,
    [UserRole.PRO]: PlanType.PRO,
    [UserRole.ADMIN]: PlanType.ADMIN,
  } as const;

/**
 * Value Object: Mapeamento inverso de UserRole para PlanType
 */
export const PLAN_ROLE_MAPPING: Readonly<Record<PlanType, UserRole | 'guest'>> =
  {
    [PlanType.BASICO]: UserRole.BASICO,
    [PlanType.INTERMEDIARIO]: UserRole.INTERMEDIARIO,
    [PlanType.PRO]: UserRole.PRO,
    [PlanType.ADMIN]: UserRole.ADMIN,
  } as const;
