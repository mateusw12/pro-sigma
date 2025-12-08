import { Card, Table } from 'antd';
import { SimpleRegressionData } from './types';

interface AnovaTableProps {
  analiseVarianca: SimpleRegressionData['analiseVarianca'];
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
  analiseVarianca,
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
      render: (val: number) => (val ? val.toFixed(4) : '-'),
    },
    {
      title: 'F',
      dataIndex: 'f',
      key: 'f',
      render: (val: number) => (val ? val.toFixed(4) : '-'),
    },
    {
      title: 'Prob > F',
      dataIndex: 'probF',
      key: 'probF',
      render: (val: number) => (val ? val.toExponential(4) : '-'),
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
          <strong>Interpretação:</strong> Com F ={' '}
          {analiseVarianca.fRatio.toFixed(4)} e p-valor ={' '}
          {analiseVarianca.probF.toExponential(4)}{' '}
          {isSignificant ? '< 0.05' : '>= 0.05'},
          {isSignificant
            ? ' o modelo de regressão é estatisticamente significativo.'
            : ' o modelo de regressão NÃO é estatisticamente significativo.'}
        </p>
      </div>
    </Card>
  );
};
