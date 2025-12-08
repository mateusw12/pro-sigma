import { Card, Col, Descriptions, Row, Statistic } from 'antd';
import { calculateDiversity } from './utils';

interface OverviewStatsProps {
  totalWordsCount: number;
  uniqueQuantityNotRepeat: number;
}

export const OverviewStats = ({
  totalWordsCount,
  uniqueQuantityNotRepeat,
}: OverviewStatsProps) => {
  const diversity = calculateDiversity(
    uniqueQuantityNotRepeat,
    totalWordsCount,
  );

  return (
    <Card title="Resumo Geral da Análise" style={{ marginBottom: 24 }}>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total de Palavras"
              value={totalWordsCount}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Palavras Únicas"
              value={uniqueQuantityNotRepeat}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Diversidade Lexical"
              value={diversity}
              precision={2}
              suffix="%"
              valueStyle={{
                color: diversity > 50 ? '#52c41a' : '#faad14',
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Palavras Repetidas"
              value={totalWordsCount - uniqueQuantityNotRepeat}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Descriptions bordered size="small" style={{ marginTop: 16 }} column={1}>
        <Descriptions.Item label="Interpretação da Diversidade Lexical">
          {diversity > 70 ? (
            <span style={{ color: '#52c41a' }}>
              <strong>Alta diversidade</strong> - Vocabulário rico e variado
            </span>
          ) : diversity > 50 ? (
            <span style={{ color: '#1890ff' }}>
              <strong>Diversidade moderada</strong> - Boa variedade de palavras
            </span>
          ) : diversity > 30 ? (
            <span style={{ color: '#faad14' }}>
              <strong>Diversidade baixa</strong> - Vocabulário limitado com
              muitas repetições
            </span>
          ) : (
            <span style={{ color: '#ff4d4f' }}>
              <strong>Diversidade muito baixa</strong> - Vocabulário muito
              repetitivo
            </span>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Média de Repetição por Palavra">
          {(totalWordsCount / uniqueQuantityNotRepeat).toFixed(2)}x
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
