export const createHistogramData = (values: number[]) => {
  const sortedValues = [...values].sort((a, b) => a - b);
  const min = Math.min(...sortedValues);
  const max = Math.max(...sortedValues);
  const range = max - min;

  // Usar regra de Sturges para número de bins: k = 1 + 3.322 * log10(n)
  const numBins = Math.ceil(1 + 3.322 * Math.log10(values.length));
  const binWidth = range / numBins;

  // Criar bins
  const bins: { range: string; count: number; min: number; max: number }[] = [];
  for (let i = 0; i < numBins; i++) {
    const binMin = min + i * binWidth;
    const binMax = min + (i + 1) * binWidth;
    const count = sortedValues.filter(
      (v) => v >= binMin && (i === numBins - 1 ? v <= binMax : v < binMax),
    ).length;

    bins.push({
      range: `${binMin.toFixed(1)}-${binMax.toFixed(1)}`,
      count,
      min: binMin,
      max: binMax,
    });
  }

  return bins;
};
