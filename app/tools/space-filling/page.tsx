'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import styled from 'styled-components';
import { Card } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const SpaceFillingPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <AppstoreOutlined /> Space Filling Design
        </Title>

        <Card title="Métodos de Space Filling">
          <ul>
            <li>Latin Hypercube Sampling</li>
            <li>Sobol Sequences</li>
            <li>Halton Sequences</li>
            <li>Uniform Design</li>
          </ul>
        </Card>

        <Card title="Configuração" style={{ marginTop: 16 }}>
          <p>Parâmetros do design experimental</p>
        </Card>

        <Card title="Visualização" style={{ marginTop: 16 }}>
          <p>Gráfico de distribuição dos pontos</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SpaceFillingPage;
