'use client';

import { ReactNode } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  BarChartOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from '../common/language-switcher';
import { StyledLayout, StyledHeader, Logo, UserInfo, StyledContent } from './styled';

const {  Sider  } = Layout;

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
          <span>Plano: {(session?.user)?.plan}</span>
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
