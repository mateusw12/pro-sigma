'use client';

import { HistoryInitializer } from '@/components/history';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <HistoryInitializer />
      {children}
    </SessionProvider>
  );
}
