'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import styled from 'styled-components';
import { Card } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const CovEmsPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <DotChartOutlined /> COV EMS
        </Title>

        <Card title="Configuração COV EMS">
          <p>Coefficient of Variation - Error Mean Square</p>
        </Card>

        <Card title="Resultados" style={{ marginTop: 16 }}>
          <p>Análise COV EMS</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default CovEmsPage;
