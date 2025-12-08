import { User } from '@/types/auth';

// Usuários mockados para desenvolvimento (remover em produção)
export const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@prosigma.com',
    password: 'admin123',
    name: 'Administrador',
    plan: 'admin',
    isAdmin: true,
    createdAt: new Date('2025-01-01'),
  },
  {
    id: '2',
    email: 'teste@prosigma.com',
    password: 'teste123',
    name: 'Usuário Teste Pro',
    plan: 'pro',
    isAdmin: false,
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '3',
    email: 'intermediario@prosigma.com',
    password: 'inter123',
    name: 'Usuário Intermediário',
    plan: 'intermediario',
    isAdmin: false,
    createdAt: new Date('2025-02-01'),
  },
  {
    id: '4',
    email: 'basico@prosigma.com',
    password: 'basico123',
    name: 'Usuário Básico',
    plan: 'basico',
    isAdmin: false,
    createdAt: new Date('2025-02-10'),
  },
];

// Função auxiliar para buscar usuário por email e senha
export const findUserByCredentials = (email: string, password: string): User | null => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) return null;

  // Retorna usuário sem a senha
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
