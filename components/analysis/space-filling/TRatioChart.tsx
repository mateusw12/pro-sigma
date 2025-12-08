import { Card } from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface TRatioChartProps {
  data: Array<{
    term: string;
    estimate: number;
    tRatio: number;
    pValue: number;
  }>;
}

export const TRatioChart = ({ data }: TRatioChartProps) => {
  // Calcular valor absoluto das estimativas e ordenar do maior para o menor
  const chartData = data
    .map((item) => ({
      term: item.term,
      absEstimate: Math.abs(item.estimate),
      estimate: item.estimate,
      tRatio: item.tRatio,
      pValue: item.pValue,
      isSignificant: item.pValue < 0.05,
    }))
    .sort((a, b) => b.absEstimate - a.absEstimate);

  // Função para determinar a cor da barra
  const getBarColor = (isSignificant: boolean, estimate: number) => {
    if (!isSignificant) return '#d9d9d9'; // Cinza para não significativo
    return estimate > 0 ? '#52c41a' : '#ff4d4f'; // Verde positivo, vermelho negativo
  };

  return (
    <Card
      title="Importância dos Fatores (Estimativas Absolutas)"
      style={{ marginBottom: 24 }}
    >
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, bottom: 20, left: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            label={{
              value: 'Estimativa Absoluta',
              position: 'insideBottom',
              offset: -10,
            }}
          />
          <YAxis
            type="category"
            dataKey="term"
            width={90}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div
                    style={{
                      background: 'white',
                      padding: '8px 12px',
                      border: '1px solid #d9d9d9',
                      borderRadius: 4,
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{data.term}</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: 12 }}>
                      Estimativa: {data.estimate.toFixed(4)}
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: 12 }}>
                      |Estimativa|: {data.absEstimate.toFixed(4)}
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: 12 }}>
                      t-Ratio: {data.tRatio.toFixed(4)}
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: 12 }}>
                      p-valor: {data.pValue.toFixed(6)}
                    </p>
                    <p
                      style={{
                        margin: '4px 0 0 0',
                        fontSize: 12,
                        color: data.isSignificant ? '#52c41a' : '#999',
                      }}
                    >
                      {data.isSignificant
                        ? '✓ Significativo'
                        : 'Não significativo'}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="absEstimate" name="|Estimativa|" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.isSignificant, entry.estimate)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          marginTop: 16,
          padding: '12px',
          background: '#e6f7ff',
          borderRadius: 4,
        }}
      >
        <p style={{ margin: 0, marginBottom: 8 }}>
          <strong>Interpretação:</strong> Este gráfico mostra a importância
          relativa de cada fator no modelo. Valores maiores de |t-Ratio| indicam
          fatores com maior impacto estatístico na variável resposta.
        </p>
        <div
          style={{ display: 'flex', gap: 16, fontSize: 12, flexWrap: 'wrap' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                width: 12,
                height: 12,
                background: '#52c41a',
                display: 'inline-block',
                borderRadius: 2,
              }}
            />
            Significativo positivo (p&lt;0.05)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                width: 12,
                height: 12,
                background: '#ff4d4f',
                display: 'inline-block',
                borderRadius: 2,
              }}
            />
            Significativo negativo (p&lt;0.05)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                width: 12,
                height: 12,
                background: '#d9d9d9',
                display: 'inline-block',
                borderRadius: 2,
              }}
            />
            Não significativo
          </div>
        </div>
      </div>
    </Card>
  );
};
