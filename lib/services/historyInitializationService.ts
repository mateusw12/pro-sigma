import { mockHistoryAnalyses } from '@/lib/data/mockHistory';
import { HistoryAnalysis } from '@/types/history';
import { analysisHistoryService } from './analysisHistoryService';

const INITIALIZED_KEY = 'pro_sigma_history_initialized';

export const historyInitializationService = {
  // Inicializar histórico com dados mock se ainda não foi feito
  initializeHistoryWithMockData: (): void => {
    if (typeof window === 'undefined') return;

    const isInitialized = localStorage.getItem(INITIALIZED_KEY);

    if (!isInitialized) {
      // Limpar histórico anterior
      analysisHistoryService.clearHistory();

      // Salvar todas as análises mock
      mockHistoryAnalyses.forEach((analysis) => {
        analysisHistoryService.saveAnalysis(analysis);
      });

      // Marcar como inicializado
      localStorage.setItem(INITIALIZED_KEY, 'true');
    }
  },

  // Resetar histórico para os dados mock (útil para desenvolvimento/testes)
  resetToMockData: (): void => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(INITIALIZED_KEY);
    analysisHistoryService.clearHistory();
    mockHistoryAnalyses.forEach((analysis) => {
      analysisHistoryService.saveAnalysis(analysis);
    });
    localStorage.setItem(INITIALIZED_KEY, 'true');
  },

  // Adicionar mais dados mock (para simular novas análises)
  addMoreMockData: (): void => {
    if (typeof window === 'undefined') return;

    mockHistoryAnalyses.forEach((analysis) => {
      const newAnalysis: HistoryAnalysis = {
        ...analysis,
        id: `${analysis.id}_${Date.now()}`,
        executedAt: new Date(),
      };
      analysisHistoryService.saveAnalysis(newAnalysis);
    });
  },

  // Verificar se já foi inicializado
  isInitialized: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(INITIALIZED_KEY);
  },
};
