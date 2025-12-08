import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Card, Col, Descriptions, Row, Statistic, Tag } from 'antd';
import { SpaceFillingData } from './types';

interface ModelSummaryProps {
  response: string;
  summarOfFit: SpaceFillingData['spaceFilling'][string]['summarOfFit'];
  isSignificant: boolean;
  hasGoodFit: boolean;
}

export const ModelSummary = ({
  response,
  summarOfFit,
  isSignificant,
  hasGoodFit,
}: ModelSummaryProps) => {
  return (
    <Card
      title={`Resumo do Modelo - Variável Resposta: ${response}`}
      style={{ marginBottom: 24 }}
      styles={{
        body: {
          background: isSignificant && hasGoodFit ? '#f6ffed' : '#fffbe6',
        },
      }}
    >
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={24} style={{ textAlign: 'right' }}>
          {isSignificant ? (
            <Tag
              icon={<CheckCircleOutlined />}
              color="success"
              style={{ fontSize: 14 }}
            >
              Modelo Significativo
            </Tag>
          ) : (
            <Tag
              icon={<WarningOutlined />}
              color="warning"
              style={{ fontSize: 14 }}
            >
              Modelo Não Significativo
            </Tag>
          )}
          {hasGoodFit ? (
            <Tag
              icon={<CheckCircleOutlined />}
              color="success"
              style={{ fontSize: 14 }}
            >
              Bom Ajuste
            </Tag>
          ) : (
            <Tag
              icon={<WarningOutlined />}
              color="warning"
              style={{ fontSize: 14 }}
            >
              Ajuste Moderado/Fraco
            </Tag>
          )}
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="R²"
              value={summarOfFit.rQuadrado}
              precision={4}
              valueStyle={{
                color: summarOfFit.rQuadrado >= 0.7 ? '#3f8600' : '#faad14',
              }}
              suffix={`(${(summarOfFit.rQuadrado * 100).toFixed(2)}%)`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="R² Ajustado"
              value={summarOfFit.rQuadradoAjustado}
              precision={4}
              valueStyle={{
                color:
                  summarOfFit.rQuadradoAjustado >= 0.7 ? '#3f8600' : '#faad14',
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="RMSE" value={summarOfFit.rmse} precision={4} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Observações" value={summarOfFit.observacoes} />
          </Card>
        </Col>
      </Row>

      <Descriptions bordered size="small" style={{ marginTop: 16 }} column={2}>
        <Descriptions.Item label="Interpretação do R²">
          O modelo explica{' '}
          <strong>{(summarOfFit.rQuadrado * 100).toFixed(2)}%</strong> da
          variabilidade dos dados
        </Descriptions.Item>
        <Descriptions.Item label="Média de Y">
          {summarOfFit.media.toFixed(4)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
