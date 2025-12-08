'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Tag, Modal, Radio, Form, Input, message, Divider } from 'antd';
import { CheckOutlined, CreditCardOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { DashboardLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth';
import api from '@/lib/api/axios';
import { PLAN_FEATURES, PLAN_PRICES } from '@/lib/constants/plans';
import type { PlanType } from '@/types/auth';
import {
  PageContainer,
  PageHeader,
  Title,
  Subtitle,
  PlansGrid,
  PlanCard,
  PlanHeader,
  PlanName,
  PriceContainer,
  Price,
  PriceLabel,
  FeaturesList,
  FeatureItem,
  PaymentModalContent,
  PaymentSection,
  SectionTitle,
  PaymentMethodCard,
  PaymentMethodLabel,
  SecurityBadge,
  SummaryBox,
  SummaryRow,
} from './styles';

interface PaymentFormData {
  paymentMethod: 'credit_card' | 'pix' | 'boleto';
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCVV?: string;
}

function PlansPage() {
  const { data: session, update } = useSession();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pix' | 'boleto'>('credit_card');
  const [form] = Form.useForm();

  const currentPlan = session?.user?.plan as PlanType;
  const isAdmin = session?.user?.isAdmin;

  const plans: PlanType[] = ['basico', 'intermediario', 'pro'];

  const isPlanDisabled = (plan: PlanType): boolean => {
    if (isAdmin) return true; // Admin não pode mudar de plano
    return plan === currentPlan;
  };

  const getPlanAction = (plan: PlanType): string => {
    if (plan === currentPlan) return 'Plano Atual';
    const planOrder = { basico: 1, intermediario: 2, pro: 3 };
    return planOrder[plan] > planOrder[currentPlan] ? 'Fazer Upgrade' : 'Fazer Downgrade';
  };

  const handleSelectPlan = (plan: PlanType) => {
    if (isPlanDisabled(plan)) return;
    setSelectedPlan(plan);
    setIsModalVisible(true);
  };

  const handlePayment = async (values: PaymentFormData) => {
    if (!selectedPlan) return;

    setLoading(true);
    try {
      // Enviar dados de pagamento para o backend
      const response = await api.post('/payments/change-plan', {
        newPlan: selectedPlan,
        paymentMethod: values.paymentMethod,
        paymentData: values.paymentMethod === 'credit_card' ? {
          cardNumber: values.cardNumber,
          cardName: values.cardName,
          cardExpiry: values.cardExpiry,
          cardCVV: values.cardCVV,
        } : null,
      });

      if (response.data.success) {
        message.success('Plano alterado com sucesso!');

        // Atualizar a sessão com o novo plano
        await update({
          ...session,
          user: {
            ...session?.user,
            plan: selectedPlan,
          },
        });

        setIsModalVisible(false);
        form.resetFields();
        setSelectedPlan(null);
      }
    } catch (error: any) {
      console.error('Erro ao processar pagamento:', error);
      message.error(
        error.response?.data?.message ||
        'Erro ao processar pagamento. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentForm = () => {
    if (paymentMethod === 'credit_card') {
      return (
        <>
          <Form.Item
            name="cardNumber"
            label="Número do Cartão"
            rules={[
              { required: true, message: 'Informe o número do cartão' },
              { pattern: /^\d{16}$/, message: 'Cartão inválido (16 dígitos)' }
            ]}
          >
            <Input
              prefix={<CreditCardOutlined />}
              placeholder="1234 5678 9012 3456"
              maxLength={16}
            />
          </Form.Item>

          <Form.Item
            name="cardName"
            label="Nome no Cartão"
            rules={[{ required: true, message: 'Informe o nome no cartão' }]}
          >
            <Input placeholder="Nome como está no cartão" />
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="cardExpiry"
              label="Validade"
              rules={[
                { required: true, message: 'Informe a validade' },
                { pattern: /^\d{2}\/\d{2}$/, message: 'Formato: MM/AA' }
              ]}
            >
              <Input placeholder="MM/AA" maxLength={5} />
            </Form.Item>

            <Form.Item
              name="cardCVV"
              label="CVV"
              rules={[
                { required: true, message: 'Informe o CVV' },
                { pattern: /^\d{3,4}$/, message: 'CVV inválido' }
              ]}
            >
              <Input.Password placeholder="123" maxLength={4} />
            </Form.Item>
          </div>
        </>
      );
    }

    if (paymentMethod === 'pix') {
      return (
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <p style={{ fontSize: '16px', marginBottom: '16px' }}>
            Após confirmar, você receberá um QR Code para pagamento via PIX
          </p>
          <p style={{ color: '#666', fontSize: '14px' }}>
            O plano será ativado automaticamente após a confirmação do pagamento
          </p>
        </div>
      );
    }

    if (paymentMethod === 'boleto') {
      return (
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <p style={{ fontSize: '16px', marginBottom: '16px' }}>
            Após confirmar, você receberá o boleto bancário por email
          </p>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Prazo de compensação: até 3 dias úteis
          </p>
        </div>
      );
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PageContainer>
          <PageHeader>
            <Title>Gerenciar Plano</Title>
            <Subtitle>
              {isAdmin
                ? 'Você é um administrador e tem acesso total à plataforma'
                : `Seu plano atual: ${currentPlan?.charAt(0).toUpperCase()}${currentPlan?.slice(1)} - Escolha um novo plano para upgrade ou downgrade`
              }
            </Subtitle>
          </PageHeader>

          <PlansGrid>
            {plans.map((plan) => {
              const isCurrentPlan = plan === currentPlan;
              const isDisabled = isPlanDisabled(plan);
              const features = [
                ...PLAN_FEATURES.basico,
                ...(plan !== 'basico' ? PLAN_FEATURES.intermediario : []),
                ...(plan === 'pro' ? PLAN_FEATURES.pro : []),
              ];

              return (
                <PlanCard
                  key={plan}
                  $isCurrentPlan={isCurrentPlan}
                  $isDisabled={isDisabled}
                  title={
                    <PlanHeader>
                      <PlanName>{plan}</PlanName>
                      {isCurrentPlan && <Tag color="blue">Plano Atual</Tag>}
                      {isAdmin && <Tag color="gold">Admin</Tag>}
                    </PlanHeader>
                  }
                >
                  <PriceContainer>
                    <Price>
                      R$ {PLAN_PRICES[plan].toFixed(2).replace('.', ',')}
                      <span>/mês</span>
                    </Price>
                    <PriceLabel>Cobrança mensal recorrente</PriceLabel>
                  </PriceContainer>

                  <FeaturesList>
                    {features.map((feature, index) => (
                      <FeatureItem key={index}>
                        <CheckOutlined />
                        <span>{feature}</span>
                      </FeatureItem>
                    ))}
                  </FeaturesList>

                  <Button
                    type={isCurrentPlan ? 'default' : 'primary'}
                    size="large"
                    block
                    disabled={isDisabled}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {getPlanAction(plan)}
                  </Button>
                </PlanCard>
              );
            })}
          </PlansGrid>

          <Modal
            title={`Alterar para Plano ${selectedPlan?.charAt(0).toUpperCase()}${selectedPlan?.slice(1)}`}
            open={isModalVisible}
            onCancel={() => {
              setIsModalVisible(false);
              form.resetFields();
              setSelectedPlan(null);
            }}
            footer={null}
            width={600}
          >
            <PaymentModalContent>
              <SummaryBox>
                <SummaryRow>
                  <span>Plano Atual:</span>
                  <strong>{currentPlan?.charAt(0).toUpperCase()}{currentPlan?.slice(1)}</strong>
                </SummaryRow>
                <SummaryRow>
                  <span>Novo Plano:</span>
                  <strong>{selectedPlan?.charAt(0).toUpperCase()}{selectedPlan?.slice(1)}</strong>
                </SummaryRow>
                <SummaryRow>
                  <span>Valor Total:</span>
                  <strong style={{ color: '#1890ff', fontSize: '20px' }}>
                    R$ {selectedPlan ? PLAN_PRICES[selectedPlan].toFixed(2).replace('.', ',') : '0,00'}
                  </strong>
                </SummaryRow>
              </SummaryBox>

              <Form
                form={form}
                layout="vertical"
                onFinish={handlePayment}
                initialValues={{ paymentMethod: 'credit_card' }}
              >
                <PaymentSection>
                  <SectionTitle>Método de Pagamento</SectionTitle>

                  <Form.Item name="paymentMethod">
                    <Radio.Group
                      style={{ width: '100%' }}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <PaymentMethodCard $selected={paymentMethod === 'credit_card'}>
                        <Radio value="credit_card">
                          <PaymentMethodLabel>
                            <CreditCardOutlined />
                            Cartão de Crédito
                          </PaymentMethodLabel>
                        </Radio>
                      </PaymentMethodCard>

                      <PaymentMethodCard $selected={paymentMethod === 'pix'}>
                        <Radio value="pix">
                          <PaymentMethodLabel>
                            💰 PIX (Aprovação instantânea)
                          </PaymentMethodLabel>
                        </Radio>
                      </PaymentMethodCard>

                      <PaymentMethodCard $selected={paymentMethod === 'boleto'}>
                        <Radio value="boleto">
                          <PaymentMethodLabel>
                            📄 Boleto Bancário
                          </PaymentMethodLabel>
                        </Radio>
                      </PaymentMethodCard>
                    </Radio.Group>
                  </Form.Item>
                </PaymentSection>

                <Divider />

                {renderPaymentForm()}

                <SecurityBadge>
                  <SafetyOutlined />
                  <span>Pagamento 100% seguro e criptografado</span>
                </SecurityBadge>

                <Form.Item style={{ marginTop: '24px', marginBottom: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={loading}
                    icon={<LockOutlined />}
                  >
                    Confirmar Pagamento
                  </Button>
                </Form.Item>
              </Form>
            </PaymentModalContent>
          </Modal>
        </PageContainer>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default PlansPage;
