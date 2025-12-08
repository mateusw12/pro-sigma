'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FileTextOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1890ff;
`;

const TextAnalysisPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>
          <FileTextOutlined /> Análise de Texto
        </Title>

        <Card title="Upload de Texto">
          <textarea
            rows={10}
            style={{ width: '100%', padding: '10px' }}
            placeholder="Cole seu texto aqui..."
          />
          <Button type="primary" style={{ marginTop: 16 }}>
            Analisar
          </Button>
        </Card>

        <Card title="Resultados da Análise" style={{ marginTop: 16 }}>
          <p>Frequência de palavras, sentimento, tópicos principais</p>
        </Card>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TextAnalysisPage;
