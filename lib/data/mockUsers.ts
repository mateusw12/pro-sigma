import { User } from '@/types/auth';
import { PlanType } from '@/types/plan';
import { UserRole } from '@/types/roles';

// Usuários mockados para desenvolvimento (remover em produção)
export const mockUsers: Array<User & { password: string; role: UserRole }> = [
  {
    id: '1',
    email: 'admin@prosigma.com',
    password: 'admin123',
    name: 'Administrador',
    plan: PlanType.ADMIN,
    role: UserRole.ADMIN,
    isAdmin: true,
    createdAt: new Date('2025-01-01'),
  },
  {
    id: '2',
    email: 'teste@prosigma.com',
    password: 'teste123',
    name: 'Usuário Teste Pro',
    plan: PlanType.PRO,
    role: UserRole.PRO,
    isAdmin: false,
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '3',
    email: 'intermediario@prosigma.com',
    password: 'inter123',
    name: 'Usuário Intermediário',
    plan: PlanType.INTERMEDIARIO,
    role: UserRole.INTERMEDIARIO,
    isAdmin: false,
    createdAt: new Date('2025-02-01'),
  },
  {
    id: '4',
    email: 'basico@prosigma.com',
    password: 'basico123',
    name: 'Usuário Básico',
    plan: PlanType.BASICO,
    role: UserRole.BASICO,
    isAdmin: false,
    createdAt: new Date('2025-02-10'),
  },
];

// Função auxiliar para buscar usuário por email e senha
export const findUserByCredentials = (
  email: string,
  password: string,
): User | null => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) return null;

  // Retorna usuário sem a senha e role (role não faz parte do tipo User)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, role: __, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
