'use client';

import { DashboardLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth';
import { Card, Form, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Title } from './styles';

const SupportPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <QuestionCircleOutlined /> Suporte
        </Title>

        <Card title="Entre em Contato">
          <Form layout="vertical">
            <Form.Item label="Assunto" name="subject">
              <input type="text" />
            </Form.Item>
            <Form.Item label="Mensagem" name="message">
              <textarea rows={5} />
            </Form.Item>
            <Button type="primary">Enviar</Button>
          </Form>
        </Card>

        <Card title="FAQ" style={{ marginTop: 16 }}>
          <h3>Como usar as ferramentas?</h3>
          <p>Resposta...</p>

          <h3>Como fazer upgrade do plano?</h3>
          <p>Resposta...</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default SupportPage;
