'use client';

import { BarChartOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Card, Tag } from 'antd';
import { BoxPlotVisualization } from './BoxPlotVisualization';
import { HistogramChart } from './HistogramChart';
import { MetricsTable } from './MetricsTable';
import { StatisticalInterpretation } from './StatisticalInterpretation';
import { StatsSummary } from './StatsSummary';
import { createHistogramData } from './utils';

interface DescriptiveStatsData {
  mean: number;
  std: number;
  mode: number;
  kurtosis: number;
  median: number;
  quantile25: number;
  quantile75: number;
  quantile100: number;
  quantile50: number;
  variance: number;
  skew: number;
  count: number;
  y: number[];
}

interface DescriptiveStatsResultProps {
  data: {
    result: {
      [key: string]: DescriptiveStatsData;
    };
  };
  onClose?: () => void;
}

export const DescriptiveStatsResult = ({
  data,
  onClose,
}: DescriptiveStatsResultProps) => {
  const columns = Object.keys(data.result);

  const renderColumnStats = (
    columnName: string,
    stats: DescriptiveStatsData,
  ) => {
    const histogramData = createHistogramData(stats.y);

    return (
      <Card
        key={columnName}
        title={
          <span>
            <BarChartOutlined /> Coluna: {columnName}
          </span>
        }
        style={{ marginBottom: 24 }}
      >
        <StatsSummary stats={stats} />
        <BoxPlotVisualization stats={stats} />
        <HistogramChart histogramData={histogramData} stats={stats} />
        <MetricsTable stats={stats} />
        <StatisticalInterpretation stats={stats} />
      </Card>
    );
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <div
        style={{
          marginBottom: 24,
          padding: 16,
          background: '#e6f7ff',
          border: '1px solid #91d5ff',
          borderRadius: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: '#0050b3' }}>
            📊 Análise de Estatística Descritiva Concluída
          </h3>
          <p style={{ margin: '8px 0 0 0', color: '#096dd9' }}>
            {columns.length} coluna(s) analisada(s):{' '}
            {columns.map((col) => (
              <Tag key={col} color="blue">
                {col}
              </Tag>
            ))}
          </p>
        </div>
        {onClose && (
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{ color: '#0050b3' }}
          >
            Fechar
          </Button>
        )}
      </div>

      {columns.map((columnName) =>
        renderColumnStats(columnName, data.result[columnName]),
      )}
    </div>
  );
};
