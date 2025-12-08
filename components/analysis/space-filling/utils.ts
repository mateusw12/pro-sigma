import { SpaceFillingData } from './types';

export const prepareAnovaData = (
  anovaTable: SpaceFillingData['spaceFilling'][string]['anovaTable'],
) => {
  return [
    {
      key: '1',
      source: 'Modelo',
      df: anovaTable.grausLiberdade.modelo,
      ss: anovaTable.sQuadrados.modelo,
      ms: anovaTable.mQuadrados.modelo,
      f: anovaTable.fRatio,
      probF: anovaTable.probF,
    },
    {
      key: '2',
      source: 'Erro',
      df: anovaTable.grausLiberdade.erro,
      ss: anovaTable.sQuadrados.erro,
      ms: anovaTable.mQuadrados.erro,
      f: null,
      probF: null,
    },
    {
      key: '3',
      source: 'Total',
      df: anovaTable.grausLiberdade.total,
      ss: anovaTable.sQuadrados.total,
      ms: null,
      f: null,
      probF: null,
    },
  ];
};

export const prepareParameterData = (
  parameterEstimates: SpaceFillingData['spaceFilling'][string]['parameterEstimates'],
) => {
  return Object.entries(parameterEstimates).map(([term, values], index) => ({
    key: index.toString(),
    term,
    estimate: values.estimates,
    stdError: values.stdError,
    tRatio: values.tRatio,
    pValue: values.pValue,
  }));
};

export const isModelSignificant = (probF: number, alpha = 0.05): boolean => {
  return probF < alpha;
};

export const hasGoodFit = (rSquared: number, threshold = 0.7): boolean => {
  return rSquared >= threshold;
};

export const prepareObservedVsPredictedData = (
  y: number[],
  yPredicteds: number[],
) => {
  return y.map((observed, index) => ({
    observation: index + 1,
    observed,
    predicted: yPredicteds[index],
  }));
};

export const prepareResidualsData = (y: number[], yPredicteds: number[]) => {
  return y.map((observed, index) => ({
    observation: index + 1,
    residual: observed - yPredicteds[index],
  }));
};

export const getSignificantParameters = (
  parameterEstimates: SpaceFillingData['spaceFilling'][string]['parameterEstimates'],
  alpha = 0.05,
) => {
  return Object.entries(parameterEstimates)
    .filter(([, values]) => values.pValue < alpha)
    .map(([term]) => term);
};
