'use client';

import { DashboardLayout, ProtectedRoute } from '@/components';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Card, Form, Select } from 'antd';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const NormalizationTestPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <CheckCircleOutlined /> Teste de Normalização
        </Title>

        <Card title="Configuração">
          <Form layout="vertical">
            <Form.Item label="Teste de Normalidade" name="test">
              <Select>
                <Select.Option value="shapiro-wilk">Shapiro-Wilk</Select.Option>
                <Select.Option value="kolmogorov-smirnov">
                  Kolmogorov-Smirnov
                </Select.Option>
                <Select.Option value="anderson-darling">
                  Anderson-Darling
                </Select.Option>
                <Select.Option value="dagostino">
                  DAgostino-Pearson
                </Select.Option>
              </Select>
            </Form.Item>

            <Button type="primary">Executar Teste</Button>
          </Form>
        </Card>

        <Card title="Resultados" style={{ marginTop: 16 }}>
          <p>Estatística do teste, p-valor, conclusão</p>
        </Card>

        <Card title="Gráfico Q-Q" style={{ marginTop: 16 }}>
          <p>Gráfico Q-Q Plot será exibido aqui</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default NormalizationTestPage;
