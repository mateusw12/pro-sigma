export interface SpaceFillingData {
  spaceFilling: {
    [key: string]: {
      betas: number[][];
      anovaTable: {
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
      summarOfFit: {
        rQuadrado: number;
        rQuadradoAjustado: number;
        rmse: number;
        media: number;
        observacoes: number;
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
      parameterEstimates: {
        [key: string]: {
          estimates: number;
          stdError: number;
          tRatio: number;
          pValue: number;
        };
      };
      isRecalculate: boolean;
      yPredicteds: number[];
      mean: {
        [key: string]: number;
      };
      yPredictedsOdered: number[];
      y: number[];
    };
  };
}

export interface SpaceFillingResultProps {
  data: SpaceFillingData;
  onClose?: () => void;
}
