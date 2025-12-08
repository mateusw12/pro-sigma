'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { TableOutlined } from '@ant-design/icons';
import { Card, Table } from 'antd';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const DescriptiveStatsPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <TableOutlined /> Estatística Descritiva
        </Title>

        <Card title="Dados">
          <Table dataSource={[]} columns={[]} />
        </Card>

        <Card title="Estatísticas" style={{ marginTop: 16 }}>
          <p>Média, Mediana, Moda, Desvio Padrão, Variância, etc.</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DescriptiveStatsPage;
