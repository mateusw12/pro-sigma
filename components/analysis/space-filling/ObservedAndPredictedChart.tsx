import { Card } from 'antd';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ObservedAndPredictedChartProps {
  data: Array<{
    observation: number;
    observed: number;
    predicted: number;
  }>;
}

export const ObservedAndPredictedChart = ({
  data,
}: ObservedAndPredictedChartProps) => {
  return (
    <Card
      title="Valores Observados e Preditos ao Longo das Observações"
      style={{ marginBottom: 24 }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="observation"
            label={{
              value: 'Observação',
              position: 'insideBottom',
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: 'Valor',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip formatter={(value: number) => value.toFixed(4)} />
          <Legend />
          <Line
            type="monotone"
            dataKey="observed"
            stroke="#1890ff"
            strokeWidth={2}
            dot={{ fill: '#1890ff', r: 3 }}
            name="Observado (Y)"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#52c41a"
            strokeWidth={2}
            dot={{ fill: '#52c41a', r: 3 }}
            name="Predito (Ŷ)"
          />
        </LineChart>
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
          <strong>Interpretação:</strong> Este gráfico mostra como os valores
          preditos pelo modelo (verde) acompanham os valores observados (azul).
          Quanto mais próximas as linhas, melhor é o ajuste do modelo aos dados
          experimentais.
        </p>
      </div>
    </Card>
  );
};
