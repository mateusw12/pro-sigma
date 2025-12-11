import { analysisExecutionService } from '@/lib/services';
import { HistoryAnalysis } from '@/types/history';

export const useAnalysisExecution = () => {
  const executeDescriptiveStats = (fileId: string, columns: string[]) => {
    return analysisExecutionService.executeDescriptiveStats(fileId, columns);
  };

  const executeSimpleRegression = (fileId: string, columns: string[]) => {
    return analysisExecutionService.executeSimpleRegression(fileId, columns);
  };

  const executeNormalizationTest = (fileId: string, columns: string[]) => {
    return analysisExecutionService.executeNormalizationTest(fileId, columns);
  };

  const executeSpaceFillingDesign = (fileId: string, columns: string[]) => {
    return analysisExecutionService.executeSpaceFillingDesign(fileId, columns);
  };

  const executeCustomAnalysis = (
    analysisType: string,
    fileId: string,
    columns: string[],
    results: any,
  ): HistoryAnalysis => {
    return analysisExecutionService.executeCustomAnalysis(
      analysisType,
      fileId,
      columns,
      results,
    );
  };

  return {
    executeDescriptiveStats,
    executeSimpleRegression,
    executeNormalizationTest,
    executeSpaceFillingDesign,
    executeCustomAnalysis,
  };
};
