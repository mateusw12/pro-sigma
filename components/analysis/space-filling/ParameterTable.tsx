import { Card, Table, Tag } from 'antd';

interface ParameterTableProps {
  paramData: Array<{
    key: string;
    term: string;
    estimate: number;
    stdError: number;
    tRatio: number;
    pValue: number;
  }>;
}

export const ParameterTable = ({ paramData }: ParameterTableProps) => {
  const columns = [
    {
      title: 'Termo',
      dataIndex: 'term',
      key: 'term',
      width: 150,
      render: (term: string) => <strong>{term}</strong>,
    },
    {
      title: 'Estimativa',
      dataIndex: 'estimate',
      key: 'estimate',
      render: (val: number) => val.toFixed(4),
    },
    {
      title: 'Erro Padrão',
      dataIndex: 'stdError',
      key: 'stdError',
      render: (val: number) => val.toFixed(4),
    },
    {
      title: 't-Ratio',
      dataIndex: 'tRatio',
      key: 'tRatio',
      render: (val: number) => val.toFixed(4),
    },
    {
      title: 'p-Valor',
      dataIndex: 'pValue',
      key: 'pValue',
      render: (val: number) => (
        <span style={{ color: val < 0.05 ? '#52c41a' : '#999' }}>
          {val.toFixed(6)}
        </span>
      ),
    },
    {
      title: 'Significância',
      key: 'significance',
      width: 120,
      align: 'center' as const,
      render: (_: unknown, record: { pValue: number }) => {
        if (record.pValue < 0.001) {
          return <Tag color="green">***</Tag>;
        } else if (record.pValue < 0.01) {
          return <Tag color="blue">**</Tag>;
        } else if (record.pValue < 0.05) {
          return <Tag color="cyan">*</Tag>;
        } else if (record.pValue < 0.1) {
          return <Tag color="orange">·</Tag>;
        } else {
          return <Tag>NS</Tag>;
        }
      },
    },
  ];

  return (
    <Card title="Estimativa dos Parâmetros" style={{ marginBottom: 24 }}>
      <Table
        columns={columns}
        dataSource={paramData}
        pagination={false}
        size="small"
        scroll={{ y: 400 }}
      />
      <div
        style={{
          marginTop: 16,
          padding: '12px',
          background: '#fafafa',
          borderRadius: 4,
        }}
      >
        <p style={{ margin: 0, marginBottom: 8 }}>
          <strong>Interpretação dos Termos:</strong>
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12 }}>
          <li>
            <strong>Intercept:</strong> Valor base da resposta
          </li>
          <li>
            <strong>Efeitos lineares (A, B, C, etc.):</strong> Impacto direto de
            cada fator
          </li>
          <li>
            <strong>Efeitos quadráticos (A/A, B/B, etc.):</strong> Curvatura da
            resposta
          </li>
          <li>
            <strong>Interações (A*B, A*C, etc.):</strong> Efeitos combinados de
            fatores
          </li>
        </ul>
        <p style={{ margin: '8px 0 0 0', fontSize: 12 }}>
          <strong>Legenda de significância:</strong> *** p&lt;0.001 | **
          p&lt;0.01 | * p&lt;0.05 | · p&lt;0.1 | NS não significativo
        </p>
      </div>
    </Card>
  );
};
