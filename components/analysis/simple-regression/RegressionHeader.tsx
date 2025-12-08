import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tag } from 'antd';
import { buildEquation } from './utils';

interface RegressionHeaderProps {
  intercept: number;
  slope: number;
  isSignificant: boolean;
  hasGoodFit: boolean;
}

export const RegressionHeader = ({
  intercept,
  slope,
  isSignificant,
  hasGoodFit,
}: RegressionHeaderProps) => {
  const equation = buildEquation(intercept, slope);

  return (
    <Card
      style={{ marginBottom: 24 }}
      styles={{
        body: {
          background: isSignificant && hasGoodFit ? '#f6ffed' : '#fffbe6',
        },
      }}
    >
      <Row gutter={16} align="middle">
        <Col span={16}>
          <h2 style={{ margin: 0, fontSize: 24, color: '#1890ff' }}>
            {equation}
          </h2>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
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
              Ajuste Fraco
            </Tag>
          )}
        </Col>
      </Row>
    </Card>
  );
};
