'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ExperimentOutlined } from '@ant-design/icons';
import { Button, Card, Form, InputNumber, Select } from 'antd';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const HypothesisTestPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <ExperimentOutlined /> Teste de Hipótese
        </Title>

        <Card title="Configuração do Teste">
          <Form layout="vertical">
            <Form.Item label="Tipo de Teste" name="testType">
              <Select>
                <Select.Option value="t-test">Teste T</Select.Option>
                <Select.Option value="z-test">Teste Z</Select.Option>
                <Select.Option value="anova">ANOVA</Select.Option>
                <Select.Option value="chi-square">Qui-Quadrado</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Nível de Significância (α)" name="alpha">
              <InputNumber
                min={0}
                max={1}
                step={0.01}
                defaultValue={0.05}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Button type="primary">Executar Teste</Button>
          </Form>
        </Card>

        <Card title="Resultados" style={{ marginTop: 16 }}>
          <p>Resultados do teste serão exibidos aqui</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default HypothesisTestPage;
