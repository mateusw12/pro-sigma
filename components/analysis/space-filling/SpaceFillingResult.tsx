'use client';

import { AnovaTable } from './AnovaTable';
import { Diagnostics } from './Diagnostics';
import { ModelSummary } from './ModelSummary';
import { ObservedAndPredictedChart } from './ObservedAndPredictedChart';
import { ObservedVsPredictedChart } from './ObservedVsPredictedChart';
import { ParameterTable } from './ParameterTable';
import { ResidualsPlot } from './ResidualsPlot';
import { TRatioChart } from './TRatioChart';
import { SpaceFillingResultProps } from './types';
import {
  getSignificantParameters,
  hasGoodFit,
  isModelSignificant,
  prepareAnovaData,
  prepareObservedVsPredictedData,
  prepareParameterData,
  prepareResidualsData,
} from './utils';

export const SpaceFillingResult = ({ data }: SpaceFillingResultProps) => {
  // Pegar a primeira (e geralmente única) variável resposta
  const responseVars = Object.keys(data.spaceFilling);
  const firstResponse = responseVars[0];
  const responseData = data.spaceFilling[firstResponse];

  const { summarOfFit, anovaTable, parameterEstimates, y, yPredicteds } =
    responseData;

  // Verificações
  const isSignificant = isModelSignificant(anovaTable.probF);
  const goodFit = hasGoodFit(summarOfFit.rQuadrado);

  // Preparar dados
  const anovaData = prepareAnovaData(anovaTable);
  const paramData = prepareParameterData(parameterEstimates);
  const observedVsPredicted = prepareObservedVsPredictedData(y, yPredicteds);
  const residualsData = prepareResidualsData(y, yPredicteds);
  const significantParams = getSignificantParameters(parameterEstimates).filter(
    (p) => p !== 'Intercept',
  );

  return (
    <div>
      <ModelSummary
        response={firstResponse}
        summarOfFit={summarOfFit}
        isSignificant={isSignificant}
        hasGoodFit={goodFit}
      />

      <AnovaTable
        anovaTable={anovaTable}
        isSignificant={isSignificant}
        anovaData={anovaData}
      />

      <ParameterTable paramData={paramData} />

      <TRatioChart data={paramData} />

      <ObservedAndPredictedChart data={observedVsPredicted} />

      <ObservedVsPredictedChart data={observedVsPredicted} />

      <ResidualsPlot residualsData={residualsData} />

      <Diagnostics
        isSignificant={isSignificant}
        hasGoodFit={goodFit}
        significantParameters={significantParams}
      />
    </div>
  );
};
