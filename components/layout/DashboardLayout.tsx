'use client';

import {
  BarChartOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  HistoryOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { LanguageSwitcher } from '../common/language-switcher';
import {
  Logo,
  StyledContent,
  StyledHeader,
  StyledLayout,
  UserInfo,
} from './styled';

const { Sider } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const t = useTranslations('nav');
  const locale = useLocale();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: t('dashboard'),
      onClick: () => router.push(`/${locale}/dashboard`),
    },
    {
      key: 'workspace',
      icon: <BarChartOutlined />,
      label: t('workspace'),
      onClick: () => router.push(`/${locale}/workspace`),
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: t('history'),
      onClick: () => router.push(`/${locale}/history`),
    },
    {
      key: 'plans',
      icon: <CreditCardOutlined />,
      label: t('plans'),
      onClick: () => router.push(`/${locale}/plans`),
    },
    {
      key: 'support',
      icon: <QuestionCircleOutlined />,
      label: t('support'),
      onClick: () => router.push(`/${locale}/support`),
    },
  ];

  return (
    <StyledLayout>
      <StyledHeader>
        <Logo>Pro Sigma</Logo>
        <UserInfo>
          <span>{session?.user?.email}</span>
          <span>Plano: {session?.user?.plan}</span>
          <LanguageSwitcher />
          <LogoutOutlined
            onClick={() => signOut()}
            style={{ cursor: 'pointer' }}
          />
        </UserInfo>
      </StyledHeader>
      <Layout>
        <Sider width={250} theme="light">
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: '0' }}>
          <StyledContent>{children}</StyledContent>
        </Layout>
      </Layout>
    </StyledLayout>
  );
};

export default DashboardLayout;
