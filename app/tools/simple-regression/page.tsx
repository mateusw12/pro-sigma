'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import styled from 'styled-components';
import { Card, Form, InputNumber, Button } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const SimpleRegressionPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <LineChartOutlined /> Regressão Simples
        </Title>

        <Card title="Upload de Dados">
          <p>Faça upload dos dados para regressão</p>
        </Card>

        <Card title="Resultados da Regressão" style={{ marginTop: 16 }}>
          <Form layout="vertical">
            <Form.Item label="Coeficiente (a)">
              <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Intercepto (b)">
              <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="R²">
              <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Card>

        <Card title="Gráfico de Dispersão" style={{ marginTop: 16 }}>
          <p>Gráfico com linha de regressão</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SimpleRegressionPage;
