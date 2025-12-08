'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { BarChartOutlined } from '@ant-design/icons';
import { Button, Card, Form, Select } from 'antd';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const DistributionTestPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <BarChartOutlined /> Teste de Distribuição
        </Title>

        <Card title="Seleção de Distribuição">
          <Form layout="vertical">
            <Form.Item label="Tipo de Distribuição" name="distribution">
              <Select>
                <Select.Option value="normal">Normal</Select.Option>
                <Select.Option value="lognormal">Log-Normal</Select.Option>
                <Select.Option value="weibull">Weibull</Select.Option>
                <Select.Option value="exponential">Exponencial</Select.Option>
                <Select.Option value="gamma">Gamma</Select.Option>
                <Select.Option value="beta">Beta</Select.Option>
              </Select>
            </Form.Item>

            <Button type="primary">Testar Distribuição</Button>
          </Form>
        </Card>

        <Card title="Gráfico de Ajuste" style={{ marginTop: 16 }}>
          <p>Gráfico de ajuste da distribuição será exibido aqui</p>
        </Card>

        <Card title="Estatísticas de Ajuste" style={{ marginTop: 16 }}>
          <p>Estatísticas de qualidade do ajuste serão exibidas aqui</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DistributionTestPage;
