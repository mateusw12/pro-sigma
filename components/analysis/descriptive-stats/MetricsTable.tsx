import { Table, Tag } from 'antd';

interface MetricsTableProps {
  stats: {
    mean: number;
    median: number;
    mode: number;
    std: number;
    variance: number;
    skew: number;
    kurtosis: number;
    count: number;
  };
}

export const MetricsTable = ({ stats }: MetricsTableProps) => {
  const tableData = [
    {
      key: '1',
      metric: 'Média (Mean)',
      value: stats.mean.toFixed(4),
      icon: '📊',
    },
    {
      key: '2',
      metric: 'Mediana (Median)',
      value: stats.median.toFixed(4),
      icon: '📈',
    },
    {
      key: '3',
      metric: 'Moda (Mode)',
      value: stats.mode.toFixed(4),
      icon: '🎯',
    },
    {
      key: '4',
      metric: 'Desvio Padrão (Std)',
      value: stats.std.toFixed(4),
      icon: '📉',
    },
    {
      key: '5',
      metric: 'Variância (Variance)',
      value: stats.variance.toFixed(4),
      icon: '📐',
    },
    {
      key: '6',
      metric: 'Assimetria (Skewness)',
      value: stats.skew.toFixed(4),
      icon: '↗️',
    },
    {
      key: '7',
      metric: 'Curtose (Kurtosis)',
      value: stats.kurtosis.toFixed(4),
      icon: '📊',
    },
    {
      key: '8',
      metric: 'Contagem (Count)',
      value: stats.count.toString(),
      icon: '🔢',
    },
  ];

  const tableColumns = [
    {
      title: 'Métrica',
      dataIndex: 'metric',
      key: 'metric',
      render: (
        text: string,
        record: { icon: string; metric: string; value: string },
      ) => (
        <span>
          {record.icon} <strong>{text}</strong>
        </span>
      ),
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      align: 'right' as const,
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
  ];

  return (
    <Table
      dataSource={tableData}
      columns={tableColumns}
      pagination={false}
      size="small"
      style={{ marginBottom: 16 }}
    />
  );
};
