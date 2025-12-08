import { Card, Table } from 'antd';
import { SimpleRegressionData } from './types';

interface ParameterTableProps {
  parameterEstimate: SimpleRegressionData['parameterEstimate'];
  paramData: Array<{
    key: string;
    parameter: string;
    estimate: number;
    stdError: number;
    tRatio: number;
    probT: number;
  }>;
}

export const ParameterTable = ({
  parameterEstimate,
  paramData,
}: ParameterTableProps) => {
  const columns = [
    {
      title: 'Parâmetro',
      dataIndex: 'parameter',
      key: 'parameter',
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
      title: 'Prob > |t|',
      dataIndex: 'probT',
      key: 'probT',
      render: (val: number) => val.toFixed(4),
    },
  ];

  return (
    <Card title="Estimativa dos Parâmetros" style={{ marginBottom: 24 }}>
      <Table
        columns={columns}
        dataSource={paramData}
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
        <p style={{ margin: 0, marginBottom: 8 }}>
          <strong>Interpretação dos Coeficientes:</strong>
        </p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>
            <strong>
              β₀ (Intercepto) ={' '}
              {parameterEstimate.estimate.intercept.toFixed(4)}
            </strong>
            : Valor esperado de Y quando X = 0
            {parameterEstimate.probT.intercept < 0.05
              ? ' (estatisticamente significativo)'
              : ' (NÃO significativo)'}
          </li>
          <li>
            <strong>
              β₁ (Inclinação) ={' '}
              {parameterEstimate.estimate.colunaValor.toFixed(4)}
            </strong>
            : Para cada aumento unitário em X, Y aumenta em{' '}
            {Math.abs(parameterEstimate.estimate.colunaValor).toFixed(4)}{' '}
            unidades
            {parameterEstimate.probT.colunaValor < 0.05
              ? ' (estatisticamente significativo)'
              : ' (NÃO significativo)'}
          </li>
        </ul>
      </div>
    </Card>
  );
};
