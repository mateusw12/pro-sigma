export interface SimpleRegressionData {
  numeroObervacoes: number;
  grausLiberdade: number;
  betaUm: number;
  betaZero: number;
  yPreditos: number[];
  analiseVarianca: {
    grausLiberdade: {
      modelo: number;
      erro: number;
      total: number;
    };
    sQuadrados: {
      modelo: number;
      erro: number;
      total: number;
    };
    mQuadrados: {
      modelo: number;
      erro: number;
    };
    fRatio: number;
    probF: number;
  };
  lackOfFit: {
    grausLiberdade: {
      lackOfFit: number;
      erroPuro: number;
      total: number;
    };
    sQuadrados: {
      lackOfFit: number;
      erroPuro: number;
      total: number;
    };
    mQuadrados: {
      lackOfFit: number;
      erroPuro: number;
    };
    fRatio: number;
    probF: number;
  };
  summaryOfFit: {
    rQuadrado: number;
    rQuadradoAjustado: number;
    rmse: number;
    media: number;
    observacoes: number;
  };
  parameterEstimate: {
    estimate: {
      intercept: number;
      colunaValor: number;
    };
    stdError: {
      intercept: number;
      colunaValor: number;
    };
    tRatio: {
      intercept: number;
      colunaValor: number;
    };
    probT: {
      intercept: number;
      colunaValor: number;
    };
  };
  wastes: number[];
}

export interface SimpleRegressionResultProps {
  data: SimpleRegressionData;
  onClose?: () => void;
}
