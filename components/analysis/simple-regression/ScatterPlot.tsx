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

interface ScatterPlotProps {
  scatterData: Array<{
    x: number;
    yPred: number;
    yReal: number;
  }>;
}

export const ScatterPlot = ({ scatterData }: ScatterPlotProps) => {
  return (
    <Card
      title="Gráfico de Dispersão e Linha de Regressão"
      style={{ marginBottom: 24 }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            name="X"
            label={{
              value: 'Variável Independente (X)',
              position: 'insideBottom',
              offset: -10,
            }}
          />
          <YAxis
            type="number"
            dataKey="yReal"
            name="Y"
            label={{
              value: 'Variável Dependente (Y)',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <ZAxis range={[50, 50]} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value: number) => value.toFixed(2)}
          />
          <Legend />
          <Scatter
            name="Valores Observados"
            data={scatterData}
            fill="#1890ff"
            dataKey="yReal"
          />
          <Scatter
            name="Linha de Regressão"
            data={scatterData}
            fill="#52c41a"
            dataKey="yPred"
            line
            lineType="fitting"
            shape="diamond"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
};
