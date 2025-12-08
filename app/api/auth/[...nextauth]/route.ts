import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from '@/lib/api/axios';
import type { User } from '@/types/auth';
import { findUserByCredentials } from '@/lib/data/mockUsers';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Primeiro tenta autenticar com usuários mockados (desenvolvimento)
        const mockUser = findUserByCredentials(credentials.email, credentials.password);
        if (mockUser) {
          console.log('✅ Login com usuário mockado:', mockUser.email);
          return mockUser;
        }

        // Se não encontrou no mock, tenta na API (produção)
        try {
          const response = await api.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.data && response.data.user) {
            return {
              id: response.data.user.id,
              email: response.data.user.email,
              name: response.data.user.name,
              plan: response.data.user.plan,
              isAdmin: response.data.user.isAdmin,
            };
          }
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = user.plan;
        token.email = user.email;
        token.name = user.name;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.plan = token.plan;
        session.user.email = token.email ?? '';
        session.user.name = token.name;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
