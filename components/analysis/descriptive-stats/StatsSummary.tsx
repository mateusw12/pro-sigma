import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Col, Descriptions, Row, Statistic } from 'antd';

interface StatsSummaryProps {
  stats: {
    mean: number;
    median: number;
    std: number;
    count: number;
    quantile25: number;
    quantile50: number;
    quantile75: number;
    quantile100: number;
  };
}

export const StatsSummary = ({ stats }: StatsSummaryProps) => {
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="Média"
            value={stats.mean}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<LineChartOutlined />}
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="Mediana"
            value={stats.median}
            precision={2}
            valueStyle={{ color: '#1890ff' }}
            prefix={<PieChartOutlined />}
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="Desvio Padrão"
            value={stats.std}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<BarChartOutlined />}
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="Contagem"
            value={stats.count}
            valueStyle={{ color: '#722ed1' }}
          />
        </Col>
      </Row>

      <Descriptions
        title="Quartis"
        bordered
        size="small"
        column={{ xs: 1, sm: 2, md: 4 }}
        style={{ marginBottom: 24 }}
      >
        <Descriptions.Item label="Q1 (25%)">
          {stats.quantile25.toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label="Q2 (50%)">
          {stats.quantile50.toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label="Q3 (75%)">
          {stats.quantile75.toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label="Máximo (100%)">
          {stats.quantile100.toFixed(2)}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
