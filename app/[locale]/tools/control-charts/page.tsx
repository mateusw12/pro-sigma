'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { LineChartOutlined } from '@ant-design/icons';
import { Button, Card, Form, InputNumber, Select } from 'antd';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const ControlChartsPage = () => {
  const onFinish = (values: any) => {
    console.log('Values:', values);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <LineChartOutlined /> Cartas de Controle
        </Title>

        <Card title="Configuração">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Tipo de Carta" name="chartType">
              <Select>
                <Select.Option value="xbar-r">X-bar e R</Select.Option>
                <Select.Option value="xbar-s">X-bar e S</Select.Option>
                <Select.Option value="p">Carta P</Select.Option>
                <Select.Option value="np">Carta NP</Select.Option>
                <Select.Option value="c">Carta C</Select.Option>
                <Select.Option value="u">Carta U</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Limite Superior de Controle" name="ucl">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Limite Inferior de Controle" name="lcl">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Gerar Carta
            </Button>
          </Form>
        </Card>

        <Card title="Carta de Controle" style={{ marginTop: 16 }}>
          <p>Gráfico será exibido aqui</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default ControlChartsPage;
