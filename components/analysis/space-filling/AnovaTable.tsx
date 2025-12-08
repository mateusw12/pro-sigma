import { Card, Table } from 'antd';
import { SpaceFillingData } from './types';

interface AnovaTableProps {
  anovaTable: SpaceFillingData['spaceFilling'][string]['anovaTable'];
  isSignificant: boolean;
  anovaData: Array<{
    key: string;
    source: string;
    df: number;
    ss: number;
    ms: number | null;
    f: number | null;
    probF: number | null;
  }>;
}

export const AnovaTable = ({
  anovaTable,
  isSignificant,
  anovaData,
}: AnovaTableProps) => {
  const columns = [
    {
      title: 'Fonte',
      dataIndex: 'source',
      key: 'source',
      width: 150,
    },
    {
      title: 'GL',
      dataIndex: 'df',
      key: 'df',
      width: 80,
    },
    {
      title: 'SQ',
      dataIndex: 'ss',
      key: 'ss',
      render: (val: number) => val.toFixed(4),
    },
    {
      title: 'MQ',
      dataIndex: 'ms',
      key: 'ms',
      render: (val: number | null) => (val ? val.toFixed(4) : '-'),
    },
    {
      title: 'F',
      dataIndex: 'f',
      key: 'f',
      render: (val: number | null) => (val ? val.toFixed(4) : '-'),
    },
    {
      title: 'Prob > F',
      dataIndex: 'probF',
      key: 'probF',
      render: (val: number | null) => (val ? val.toFixed(6) : '-'),
    },
  ];

  return (
    <Card title="Análise de Variância (ANOVA)" style={{ marginBottom: 24 }}>
      <Table
        columns={columns}
        dataSource={anovaData}
        pagination={false}
        size="small"
      />
      <div
        style={{
          marginTop: 16,
          padding: '12px',
          background: '#fafafa',
          borderRadius: 4,
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Interpretação:</strong> Com F = {anovaTable.fRatio.toFixed(4)}{' '}
          e p-valor = {anovaTable.probF.toFixed(6)}{' '}
          {isSignificant ? '< 0.05' : '>= 0.05'},
          {isSignificant
            ? ' o modelo de superfície de resposta é estatisticamente significativo.'
            : ' o modelo NÃO é estatisticamente significativo.'}
        </p>
      </div>
    </Card>
  );
};
