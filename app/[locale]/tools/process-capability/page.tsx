'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FundOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, InputNumber, Row, Statistic } from 'antd';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const ProcessCapabilityPage = () => {
  const onFinish = (values: any) => {
    console.log('Values:', values);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <FundOutlined /> Índice de Capacidade de Processo
        </Title>

        <Card title="Parâmetros do Processo">
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Limite Superior de Especificação (USL)"
                  name="usl"
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Limite Inferior de Especificação (LSL)"
                  name="lsl"
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Valor Alvo (Target)" name="target">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Button type="primary" htmlType="submit">
              Calcular Índices
            </Button>
          </Form>
        </Card>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Cp"
                value={0}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Cpk"
                value={0}
                precision={2}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Pp"
                value={0}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>

        <Card title="Gráfico de Distribuição" style={{ marginTop: 16 }}>
          <p>Gráfico será exibido aqui</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default ProcessCapabilityPage;
