import { MOCK_NORMALIZATION_TEST } from '@/lib/backend-mock/normalization-test';
import { MOCK_SIMPLE_REGRESSION } from '@/lib/backend-mock/simple-regression';
import { MOCK_SPACE_FILLING } from '@/lib/backend-mock/space-filling';
import { MOCK_STATISTIC_DESCRIPTIVE } from '@/lib/backend-mock/statistic-descriptive';
import { mockHistoryFiles } from '@/lib/data/mockHistory';
import { HistoryAnalysis } from '@/types/history';
import { analysisHistoryService } from './analysisHistoryService';

export const analysisExecutionService = {
  // Executar análise estatística descritiva
  executeDescriptiveStats: (
    fileId: string,
    selectedColumns: string[],
  ): HistoryAnalysis => {
    const startTime = Date.now();
    const file = mockHistoryFiles.find((f) => f.id === fileId);

    const analysis: HistoryAnalysis = {
      id: analysisHistoryService.generateId(),
      name: `Análise Descritiva - ${selectedColumns.join(', ')}`,
      type: 'Estatística Descritiva',
      fileId: fileId,
      fileName: file?.fileName || 'Unknown',
      executedAt: new Date(),
      selectedColumns,
      results: MOCK_STATISTIC_DESCRIPTIVE.result,
      status: 'completed',
      duration: Date.now() - startTime,
    };

    analysisHistoryService.saveAnalysis(analysis);
    return analysis;
  },

  // Executar regressão simples
  executeSimpleRegression: (
    fileId: string,
    selectedColumns: string[],
  ): HistoryAnalysis => {
    const startTime = Date.now();
    const file = mockHistoryFiles.find((f) => f.id === fileId);

    const analysis: HistoryAnalysis = {
      id: analysisHistoryService.generateId(),
      name: `Regressão Linear - ${selectedColumns.join(' vs ')}`,
      type: 'Regressão Simples',
      fileId: fileId,
      fileName: file?.fileName || 'Unknown',
      executedAt: new Date(),
      selectedColumns,
      results: {
        rSquared:
          MOCK_SIMPLE_REGRESSION.analiseVarianca.sQuadrados.modelo /
          MOCK_SIMPLE_REGRESSION.analiseVarianca.sQuadrados.total,
        slope: MOCK_SIMPLE_REGRESSION.betaUm,
        intercept: MOCK_SIMPLE_REGRESSION.betaZero,
        fRatio: MOCK_SIMPLE_REGRESSION.analiseVarianca.fRatio,
        probF: MOCK_SIMPLE_REGRESSION.analiseVarianca.probF,
      },
      status: 'completed',
      duration: Date.now() - startTime,
    };

    analysisHistoryService.saveAnalysis(analysis);
    return analysis;
  },

  // Executar teste de normalização
  executeNormalizationTest: (
    fileId: string,
    selectedColumns: string[],
  ): HistoryAnalysis => {
    const startTime = Date.now();
    const file = mockHistoryFiles.find((f) => f.id === fileId);

    const analysis: HistoryAnalysis = {
      id: analysisHistoryService.generateId(),
      name: `Teste de Normalidade - ${selectedColumns.join(', ')}`,
      type: 'Teste de Normalização',
      fileId: fileId,
      fileName: file?.fileName || 'Unknown',
      executedAt: new Date(),
      selectedColumns,
      results: MOCK_NORMALIZATION_TEST.result,
      status: 'completed',
      duration: Date.now() - startTime,
    };

    analysisHistoryService.saveAnalysis(analysis);
    return analysis;
  },

  // Executar space filling design
  executeSpaceFillingDesign: (
    fileId: string,
    selectedColumns: string[],
  ): HistoryAnalysis => {
    const startTime = Date.now();
    const file = mockHistoryFiles.find((f) => f.id === fileId);

    const analysis: HistoryAnalysis = {
      id: analysisHistoryService.generateId(),
      name: `Space Filling Design - ${selectedColumns.join(', ')}`,
      type: 'Space Filling',
      fileId: fileId,
      fileName: file?.fileName || 'Unknown',
      executedAt: new Date(),
      selectedColumns,
      results: MOCK_SPACE_FILLING.spaceFilling,
      status: 'completed',
      duration: Date.now() - startTime,
    };

    analysisHistoryService.saveAnalysis(analysis);
    return analysis;
  },

  // Executar análise genérica com nome customizado
  executeCustomAnalysis: (
    analysisType: string,
    fileId: string,
    selectedColumns: string[],
    results: any,
  ): HistoryAnalysis => {
    const startTime = Date.now();
    const file = mockHistoryFiles.find((f) => f.id === fileId);

    const analysis: HistoryAnalysis = {
      id: analysisHistoryService.generateId(),
      name: `${analysisType} - ${selectedColumns.join(', ')}`,
      type: analysisType,
      fileId: fileId,
      fileName: file?.fileName || 'Unknown',
      executedAt: new Date(),
      selectedColumns,
      results,
      status: 'completed',
      duration: Date.now() - startTime,
    };

    analysisHistoryService.saveAnalysis(analysis);
    return analysis;
  },
};
