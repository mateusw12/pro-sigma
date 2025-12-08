'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { LineChartOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Table, Upload, message } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const VariabilityPage = () => {
  const [data, setData] = useState([]);

  const handleUpload = (file: any) => {
    message.success('Arquivo carregado com sucesso!');
    return false;
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <LineChartOutlined /> Análise de Variabilidade
        </Title>

        <Card title="Upload de Dados" style={{ marginBottom: 16 }}>
          <Upload beforeUpload={handleUpload} accept=".csv,.xlsx">
            <Button icon={<UploadOutlined />}>Selecionar Arquivo</Button>
          </Upload>
        </Card>

        <Card title="Dados">
          <Table dataSource={data} columns={[]} />
        </Card>

        <Card title="Gráfico de Variabilidade" style={{ marginTop: 16 }}>
          <p>Gráfico será exibido aqui</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default VariabilityPage;
