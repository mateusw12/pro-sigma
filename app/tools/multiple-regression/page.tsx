'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import styled from 'styled-components';
import { Card, Table } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const MultipleRegressionPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <BarChartOutlined /> Regressão Múltipla
        </Title>

        <Card title="Variáveis Independentes">
          <Table dataSource={[]} columns={[]} />
        </Card>

        <Card title="Coeficientes de Regressão" style={{ marginTop: 16 }}>
          <p>Coeficientes, p-valores, intervalos de confiança</p>
        </Card>

        <Card title="Diagnóstico do Modelo" style={{ marginTop: 16 }}>
          <p>R², R² ajustado, RMSE, gráficos de resíduos</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default MultipleRegressionPage;
