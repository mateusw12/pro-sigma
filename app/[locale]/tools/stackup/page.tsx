'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { CalculatorOutlined } from '@ant-design/icons';
import { Button, Card, Form, InputNumber, Select } from 'antd';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const StackUpPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <CalculatorOutlined /> Análise StackUp
        </Title>

        <Card title="Tolerâncias das Componentes">
          <Form layout="vertical">
            <Form.Item label="Tipo de Análise" name="analysisType">
              <Select>
                <Select.Option value="worst-case">Pior Caso</Select.Option>
                <Select.Option value="rss">RSS (Root Sum Square)</Select.Option>
                <Select.Option value="monte-carlo">Monte Carlo</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Dimensão Nominal 1" name="dim1">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Tolerância 1" name="tol1">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Button type="primary">Adicionar Dimensão</Button>
            <Button type="default" style={{ marginLeft: 8 }}>
              Calcular StackUp
            </Button>
          </Form>
        </Card>

        <Card title="Resultados do StackUp" style={{ marginTop: 16 }}>
          <p>Tolerância total acumulada, dimensões críticas</p>
        </Card>

        <Card title="Visualização" style={{ marginTop: 16 }}>
          <p>Gráfico de contribuição de cada componente</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default StackUpPage;
