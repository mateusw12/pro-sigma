'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { RocketOutlined, BarChartOutlined, LineChartOutlined } from '@ant-design/icons';
import {
  Container,
  Hero,
  Title,
  Subtitle,
  ButtonGroup,
  FeatureSection,
  FeatureCard,
} from '../styles';

export default function Home() {
  const router = useRouter();
  const t = useTranslations('home');

  return (
    <Container>
      <Hero>
        <Title>
          <RocketOutlined /> {t('title')}
        </Title>
        <Subtitle>
          {t('subtitle')}
        </Subtitle>
        <ButtonGroup>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push('/workspace')}
          >
            {t('accessWorkspace')}
          </Button>
          <Button
            size="large"
            style={{ background: 'white', color: '#667eea' }}
            onClick={() => router.push('/auth/signin')}
          >
            {t('login')}
          </Button>
        </ButtonGroup>

        <FeatureSection>
          <FeatureCard>
            <BarChartOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
            <h3>{t('statisticalAnalysis')}</h3>
            <p>{t('statisticalAnalysisDesc')}</p>
          </FeatureCard>

          <FeatureCard>
            <LineChartOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
            <h3>{t('qualityControl')}</h3>
            <p>{t('qualityControlDesc')}</p>
          </FeatureCard>

          <FeatureCard>
            <RocketOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
            <h3>{t('doeSimulations')}</h3>
            <p>{t('doeSimulationsDesc')}</p>
          </FeatureCard>
        </FeatureSection>
      </Hero>
    </Container>
  );
}
