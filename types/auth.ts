import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

export type PlanType = "basico" | "intermediario" | "pro" | "admin";

export interface User extends DefaultUser {
  id: string;
  email: string;
  name?: string;
  plan: PlanType;
  isAdmin?: boolean;
  createdAt?: Date;
}

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
