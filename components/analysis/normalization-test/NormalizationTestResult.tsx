'use client';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Descriptions, Row, Statistic, Tag } from 'antd';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface NormalizationTestData {
  statistic: number;
  pValue: number;
  skewness: number;
  kurtosis: number;
  jarqueBeraChart: Array<{ x: number; y: number }>;
  trendLineJarqueBera: Array<{ x: number; y: number }>;
}

interface NormalizationTestResultProps {
  data: {
    result: {
      [key: string]: NormalizationTestData;
    };
  };
  onClose?: () => void;
}

export const NormalizationTestResult = ({
  data,
}: NormalizationTestResultProps) => {
  const renderColumnResults = (
    columnName: string,
    stats: NormalizationTestData,
  ) => {
    const isNormal = stats.pValue > 0.05;
    const alpha = 0.05;

    return (
      <Card
        key={columnName}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {columnName}
            {isNormal ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Normal
              </Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Não Normal
              </Tag>
            )}
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        {/* Estatísticas Principais */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Estatística JB"
                value={stats.statistic.toFixed(4)}
                precision={4}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="P-valor"
                value={stats.pValue.toFixed(6)}
                precision={6}
                valueStyle={{
                  color: stats.pValue > alpha ? '#3f8600' : '#cf1322',
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Assimetria (Skewness)"
                value={stats.skewness.toFixed(4)}
                precision={4}
                valueStyle={{
                  color: Math.abs(stats.skewness) < 0.5 ? '#3f8600' : '#faad14',
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Curtose (Kurtosis)"
                value={stats.kurtosis.toFixed(4)}
                precision={4}
                valueStyle={{
                  color:
                    Math.abs(stats.kurtosis - 3) < 1 ? '#3f8600' : '#faad14',
                }}
              />
            </Card>
          </Col>
        </Row>

        {/* Interpretação */}
        <Card
          title="Interpretação do Teste de Jarque-Bera"
          style={{ marginBottom: 24 }}
          styles={{
            body: {
              background: isNormal ? '#f6ffed' : '#fff2e8',
            },
          }}
        >
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Hipótese Nula (H₀)">
              Os dados seguem uma distribuição normal
            </Descriptions.Item>
            <Descriptions.Item label="Hipótese Alternativa (H₁)">
              Os dados não seguem uma distribuição normal
            </Descriptions.Item>
            <Descriptions.Item label="Nível de Significância (α)">
              {alpha}
            </Descriptions.Item>
            <Descriptions.Item label="Conclusão">
              <strong>
                {isNormal
                  ? `Com p-valor = ${stats.pValue.toFixed(6)} > ${alpha}, não rejeitamos H₀. Os dados são consistentes com uma distribuição normal.`
                  : `Com p-valor = ${stats.pValue.toFixed(6)} < ${alpha}, rejeitamos H₀. Os dados não seguem uma distribuição normal.`}
              </strong>
            </Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: 16 }}>
            <h4>Análise dos Parâmetros:</h4>
            <ul>
              <li>
                <strong>
                  Assimetria (Skewness = {stats.skewness.toFixed(2)}):
                </strong>{' '}
                {Math.abs(stats.skewness) < 0.5
                  ? 'Distribuição aproximadamente simétrica (ideal para normalidade).'
                  : stats.skewness > 0
                    ? 'Distribuição assimétrica positiva (cauda à direita).'
                    : 'Distribuição assimétrica negativa (cauda à esquerda).'}
              </li>
              <li>
                <strong>
                  Curtose (Kurtosis = {stats.kurtosis.toFixed(2)}):
                </strong>{' '}
                {Math.abs(stats.kurtosis - 3) < 1
                  ? 'Curtose próxima da normal (mesocúrtica).'
                  : stats.kurtosis > 3
                    ? 'Distribuição leptocúrtica (caudas pesadas, picos acentuados).'
                    : 'Distribuição platicúrtica (caudas leves, achatada).'}
              </li>
            </ul>
          </div>
        </Card>

        {/* Gráfico Q-Q Plot */}
        <Card
          title="Q-Q Plot - Quantis Teóricos vs Observados"
          style={{ marginBottom: 24 }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                name="Quantis Teóricos"
                label={{
                  value: 'Quantis Teóricos (Normal Padrão)',
                  position: 'insideBottom',
                  offset: -10,
                }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Quantis Observados"
                label={{
                  value: 'Quantis Observados',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip
                formatter={(value: number) => value.toFixed(2)}
                labelFormatter={(value) =>
                  `Quantil: ${Number(value).toFixed(2)}`
                }
              />
              <Legend />
              <Scatter
                name="Dados Observados"
                data={stats.jarqueBeraChart}
                fill="#1890ff"
                shape="circle"
              />
              <Scatter
                name="Linha de Referência Normal"
                data={stats.trendLineJarqueBera}
                fill="#52c41a"
                shape="diamond"
                line
                lineType="fitting"
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
              <strong>Interpretação do Q-Q Plot:</strong> Se os dados são
              normalmente distribuídos, os pontos azuis devem estar próximos da
              linha verde de referência. Desvios significativos indicam
              não-normalidade.
            </p>
          </div>
        </Card>

        {/* Gráfico de Distribuição Empírica */}
        <Card title="Distribuição Empírica dos Dados">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={stats.jarqueBeraChart}
              margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                label={{
                  value: 'Valores Padronizados',
                  position: 'insideBottom',
                  offset: -10,
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
                formatter={(value: number) => value.toFixed(2)}
                labelFormatter={(value) => `Valor: ${Number(value).toFixed(2)}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="y"
                name="Distribuição Observada"
                stroke="#1890ff"
                strokeWidth={2}
                dot={{ fill: '#1890ff', r: 3 }}
              />
              <Line
                type="monotone"
                data={stats.trendLineJarqueBera}
                dataKey="y"
                name="Distribuição Normal Teórica"
                stroke="#52c41a"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
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
              <strong>Interpretação:</strong> A linha azul sólida representa a
              distribuição empírica dos dados. A linha verde tracejada
              representa a distribuição normal teórica esperada. Quanto mais
              próximas as linhas, mais normal é a distribuição.
            </p>
          </div>
        </Card>

        {/* Recomendações */}
        <Card
          title="Recomendações"
          style={{
            background: isNormal ? '#e6f7ff' : '#fffbe6',
          }}
        >
          {isNormal ? (
            <div>
              <p>✓ Os dados seguem distribuição normal. Você pode:</p>
              <ul>
                <li>Utilizar testes paramétricos (t-test, ANOVA, etc.)</li>
                <li>Aplicar modelos de regressão linear</li>
                <li>Usar controle estatístico de processos (CEP)</li>
                <li>Calcular intervalos de confiança baseados na normal</li>
              </ul>
            </div>
          ) : (
            <div>
              <p>⚠ Os dados não seguem distribuição normal. Considere:</p>
              <ul>
                <li>Aplicar transformações (log, raiz quadrada, Box-Cox)</li>
                <li>
                  Usar testes não-paramétricos (Mann-Whitney, Kruskal-Wallis)
                </li>
                <li>
                  Investigar outliers que podem estar afetando a distribuição
                </li>
                <li>Verificar se há mistura de diferentes populações</li>
                <li>Aumentar o tamanho da amostra se possível</li>
              </ul>
            </div>
          )}
        </Card>
      </Card>
    );
  };

  return (
    <div>
      {Object.entries(data.result).map(([columnName, stats]) =>
        renderColumnResults(columnName, stats),
      )}
    </div>
  );
};
