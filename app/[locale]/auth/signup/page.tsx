'use client';

import { Form, Input, Button, message, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import api from '@/lib/api/axios';
import { Container, StyledCard, Title } from './styles';

const SignUpPage = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await api.post('/auth/register', values);
      message.success('Cadastro realizado com sucesso!');
      router.push('/auth/signin');
    } catch (error) {
      message.error('Erro ao realizar cadastro');
    }
  };

  return (
    <Container>
      <StyledCard>
        <Title>Criar Conta - Pro Sigma</Title>
        <Form
          name="signup"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nome completo" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
              { type: 'email', message: 'Email inválido!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Por favor, insira sua senha!' },
              { min: 6, message: 'A senha deve ter no mínimo 6 caracteres!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Senha"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="plan"
            rules={[{ required: true, message: 'Por favor, selecione um plano!' }]}
            initialValue="basico"
          >
            <Select size="large" placeholder="Selecione um plano">
              <Select.Option value="basico">Básico - R$ 49,90/mês</Select.Option>
              <Select.Option value="intermediario">Intermediário - R$ 99,90/mês</Select.Option>
              <Select.Option value="pro">Pro - R$ 199,90/mês</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Criar Conta
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </Container>
  );
};

export default SignUpPage;
