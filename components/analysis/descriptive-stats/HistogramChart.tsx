'use client';

import { Card } from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface HistogramData {
  range: string;
  count: number;
  min: number;
  max: number;
}

interface HistogramChartProps {
  histogramData: HistogramData[];
  stats: {
    mean: number;
    median: number;
    count: number;
    quantile100: number;
    y: number[];
  };
}

export const HistogramChart = ({
  histogramData,
  stats,
}: HistogramChartProps) => {
  return (
    <Card
      type="inner"
      title="📊 Histograma - Distribuição de Frequência"
      size="small"
      style={{ marginBottom: 16 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={histogramData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="range"
            label={{
              value: 'Intervalo de Valores',
              position: 'insideBottom',
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: 'Frequência',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            content={({ active, payload }: any) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div
                    style={{
                      background: 'white',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: 'bold' }}>
                      Intervalo: {data.range}
                    </p>
                    <p style={{ margin: '4px 0 0 0', color: '#1890ff' }}>
                      Frequência: {data.count}
                    </p>
                    <p
                      style={{
                        margin: '4px 0 0 0',
                        fontSize: '12px',
                        color: '#666',
                      }}
                    >
                      {((data.count / stats.count) * 100).toFixed(1)}% dos dados
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar dataKey="count" name="Frequência" fill="#1890ff">
            {histogramData.map((entry, index) => {
              const binCenter = (entry.min + entry.max) / 2;
              const distanceFromMean = Math.abs(binCenter - stats.mean);
              const maxDistance = Math.max(
                Math.abs(stats.mean - Math.min(...stats.y)),
                Math.abs(stats.mean - Math.max(...stats.y)),
              );
              const normalizedDistance = distanceFromMean / maxDistance;

              const hue = 200 - normalizedDistance * 80;
              const saturation = 60 + normalizedDistance * 30;
              const lightness = 50 - normalizedDistance * 10;

              return (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(${hue}, ${saturation}%, ${lightness}%)`}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          marginTop: 12,
          padding: 8,
          background: '#f0f2f5',
          borderRadius: 4,
          fontSize: '12px',
        }}
      >
        <strong>ℹ️ Sobre o Histograma:</strong>
        <br />• Total de intervalos (bins): {histogramData.length}
        <br />• Amplitude dos dados:{' '}
        {(stats.quantile100 - Math.min(...stats.y)).toFixed(2)}
        <br />• Largura aproximada do intervalo:{' '}
        {(
          (stats.quantile100 - Math.min(...stats.y)) /
          histogramData.length
        ).toFixed(2)}
        <br />
        <div style={{ marginTop: 8 }}>
          <span style={{ color: '#52c41a', fontWeight: 'bold' }}>●</span> Média:{' '}
          {stats.mean.toFixed(2)} |{' '}
          <span style={{ color: '#1890ff', fontWeight: 'bold' }}>●</span>{' '}
          Mediana: {stats.median.toFixed(2)}
        </div>
      </div>
    </Card>
  );
};
