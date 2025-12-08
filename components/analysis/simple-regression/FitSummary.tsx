import { Card, Col, Descriptions, Row, Statistic } from 'antd';
import { SimpleRegressionData } from './types';

interface FitSummaryProps {
  summaryOfFit: SimpleRegressionData['summaryOfFit'];
}

export const FitSummary = ({ summaryOfFit }: FitSummaryProps) => {
  return (
    <Card title="Resumo do Ajuste" style={{ marginBottom: 24 }}>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="R²"
              value={summaryOfFit.rQuadrado}
              precision={4}
              valueStyle={{
                color: summaryOfFit.rQuadrado >= 0.7 ? '#3f8600' : '#faad14',
              }}
              suffix={`(${(summaryOfFit.rQuadrado * 100).toFixed(2)}%)`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="R² Ajustado"
              value={summaryOfFit.rQuadradoAjustado}
              precision={4}
              valueStyle={{
                color:
                  summaryOfFit.rQuadradoAjustado >= 0.7 ? '#3f8600' : '#faad14',
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="RMSE" value={summaryOfFit.rmse} precision={4} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Observações" value={summaryOfFit.observacoes} />
          </Card>
        </Col>
      </Row>

      <Descriptions bordered size="small" style={{ marginTop: 16 }} column={2}>
        <Descriptions.Item label="Interpretação do R²">
          O modelo explica{' '}
          <strong>{(summaryOfFit.rQuadrado * 100).toFixed(2)}%</strong> da
          variabilidade dos dados
        </Descriptions.Item>
        <Descriptions.Item label="Média de Y">
          {summaryOfFit.media.toFixed(4)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
