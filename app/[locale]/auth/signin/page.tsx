'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Container, StyledCard, Title } from './styles';

const SignInPage = () => {
  const router = useRouter();
  const t = useTranslations('auth.signin');
  const locale = useLocale();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        message.error(t('invalidCredentials'));
      } else {
        message.success(t('loginSuccess'));
        router.push(`/${locale}/dashboard`);
      }
    } catch (error) {
      message.error(t('loginError'));
    }
  };

  return (
    <Container>
      <StyledCard>
        <Title>{t('title')}</Title>
        <Form
          name="signin"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t('emailRequired') },
              { type: 'email', message: t('emailInvalid') },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t('email')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('passwordRequired') }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('password')}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {t('signIn')}
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </Container>
  );
};

export default SignInPage;
