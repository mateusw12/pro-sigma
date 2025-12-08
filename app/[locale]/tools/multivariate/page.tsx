'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FundOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const MultivariatePage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <FundOutlined /> Análise Multivariada
        </Title>

        <Card title="Métodos Disponíveis">
          <ul>
            <li>PCA - Análise de Componentes Principais</li>
            <li>Análise Fatorial</li>
            <li>Análise de Cluster</li>
            <li>Análise Discriminante</li>
          </ul>
        </Card>

        <Card title="Resultados" style={{ marginTop: 16 }}>
          <p>Resultados da análise multivariada</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default MultivariatePage;
