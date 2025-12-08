import { Card, Col, Row } from 'antd';

interface BoxPlotVisualizationProps {
  stats: {
    mean: number;
    median: number;
    quantile25: number;
    quantile75: number;
    quantile100: number;
    y: number[];
  };
}

export const BoxPlotVisualization = ({ stats }: BoxPlotVisualizationProps) => {
  const min = Math.min(...stats.y);
  const max = stats.quantile100;
  const range = max - min;
  const getPosition = (value: number) => ((value - min) / range) * 100;

  return (
    <Card
      type="inner"
      title="📦 Visualização Box Plot"
      size="small"
      style={{ marginBottom: 16 }}
    >
      <div style={{ padding: '20px 0' }}>
        <div
          style={{
            position: 'relative',
            height: '80px',
            margin: '0 40px',
          }}
        >
          {/* Linha completa (mín a máx) */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '0',
              right: '0',
              height: '2px',
              background: '#d9d9d9',
            }}
          />

          {/* Mínimo */}
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(min)}%`,
              top: '30px',
              width: '2px',
              height: '20px',
              background: '#ff4d4f',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(min)}%`,
              top: '55px',
              transform: 'translateX(-50%)',
              fontSize: '11px',
              color: '#ff4d4f',
              fontWeight: 'bold',
            }}
          >
            Min
            <br />
            {min.toFixed(1)}
          </div>

          {/* Box (Q1 a Q3) */}
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(stats.quantile25)}%`,
              width: `${getPosition(stats.quantile75) - getPosition(stats.quantile25)}%`,
              top: '20px',
              height: '40px',
              background: 'rgba(24, 144, 255, 0.2)',
              border: '2px solid #1890ff',
              borderRadius: '4px',
            }}
          />

          {/* Q1 */}
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(stats.quantile25)}%`,
              top: '20px',
              width: '2px',
              height: '40px',
              background: '#1890ff',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(stats.quantile25)}%`,
              top: '5px',
              transform: 'translateX(-50%)',
              fontSize: '10px',
              color: '#1890ff',
            }}
          >
            Q1: {stats.quantile25.toFixed(1)}
          </div>

          {/* Mediana */}
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(stats.median)}%`,
              top: '20px',
              width: '3px',
              height: '40px',
              background: '#52c41a',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(stats.median)}%`,
              top: '65px',
              transform: 'translateX(-50%)',
              fontSize: '11px',
              color: '#52c41a',
              fontWeight: 'bold',
            }}
          >
            Mediana
            <br />
            {stats.median.toFixed(1)}
          </div>

          {/* Média (marcador diferente) */}
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(stats.mean)}%`,
              top: '35px',
              width: '10px',
              height: '10px',
              background: '#faad14',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              border: '2px solid white',
              boxShadow: '0 0 4px rgba(0,0,0,0.3)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(stats.mean)}%`,
              top: '-5px',
              transform: 'translateX(-50%)',
              fontSize: '10px',
              color: '#faad14',
              fontWeight: 'bold',
            }}
          >
            μ: {stats.mean.toFixed(1)}
          </div>

          {/* Q3 */}
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(stats.quantile75)}%`,
              top: '20px',
              width: '2px',
              height: '40px',
              background: '#1890ff',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(stats.quantile75)}%`,
              top: '5px',
              transform: 'translateX(-50%)',
              fontSize: '10px',
              color: '#1890ff',
            }}
          >
            Q3: {stats.quantile75.toFixed(1)}
          </div>

          {/* Máximo */}
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(max)}%`,
              top: '30px',
              width: '2px',
              height: '20px',
              background: '#ff4d4f',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${getPosition(max)}%`,
              top: '55px',
              transform: 'translateX(-50%)',
              fontSize: '11px',
              color: '#ff4d4f',
              fontWeight: 'bold',
            }}
          >
            Max
            <br />
            {max.toFixed(1)}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 20,
          padding: 8,
          background: '#f0f2f5',
          borderRadius: 4,
          fontSize: '11px',
        }}
      >
        <Row gutter={8}>
          <Col span={8}>
            <span style={{ color: '#1890ff' }}>■</span> IQR (Q3-Q1):{' '}
            {(stats.quantile75 - stats.quantile25).toFixed(2)}
          </Col>
          <Col span={8}>
            <span style={{ color: '#52c41a' }}>▌</span> Mediana (Q2):{' '}
            {stats.median.toFixed(2)}
          </Col>
          <Col span={8}>
            <span style={{ color: '#faad14' }}>●</span> Média (μ):{' '}
            {stats.mean.toFixed(2)}
          </Col>
        </Row>
      </div>
    </Card>
  );
};
