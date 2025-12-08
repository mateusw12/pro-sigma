import { Card, Col, Row, Statistic } from 'antd';
import { getPhrasesByLength } from './utils';

interface PhraseLengthDistributionProps {
  phraseCountCharacter: Record<string, number>;
}

export const PhraseLengthDistribution = ({
  phraseCountCharacter,
}: PhraseLengthDistributionProps) => {
  const distribution = getPhrasesByLength(phraseCountCharacter);
  const total =
    distribution.short +
    distribution.medium +
    distribution.long +
    distribution.veryLong;

  return (
    <Card
      title="Distribuição por Tamanho de Frases"
      style={{ marginBottom: 24 }}
    >
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Curtas (≤50 chars)"
              value={distribution.short}
              suffix={`(${((distribution.short / total) * 100).toFixed(1)}%)`}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Médias (51-150 chars)"
              value={distribution.medium}
              suffix={`(${((distribution.medium / total) * 100).toFixed(1)}%)`}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Longas (151-300 chars)"
              value={distribution.long}
              suffix={`(${((distribution.long / total) * 100).toFixed(1)}%)`}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Muito Longas (>300 chars)"
              value={distribution.veryLong}
              suffix={`(${((distribution.veryLong / total) * 100).toFixed(1)}%)`}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <div
        style={{
          marginTop: 16,
          padding: '12px',
          background: '#fafafa',
          borderRadius: 4,
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Interpretação:</strong> A distribuição do tamanho das frases
          ajuda a entender a complexidade e estrutura do texto. Frases muito
          longas podem indicar descrições detalhadas ou textos complexos,
          enquanto frases curtas sugerem mensagens concisas.
        </p>
      </div>
    </Card>
  );
};
