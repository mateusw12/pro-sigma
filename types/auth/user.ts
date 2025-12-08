import { DefaultUser } from 'next-auth';
import { PlanType } from '../plan/plan-type.enum';

export interface User extends DefaultUser {
  id: string;
  email: string;
  name?: string;
  plan: PlanType;
  isAdmin?: boolean;
  createdAt?: Date;
}
