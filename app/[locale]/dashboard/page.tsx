'use client';

import { DashboardLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth';
import { Card, Row, Col, Statistic, Button } from 'antd';
import {
  BarChartOutlined,
  LineChartOutlined,
  FundOutlined,
  ExperimentOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Title, StyledCard, QuickAccessCard } from './styles';

const DashboardPage = () => {
  const router = useRouter();
  const t = useTranslations('dashboard');
  const locale = useLocale();

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Title>{t('title')}</Title>

        <QuickAccessCard>
          <h2>{t('startNewAnalysis')}</h2>
          <p style={{ marginBottom: 16 }}>
            {t('uploadFileDesc')}
          </p>
          <Button
            type="primary"
            size="large"
            icon={<FileAddOutlined />}
            onClick={() => router.push(`/${locale}/workspace`)}
            style={{ background: 'white', color: '#667eea', borderColor: 'white' }}
          >
            {t('goToWorkspace')}
          </Button>
        </QuickAccessCard>
        <Row gutter={16}>
          <Col span={6}>
            <StyledCard>
              <Statistic
                title={t('analysesPerformed')}
                value={23}
                prefix={<BarChartOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </StyledCard>
          </Col>
          <Col span={6}>
            <StyledCard>
              <Statistic
                title={t('activeProjects')}
                value={5}
                prefix={<FundOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </StyledCard>
          </Col>
          <Col span={6}>
            <StyledCard>
              <Statistic
                title={t('doeExperiments')}
                value={8}
                prefix={<ExperimentOutlined />}
                valueStyle={{ color: '#cf1322' }}
              />
            </StyledCard>
          </Col>
          <Col span={6}>
            <StyledCard>
              <Statistic
                title={t('generatedReports')}
                value={15}
                prefix={<LineChartOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </StyledCard>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={12}>
            <Card title={t('recentAnalyses')} bordered={false}>
              <p>Análise de Variabilidade - Produto A</p>
              <p>Teste de Hipótese - Lote 123</p>
              <p>Monte Carlo - Simulação Processo X</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t('mostUsedTools')} bordered={false}>
              <p>1. Variability</p>
              <p>2. Teste de Hipótese</p>
              <p>3. Cartas de Controle</p>
            </Card>
          </Col>
        </Row>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;
