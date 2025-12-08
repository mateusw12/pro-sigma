export interface User {
  id: string;
  email: string;
  name?: string;
  plan: 'basico' | 'intermediario' | 'pro';
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AnalysisData {
  id: string;
  name: string;
  type: string;
  data: any;
  createdAt: Date;
  userId: string;
}
