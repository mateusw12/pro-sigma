'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import styled from 'styled-components';
import { Card, Form, Select, InputNumber, Button } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const DoePage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <ExperimentOutlined /> Design of Experiments (DOE)
        </Title>

        <Card title="Configuração do DOE">
          <Form layout="vertical">
            <Form.Item label="Tipo de Design" name="designType">
              <Select>
                <Select.Option value="full-factorial">Fatorial Completo</Select.Option>
                <Select.Option value="fractional-factorial">Fatorial Fracionado</Select.Option>
                <Select.Option value="response-surface">Superfície de Resposta</Select.Option>
                <Select.Option value="taguchi">Taguchi</Select.Option>
                <Select.Option value="plackett-burman">Plackett-Burman</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Número de Fatores" name="factors">
              <InputNumber min={2} max={10} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Número de Níveis" name="levels">
              <InputNumber min={2} max={5} style={{ width: '100%' }} />
            </Form.Item>

            <Button type="primary">Gerar Design</Button>
          </Form>
        </Card>

        <Card title="Matriz de Experimentos" style={{ marginTop: 16 }}>
          <p>Tabela com combinações de fatores</p>
        </Card>

        <Card title="Análise de Efeitos" style={{ marginTop: 16 }}>
          <p>Gráfico de efeitos principais e interações</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DoePage;
