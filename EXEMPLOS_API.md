# 📝 Exemplos de Requisições - API de Pagamentos

## 🔧 Configuração do Axios (Frontend)

```typescript
// lib/api/axios.ts - Já configurado
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ou usar next-auth
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 💳 Exemplo 1: Pagamento com Cartão de Crédito

```typescript
import api from '@/lib/api/axios';

const changePlanWithCard = async () => {
  try {
    const response = await api.post('/api/payments/change-plan', {
      newPlan: 'pro',
      paymentMethod: 'credit_card',
      paymentData: {
        cardNumber: '4242424242424242', // Cartão de teste Stripe
        cardName: 'João Silva',
        cardExpiry: '12/25',
        cardCVV: '123',
      },
    });

    console.log('Pagamento aprovado:', response.data);
    // {
    //   success: true,
    //   message: "Plano alterado com sucesso!",
    //   paymentId: "pay_abc123",
    //   transactionId: "txn_xyz789"
    // }

    return response.data;
  } catch (error) {
    console.error('Erro no pagamento:', error.response?.data);
    // {
    //   success: false,
    //   message: "Cartão recusado. Verifique os dados.",
    //   error: "CARD_DECLINED"
    // }
  }
};
```

---

## 💰 Exemplo 2: Pagamento com PIX

```typescript
const changePlanWithPix = async () => {
  try {
    const response = await api.post('/api/payments/change-plan', {
      newPlan: 'intermediario',
      paymentMethod: 'pix',
      paymentData: null, // PIX não precisa de dados adicionais
    });

    console.log('QR Code gerado:', response.data);
    // {
    //   success: true,
    //   message: "QR Code PIX gerado. Efetue o pagamento.",
    //   paymentId: "pay_pix_123",
    //   pixQRCode: "00020126580014br.gov.bcb.pix...",
    //   transactionId: "txn_pix_456"
    // }

    // Exibir QR Code para o usuário
    displayPixQRCode(response.data.pixQRCode);

    // Polling para verificar pagamento
    const checkPayment = setInterval(async () => {
      const status = await api.get(
        `/api/payments/status/${response.data.paymentId}`,
      );

      if (status.data.status === 'approved') {
        clearInterval(checkPayment);
        console.log('Pagamento aprovado!');
        // Atualizar interface
      }
    }, 3000); // Verificar a cada 3 segundos
  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
  }
};

