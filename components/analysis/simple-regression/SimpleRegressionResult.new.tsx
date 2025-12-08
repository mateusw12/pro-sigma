'use client';

import { AnovaTable } from './AnovaTable';
import { Diagnostics } from './Diagnostics';
import { FitSummary } from './FitSummary';
import { ParameterTable } from './ParameterTable';
import { RegressionHeader } from './RegressionHeader';
import { ResidualsPlot } from './ResidualsPlot';
import { ScatterPlot } from './ScatterPlot';
import { SimpleRegressionResultProps } from './types';
import {
  hasGoodFit,
  isModelSignificant,
  prepareAnovaData,
  prepareParameterData,
  prepareResidualsData,
  prepareScatterData,
} from './utils';

export const SimpleRegressionResult = ({
  data,
}: SimpleRegressionResultProps) => {
  const {
    summaryOfFit,
    parameterEstimate,
    analiseVarianca,
    wastes,
    yPreditos,
  } = data;

  // Verificações
  const isSignificant = isModelSignificant(analiseVarianca.probF);
  const goodFit = hasGoodFit(summaryOfFit.rQuadrado);

  // Preparar dados
  const scatterData = prepareScatterData(yPreditos, wastes);
  const residualsData = prepareResidualsData(wastes);
  const anovaData = prepareAnovaData(analiseVarianca);
  const paramData = prepareParameterData(parameterEstimate);

  return (
    <div>
      <RegressionHeader
        intercept={parameterEstimate.estimate.intercept}
        slope={parameterEstimate.estimate.colunaValor}
        isSignificant={isSignificant}
        hasGoodFit={goodFit}
      />

      <FitSummary summaryOfFit={summaryOfFit} />

      <AnovaTable
        analiseVarianca={analiseVarianca}
        isSignificant={isSignificant}
        anovaData={anovaData}
      />

      <ParameterTable
        parameterEstimate={parameterEstimate}
        paramData={paramData}
      />

      <ScatterPlot scatterData={scatterData} />

      <ResidualsPlot residualsData={residualsData} />

      <Diagnostics isSignificant={isSignificant} hasGoodFit={goodFit} />
    </div>
  );
};
