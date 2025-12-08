'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import styled from 'styled-components';
import { Card } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const MonteCarloPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <LineChartOutlined /> Simulação Monte Carlo
        </Title>

        <Card title="Configuração da Simulação">
          <p>Parâmetros de simulação</p>
        </Card>

        <Card title="Resultados" style={{ marginTop: 16 }}>
          <p>Resultados da simulação Monte Carlo</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default MonteCarloPage;
