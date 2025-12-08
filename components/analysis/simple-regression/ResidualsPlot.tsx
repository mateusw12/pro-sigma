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

interface ResidualsPlotProps {
  residualsData: Array<{
    observation: number;
    residual: number;
  }>;
}

export const ResidualsPlot = ({ residualsData }: ResidualsPlotProps) => {
  return (
    <Card title="Análise de Resíduos" style={{ marginBottom: 24 }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={residualsData}
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
              value: 'Resíduo',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip formatter={(value: number) => value.toFixed(4)} />
          <Legend />
          <Line
            type="monotone"
            dataKey="residual"
            stroke="#ff4d4f"
            strokeWidth={2}
            dot={{ fill: '#ff4d4f', r: 4 }}
            name="Resíduos"
          />
          {/* Linha de referência em zero */}
          <Line
            type="monotone"
            data={residualsData.map((d) => ({ ...d, zero: 0 }))}
            dataKey="zero"
            stroke="#999"
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false}
            name="Referência (0)"
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
          <strong>Interpretação dos Resíduos:</strong> Os resíduos devem estar
          distribuídos aleatoriamente em torno de zero. Padrões sistemáticos
          indicam que o modelo pode não ser adequado ou que existem variáveis
          importantes não incluídas.
        </p>
      </div>
    </Card>
  );
};
