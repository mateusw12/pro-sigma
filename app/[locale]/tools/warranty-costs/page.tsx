'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import styled from 'styled-components';
import { Card, Form, InputNumber, Button, Table } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const WarrantyCostsPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <DollarOutlined /> Análise de Custos de Garantia
        </Title>

        <Card title="Parâmetros de Análise">
          <Form layout="vertical">
            <Form.Item label="Período de Garantia (meses)" name="warrantyPeriod">
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Custo Médio de Reparo" name="avgRepairCost">
              <InputNumber
                prefix="R$"
                min={0}
                step={0.01}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item label="Taxa de Falha (%)" name="failureRate">
              <InputNumber min={0} max={100} step={0.1} style={{ width: '100%' }} />
            </Form.Item>

            <Button type="primary">Calcular Custos</Button>
          </Form>
        </Card>

        <Card title="Projeção de Custos" style={{ marginTop: 16 }}>
          <Table dataSource={[]} columns={[]} />
        </Card>

        <Card title="Gráfico de Tendências" style={{ marginTop: 16 }}>
          <p>Gráfico de evolução dos custos de garantia ao longo do tempo</p>
        </Card>

        <Card title="Análise de Pareto" style={{ marginTop: 16 }}>
          <p>Principais causas de falha e seus custos associados</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default WarrantyCostsPage;