const displayPixQRCode = (qrCodeData: string) => {
  // Usar biblioteca como react-qr-code
  // <QRCode value={qrCodeData} size={256} />
};
```

---

## 📄 Exemplo 3: Pagamento com Boleto

```typescript
const changePlanWithBoleto = async () => {
  try {
    const response = await api.post('/api/payments/change-plan', {
      newPlan: 'basico',
      paymentMethod: 'boleto',
      paymentData: null,
    });

    console.log('Boleto gerado:', response.data);
    // {
    //   success: true,
    //   message: "Boleto gerado com sucesso.",
    //   paymentId: "pay_bol_123",
    //   boletoUrl: "https://api.prosigma.com/boletos/bol_123.pdf",
    //   transactionId: "txn_bol_456"
    // }

    // Abrir boleto em nova aba
    window.open(response.data.boletoUrl, '_blank');

    // Exibir instruções ao usuário
    showBoletoInstructions();
  } catch (error) {
    console.error('Erro ao gerar boleto:', error);
  }
};
```

---

## 📊 Exemplo 4: Consultar Status do Pagamento

```typescript
const checkPaymentStatus = async (paymentId: string) => {
  try {
    const response = await api.get(`/api/payments/status/${paymentId}`);

    console.log('Status do pagamento:', response.data);
    // {
    //   id: "pay_abc123",
    //   status: "approved",
    //   amount: 199.90,
    //   paymentMethod: "credit_card",
    //   createdAt: "2025-12-05T10:30:00Z",
    //   updatedAt: "2025-12-05T10:31:00Z"
    // }

    switch (response.data.status) {
      case 'pending':
        console.log('Aguardando pagamento...');
        break;
      case 'processing':
        console.log('Processando pagamento...');
        break;
      case 'approved':
        console.log('Pagamento aprovado!');
        break;
      case 'rejected':
        console.log('Pagamento recusado.');
        break;
      case 'cancelled':
        console.log('Pagamento cancelado.');
        break;
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao consultar status:', error);
  }
};
```

---

## 📜 Exemplo 5: Listar Faturas

```typescript
const listInvoices = async () => {
  try {
    const response = await api.get('/api/payments/invoices', {
      params: {
        status: 'paid', // Filtrar por pagas
        limit: 10,
        offset: 0,
      },
    });

    console.log('Faturas:', response.data);
    // {
    //   invoices: [
    //     {
    //       id: "inv_123",
    //       userId: "user_456",
    //       plan: "pro",
    //       amount: 199.90,
    //       status: "paid",
    //       dueDate: "2025-12-10T00:00:00Z",
    //       paidAt: "2025-12-05T14:30:00Z",
    //       paymentMethod: "credit_card",
    //       invoiceUrl: "https://api.prosigma.com/invoices/inv_123.pdf"
    //     }
    //   ],
    //   total: 1,
    //   limit: 10,
    //   offset: 0
    // }

    return response.data.invoices;
  } catch (error) {
    console.error('Erro ao listar faturas:', error);
  }
};
```

---

## 🚫 Exemplo 6: Cancelar Assinatura

```typescript
const cancelSubscription = async () => {
  try {
    const response = await api.post('/api/payments/cancel-subscription', {
      reason: 'Não estou usando mais o serviço',
      feedback: 'Gostaria de mais ferramentas de análise estatística',
    });

    console.log('Assinatura cancelada:', response.data);
    // {
    //   success: true,
    //   message: "Assinatura cancelada. Você terá acesso até 10/01/2026.",
    //   accessUntil: "2026-01-10T23:59:59Z"
    // }

    return response.data;
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
  }
};
```

---

## 🔔 Exemplo 7: Atualizar Sessão após Pagamento

```typescript
import { useSession } from 'next-auth/react';

const UpdatePlanComponent = () => {
  const { data: session, update } = useSession();

  const handlePaymentSuccess = async (newPlan: string) => {
    // Atualizar a sessão com o novo plano
    await update({
      ...session,
      user: {
        ...session?.user,
        plan: newPlan,
      },
    });

    console.log('Sessão atualizada!');
  };

  return (
    <button onClick={() => handlePaymentSuccess('pro')}>
      Simular Upgrade
    </button>
  );
};
```

---

## ⚠️ Exemplo 8: Tratamento de Erros

```typescript
import { message } from 'antd';

const handlePaymentError = (error: any) => {
  const errorMessage = error.response?.data?.message || 'Erro desconhecido';
  const errorCode = error.response?.data?.error;

  switch (errorCode) {
    case 'CARD_DECLINED':
      message.error('Cartão recusado. Verifique os dados ou use outro cartão.');
      break;
    case 'INSUFFICIENT_FUNDS':
      message.error('Saldo insuficiente.');
      break;
    case 'EXPIRED_CARD':
      message.error('Cartão vencido.');
      break;
    case 'INVALID_CVV':
      message.error('CVV inválido.');
      break;
    default:
      message.error(errorMessage);
  }
};

// Uso:
try {
  await changePlanWithCard();
} catch (error) {
  handlePaymentError(error);
}
```

---

## 🎨 Exemplo 9: Componente de QR Code PIX

```typescript
import QRCode from 'react-qr-code';
import { Modal, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

interface PixModalProps {
  visible: boolean;
  qrCodeData: string;
  onClose: () => void;
}

const PixModal = ({ visible, qrCodeData, onClose }: PixModalProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrCodeData);
    message.success('Código PIX copiado!');
  };

  return (
    <Modal
      title="Pagamento via PIX"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <h3>Escaneie o QR Code</h3>
        <QRCode value={qrCodeData} size={256} />

        <p style={{ marginTop: '24px' }}>
          Ou copie o código PIX:
        </p>

        <Button
          icon={<CopyOutlined />}
          onClick={copyToClipboard}
          block
        >
          Copiar Código PIX
        </Button>

        <p style={{ color: '#999', fontSize: '12px', marginTop: '16px' }}>
          Após o pagamento, seu plano será ativado automaticamente.
        </p>
      </div>
    </Modal>
  );
};
```

---

## 🧪 Cartões de Teste (Stripe)

```typescript
// Sucesso
const testCards = {
  success: '4242424242424242',

  // Erros específicos
  declined: '4000000000000002',
  insufficientFunds: '4000000000009995',
  lostCard: '4000000000009987',
  stolenCard: '4000000000009979',
  expiredCard: '4000000000000069',
  incorrectCVC: '4000000000000127',
  processingError: '4000000000000119',

  // 3D Secure
  requiresAuth: '4000002500003155',
};

// Uso:
<Input defaultValue={testCards.success} />
```

---

## 📱 Exemplo 10: Webhook Handler (Backend)

```python
# Backend - FastAPI
@router.post("/webhook")
async def payment_webhook(request: dict):
    event = request.get("event")
    payment_id = request.get("paymentId")
    user_id = request.get("userId")

    if event == "payment.approved":
        # Buscar pagamento no banco
        payment = db.query(Payment).filter(Payment.id == payment_id).first()

        # Atualizar status
        payment.status = "approved"
        db.commit()

        # Atualizar plano do usuário
        user = db.query(User).filter(User.id == user_id).first()
        user.plan = payment.new_plan
        db.commit()

        # Enviar email de confirmação
        send_confirmation_email(user.email, payment.new_plan)

        # Criar fatura
        create_invoice(user_id, payment_id)

    return {"received": True}
```

---

**Última atualização:** 05/12/2025
**Ambiente:** Desenvolvimento
