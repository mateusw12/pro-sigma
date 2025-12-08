import { Card } from 'antd';
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

interface ObservedVsPredictedChartProps {
  data: Array<{
    observation: number;
    observed: number;
    predicted: number;
  }>;
}

export const ObservedVsPredictedChart = ({
  data,
}: ObservedVsPredictedChartProps) => {
  // Criar linha de referência (y=x)
  const minVal = Math.min(
    ...data.map((d) => Math.min(d.observed, d.predicted)),
  );
  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.observed, d.predicted)),
  );
  const referenceLine = [
    { x: minVal, y: minVal },
    { x: maxVal, y: maxVal },
  ];

  return (
    <Card title="Valores Observados vs Preditos" style={{ marginBottom: 24 }}>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="predicted"
            name="Predito"
            label={{
              value: 'Valores Preditos',
              position: 'insideBottom',
              offset: -10,
            }}
          />
          <YAxis
            type="number"
            dataKey="observed"
            name="Observado"
            label={{
              value: 'Valores Observados',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <ZAxis range={[50, 50]} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value: number) => value.toFixed(4)}
          />
          <Legend />
          <Scatter
            name="Observado vs Predito"
            data={data}
            fill="#1890ff"
            dataKey="observed"
          />
          <Scatter
            name="Linha de Referência (y=x)"
            data={referenceLine}
            fill="#52c41a"
            dataKey="y"
            line
            lineType="fitting"
            shape="diamond"
          />
        </ScatterChart>
      </ResponsiveContainer>
      <div
        style={{
          marginTop: 16,
          padding: '12px',
          background: '#fafafa',
          borderRadius: 4,
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Interpretação:</strong> Pontos próximos à linha verde (y=x)
          indicam boa predição. Dispersão dos pontos mostra a qualidade do
          ajuste do modelo aos dados observados.
        </p>
      </div>
    </Card>
  );
};
