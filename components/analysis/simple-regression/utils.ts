import { SimpleRegressionData } from './types';

export const prepareScatterData = (yPreditos: number[], wastes: number[]) => {
  return yPreditos.map((yPred, index) => ({
    x: index + 1,
    yPred,
    yReal: yPred + wastes[index],
  }));
};

export const prepareResidualsData = (wastes: number[]) => {
  return wastes.map((residual, index) => ({
    observation: index + 1,
    residual,
  }));
};

export const buildEquation = (intercept: number, slope: number): string => {
  const interceptSign = intercept >= 0 ? '+' : '';
  return `Y = ${intercept.toFixed(4)} ${interceptSign} ${slope.toFixed(4)} × X`;
};

export const isModelSignificant = (probF: number, alpha = 0.05): boolean => {
  return probF < alpha;
};

export const hasGoodFit = (rSquared: number, threshold = 0.7): boolean => {
  return rSquared >= threshold;
};

export const isParameterSignificant = (
  probT: number,
  alpha = 0.05,
): boolean => {
  return probT < alpha;
};

export const prepareAnovaData = (
  analiseVarianca: SimpleRegressionData['analiseVarianca'],
) => {
  return [
    {
      key: '1',
      source: 'Modelo',
      df: analiseVarianca.grausLiberdade.modelo,
      ss: analiseVarianca.sQuadrados.modelo,
      ms: analiseVarianca.mQuadrados.modelo,
      f: analiseVarianca.fRatio,
      probF: analiseVarianca.probF,
    },
    {
      key: '2',
      source: 'Erro',
      df: analiseVarianca.grausLiberdade.erro,
      ss: analiseVarianca.sQuadrados.erro,
      ms: analiseVarianca.mQuadrados.erro,
      f: null,
      probF: null,
    },
    {
      key: '3',
      source: 'Total',
      df: analiseVarianca.grausLiberdade.total,
      ss: analiseVarianca.sQuadrados.total,
      ms: null,
      f: null,
      probF: null,
    },
  ];
};

export const prepareParameterData = (
  parameterEstimate: SimpleRegressionData['parameterEstimate'],
) => {
  return [
    {
      key: '1',
      parameter: 'Intercepto (β₀)',
      estimate: parameterEstimate.estimate.intercept,
      stdError: parameterEstimate.stdError.intercept,
      tRatio: parameterEstimate.tRatio.intercept,
      probT: parameterEstimate.probT.intercept,
    },
    {
      key: '2',
      parameter: 'Coeficiente (β₁)',
      estimate: parameterEstimate.estimate.colunaValor,
      stdError: parameterEstimate.stdError.colunaValor,
      tRatio: parameterEstimate.tRatio.colunaValor,
      probT: parameterEstimate.probT.colunaValor,
    },
  ];
};
