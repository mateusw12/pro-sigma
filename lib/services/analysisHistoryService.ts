import { HistoryAnalysis } from '@/types/history';

// Simular localStorage para armazenar histórico
const HISTORY_KEY = 'pro_sigma_analysis_history';

export const analysisHistoryService = {
  // Obter histórico do localStorage
  getAnalysisHistory: (): HistoryAnalysis[] => {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  // Salvar uma nova análise no histórico
  saveAnalysis: (analysis: HistoryAnalysis): void => {
    if (typeof window === 'undefined') return;

    const history = analysisHistoryService.getAnalysisHistory();
    history.push(analysis);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  },

  // Salvar múltiplas análises
  saveAnalyses: (analyses: HistoryAnalysis[]): void => {
    if (typeof window === 'undefined') return;

    const history = analysisHistoryService.getAnalysisHistory();
    history.push(...analyses);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  },

  // Obter uma análise específica por ID
  getAnalysisById: (id: string): HistoryAnalysis | undefined => {
    const history = analysisHistoryService.getAnalysisHistory();
    return history.find((a) => a.id === id);
  },

  // Atualizar uma análise
  updateAnalysis: (id: string, updated: Partial<HistoryAnalysis>): void => {
    if (typeof window === 'undefined') return;

    const history = analysisHistoryService.getAnalysisHistory();
    const index = history.findIndex((a) => a.id === id);
    if (index !== -1) {
      history[index] = { ...history[index], ...updated };
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  },

  // Deletar uma análise
  deleteAnalysis: (id: string): void => {
    if (typeof window === 'undefined') return;

    const history = analysisHistoryService.getAnalysisHistory();
    const filtered = history.filter((a) => a.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  },

  // Limpar todo o histórico
  clearHistory: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(HISTORY_KEY);
  },

  // Gerar ID único
  generateId: (): string => {
    return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },
};
