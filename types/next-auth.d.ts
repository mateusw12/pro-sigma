import 'next-auth';
import 'next-auth/jwt';
import { PlanType } from './auth/auth';
import { UserRole } from './roles';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      plan: PlanType;
      role?: UserRole;
      isAdmin?: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    plan: PlanType;
    role?: UserRole;
    isAdmin?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    plan: PlanType;
    role?: UserRole;
    email: string;
    name?: string;
    isAdmin?: boolean;
  }
}
