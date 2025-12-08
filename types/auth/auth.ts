import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PlanType } from "../plan/plan-type.enum";
import { User } from "./user";


export interface Session extends DefaultSession {
  user: {
    id: string;
    email: string;
    name?: string;
    plan: PlanType;
  } & DefaultSession["user"];
}

export interface JWTToken extends JWT {
  id: string;
  plan: PlanType;
  email: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  plan: PlanType;
}
