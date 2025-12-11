import { analysisHistoryService } from '@/lib/services/analysisHistoryService';
import { historyInitializationService } from '@/lib/services/historyInitializationService';
import { HistoryAnalysis } from '@/types/history';
import { useEffect, useState } from 'react';

export const useAnalysisHistory = () => {
  const [history, setHistory] = useState<HistoryAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar histórico ao montar
  useEffect(() => {
    setIsLoading(true);

    // Inicializar com dados mock se for a primeira vez
    historyInitializationService.initializeHistoryWithMockData();

    const data = analysisHistoryService.getAnalysisHistory();
    setHistory(data);
    setIsLoading(false);
  }, []);

  const saveAnalysis = (analysis: HistoryAnalysis) => {
    analysisHistoryService.saveAnalysis(analysis);
    setHistory((prev) => [...prev, analysis]);
  };

  const updateAnalysis = (id: string, updated: Partial<HistoryAnalysis>) => {
    analysisHistoryService.updateAnalysis(id, updated);
    setHistory((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a)),
    );
  };

  const deleteAnalysis = (id: string) => {
    analysisHistoryService.deleteAnalysis(id);
    setHistory((prev) => prev.filter((a) => a.id !== id));
  };

  const getAnalysisById = (id: string) => {
    return history.find((a) => a.id === id);
  };

  const clearHistory = () => {
    analysisHistoryService.clearHistory();
    setHistory([]);
  };

  return {
    history,
    isLoading,
    saveAnalysis,
    updateAnalysis,
    deleteAnalysis,
    getAnalysisById,
    clearHistory,
  };
};
