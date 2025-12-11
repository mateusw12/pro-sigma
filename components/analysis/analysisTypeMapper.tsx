import { ReactNode } from 'react';
import { DescriptiveStatsResult } from './descriptive-stats';
import { NormalizationTestResult } from './normalization-test';
import { SimpleRegressionResult } from './simple-regression';
import { SpaceFillingResult } from './space-filling';
import { TextAnalysisResult } from './text-analysis';

// Mapeamento de tipos de análise para componentes
export const ANALYSIS_TYPE_COMPONENTS: Record<
  string,
  (data: any) => ReactNode
> = {
  'Estatística Descritiva': (data) => (
    <DescriptiveStatsResult data={{ result: data }} />
  ),
  'Regressão Simples': (data) => <SimpleRegressionResult data={data} />,
  'Teste de Normalização': (data) => (
    <NormalizationTestResult data={{ result: data }} />
  ),
  'Space Filling': (data) => (
    <SpaceFillingResult
      data={data.spaceFilling ? data : { spaceFilling: data }}
    />
  ),
  'Análise de Texto': (data) => <TextAnalysisResult data={data} />,
};

/**
 * Renderiza o componente apropriado baseado no tipo de análise
 * @param analysisType - O tipo de análise
 * @param results - Os dados de resultado
 * @returns O componente JSX apropriado ou null se o tipo não for encontrado
 */
export const renderAnalysisResults = (
  analysisType: string,
  results: any,
): ReactNode => {
  const renderer = ANALYSIS_TYPE_COMPONENTS[analysisType];

  if (!renderer) {
    console.warn(
      `Componente não encontrado para o tipo de análise: ${analysisType}`,
    );
    return null;
  }

  try {
    return renderer(results);
  } catch (error) {
    console.error(
      `Erro ao renderizar resultado da análise tipo ${analysisType}:`,
      error,
    );
    return null;
  }
};

/**
 * Verifica se existe um componente específico para o tipo de análise
 * @param analysisType - O tipo de análise
 * @returns true se existe um componente específico
 */
export const hasSpecificComponent = (analysisType: string): boolean => {
  return analysisType in ANALYSIS_TYPE_COMPONENTS;
};
