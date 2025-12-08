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
import { WordFrequency } from './types';

interface WordFrequencyChartProps {
  topWords: WordFrequency[];
}

const COLORS = [
  '#1890ff',
  '#52c41a',
  '#faad14',
  '#f5222d',
  '#722ed1',
  '#eb2f96',
  '#13c2c2',
  '#2f54eb',
  '#fa8c16',
  '#a0d911',
];

export const WordFrequencyChart = ({ topWords }: WordFrequencyChartProps) => {
  const chartData = topWords.slice(0, 15);

  return (
    <Card
      title="Gráfico de Frequência de Palavras (Top 15)"
      style={{ marginBottom: 24 }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, bottom: 60, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="word"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            style={{ fontSize: 12 }}
          />
          <YAxis
            label={{
              value: 'Frequência',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip
            formatter={(value: number) => [
              `${value} ocorrências`,
              'Frequência',
            ]}
          />
          <Legend />
          <Bar dataKey="count" name="Frequência" radius={[8, 8, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
