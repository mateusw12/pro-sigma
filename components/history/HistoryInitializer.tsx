'use client';

import { historyInitializationService } from '@/lib/services/historyInitializationService';
import { useEffect } from 'react';

export const HistoryInitializer = () => {
  useEffect(() => {
    // Inicializar histórico com dados mock na primeira execução
    historyInitializationService.initializeHistoryWithMockData();
  }, []);

  return null;
};
