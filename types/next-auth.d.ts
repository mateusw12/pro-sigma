import 'next-auth';
import 'next-auth/jwt';
import { PlanType } from './auth/auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      plan: PlanType;
      isAdmin?: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    plan: PlanType;
    isAdmin?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    plan: PlanType;
    email: string;
    name?: string;
    isAdmin?: boolean;
  }
}
