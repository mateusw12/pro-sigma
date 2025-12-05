# 💳 API de Pagamentos - Pro Sigma

## Endpoints de Pagamento

### 1. Alterar Plano (com Pagamento)

**Endpoint:** `POST /api/payments/change-plan`

**Descrição:** Processa o pagamento e altera o plano do usuário.

**Headers:**
```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "newPlan": "pro",
  "paymentMethod": "credit_card",
  "paymentData": {
    "cardNumber": "1234567890123456",
    "cardName": "João Silva",
    "cardExpiry": "12/25",
    "cardCVV": "123"
  }
}
```

**Campos:**
- `newPlan` (string, required): `"basico"`, `"intermediario"` ou `"pro"`
- `paymentMethod` (string, required): `"credit_card"`, `"pix"` ou `"boleto"`
- `paymentData` (object, optional): Necessário apenas para `credit_card`
  - `cardNumber` (string): Número do cartão (16 dígitos)
  - `cardName` (string): Nome no cartão
  - `cardExpiry` (string): Validade no formato MM/AA
  - `cardCVV` (string): Código de segurança (3-4 dígitos)

**Response - Sucesso (200):**
```json
{
  "success": true,
  "message": "Plano alterado com sucesso!",
  "paymentId": "pay_abc123",
  "transactionId": "txn_xyz789"
}
```

**Response - PIX (200):**
```json
{
  "success": true,
  "message": "QR Code PIX gerado. Efetue o pagamento.",
  "paymentId": "pay_pix_123",
  "pixQRCode": "00020126580014br.gov.bcb.pix...",
  "transactionId": "txn_pix_456"
}
```

**Response - Boleto (200):**
```json
{
  "success": true,
  "message": "Boleto gerado com sucesso.",
  "paymentId": "pay_bol_123",
  "boletoUrl": "https://api.prosigma.com/boletos/bol_123.pdf",
  "transactionId": "txn_bol_456"
}
```

**Response - Erro (400/402/500):**
```json
{
  "success": false,
  "message": "Cartão recusado. Verifique os dados.",
  "error": "CARD_DECLINED"
}
```

---

### 2. Consultar Status do Pagamento

**Endpoint:** `GET /api/payments/status/{paymentId}`

**Descrição:** Consulta o status de um pagamento.

**Headers:**
```json
{
  "Authorization": "Bearer {token}"
}
```

**Response (200):**
```json
{
  "id": "pay_abc123",
  "status": "approved",
  "amount": 199.90,
  "paymentMethod": "credit_card",
  "createdAt": "2025-12-05T10:30:00Z",
  "updatedAt": "2025-12-05T10:31:00Z"
}
```

**Status possíveis:**
- `pending`: Aguardando pagamento
- `processing`: Processando
- `approved`: Aprovado
- `rejected`: Recusado
- `cancelled`: Cancelado

---

### 3. Listar Faturas do Usuário

**Endpoint:** `GET /api/payments/invoices`

**Descrição:** Lista todas as faturas do usuário autenticado.

**Headers:**
```json
{
  "Authorization": "Bearer {token}"
}
```

**Query Parameters:**
- `status` (optional): Filtrar por status (`paid`, `pending`, `overdue`, `cancelled`)
- `limit` (optional, default: 10): Número de resultados
- `offset` (optional, default: 0): Paginação

**Response (200):**
```json
{
  "invoices": [
    {
      "id": "inv_123",
      "userId": "user_456",
      "plan": "pro",
      "amount": 199.90,
      "status": "paid",
      "dueDate": "2025-12-10T00:00:00Z",
      "paidAt": "2025-12-05T14:30:00Z",
      "paymentMethod": "credit_card",
      "invoiceUrl": "https://api.prosigma.com/invoices/inv_123.pdf"
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

---

### 4. Cancelar Assinatura

**Endpoint:** `POST /api/payments/cancel-subscription`

**Descrição:** Cancela a assinatura atual do usuário.

**Headers:**
```json
{
  "Authorization": "Bearer {token}"
}
```

**Body:**
```json
{
  "reason": "Não estou usando mais o serviço",
  "feedback": "Gostaria de features X, Y, Z"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Assinatura cancelada. Você terá acesso até 10/01/2026.",
  "accessUntil": "2026-01-10T23:59:59Z"
}
```

---

### 5. Webhook de Notificação de Pagamento

**Endpoint:** `POST /api/payments/webhook`

**Descrição:** Recebe notificações do gateway de pagamento (Stripe/Mercado Pago/etc).

**Headers:**
```json
{
  "X-Webhook-Signature": "sha256=abc123...",
  "Content-Type": "application/json"
}
```

**Body (exemplo):**
```json
{
  "event": "payment.approved",
  "paymentId": "pay_abc123",
  "userId": "user_456",
  "amount": 199.90,
  "timestamp": "2025-12-05T10:31:00Z"
}
```

**Response (200):**
```json
{
  "received": true
}
```

---

## 🔒 Segurança

### Validações Necessárias

1. **Autenticação:**
   - Validar JWT token em todas as requisições
   - Verificar se o usuário está ativo

2. **Cartão de Crédito:**
   - Nunca armazenar dados completos do cartão
   - Usar tokenização (Stripe, Mercado Pago, etc)
   - Validar formato com Luhn algorithm
   - Criptografar dados em trânsito (HTTPS)

3. **Rate Limiting:**
   - Máximo 5 tentativas de pagamento por minuto
   - Bloquear após 3 falhas consecutivas

4. **Webhook:**
   - Validar assinatura do webhook
   - Verificar IP de origem
   - Processar de forma idempotente

---

## 🔄 Fluxo de Pagamento

### 1. Cartão de Crédito
```
Cliente → Frontend → Backend → Gateway (Stripe/MP) → Backend → Atualiza BD → Resposta
```

### 2. PIX
```
Cliente → Frontend → Backend → Gera QR Code → Cliente paga → Webhook → Backend → Atualiza BD
```

### 3. Boleto
```
Cliente → Frontend → Backend → Gera Boleto → Cliente paga → Webhook (1-3 dias) → Backend → Atualiza BD
```

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: `payments`
```sql
CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('credit_card', 'pix', 'boleto') NOT NULL,
    status ENUM('pending', 'processing', 'approved', 'rejected', 'cancelled') NOT NULL,
    gateway_payment_id VARCHAR(255),
    gateway_response JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Tabela: `invoices`
```sql
CREATE TABLE invoices (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    payment_id VARCHAR(36),
    plan ENUM('basico', 'intermediario', 'pro') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('paid', 'pending', 'overdue', 'cancelled') NOT NULL,
    due_date DATE NOT NULL,
    paid_at TIMESTAMP NULL,
    payment_method ENUM('credit_card', 'pix', 'boleto'),
    invoice_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (payment_id) REFERENCES payments(id)
);
```

### Tabela: `subscriptions`
```sql
CREATE TABLE subscriptions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    plan ENUM('basico', 'intermediario', 'pro') NOT NULL,
    status ENUM('active', 'cancelled', 'expired', 'suspended') NOT NULL,
    started_at TIMESTAMP NOT NULL,
    cancelled_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    gateway_subscription_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 🚀 Implementação Recomendada (Python/FastAPI)

```python
from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
import stripe  # ou mercadopago

router = APIRouter(prefix="/api/payments", tags=["payments"])

@router.post("/change-plan")
async def change_plan(
    request: ChangePlanRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Processa pagamento e altera plano do usuário
    """
    try:
        # 1. Validar se o novo plano é diferente do atual
        if request.newPlan == current_user.plan:
            raise HTTPException(400, "Você já está neste plano")

        # 2. Calcular valor
        amount = PLAN_PRICES[request.newPlan]

        # 3. Processar pagamento
        if request.paymentMethod == "credit_card":
            payment = process_credit_card(request.paymentData, amount)
        elif request.paymentMethod == "pix":
            payment = generate_pix_qrcode(amount, current_user.id)
        elif request.paymentMethod == "boleto":
            payment = generate_boleto(amount, current_user.id)

        # 4. Salvar no banco
        payment_record = create_payment(
            user_id=current_user.id,
            amount=amount,
            method=request.paymentMethod,
            gateway_id=payment.id
        )

        # 5. Se aprovado imediatamente, atualizar plano
        if payment.status == "approved":
            update_user_plan(current_user.id, request.newPlan)

        return {
            "success": True,
            "message": "Pagamento processado",
            "paymentId": payment_record.id,
            "transactionId": payment.id
        }

    except Exception as e:
        raise HTTPException(500, str(e))
```

---

## 📦 Integrações de Gateway Sugeridas

### Opção 1: Stripe (Internacional)
- Mais robusto e confiável
- Suporte a cartões internacionais
- Webhooks bem documentados
- SDK Python: `pip install stripe`

### Opção 2: Mercado Pago (Brasil)
- PIX nativo
- Boleto bancário
- Taxas competitivas no Brasil
- SDK Python: `pip install mercadopago`

### Opção 3: Asaas (Brasil)
- Foco em assinaturas
- PIX + Boleto + Cartão
- API simples
- SDK Python: `pip install asaas-sdk`

---

## ✅ Checklist de Implementação

- [ ] Configurar gateway de pagamento (Stripe/MP)
- [ ] Criar tabelas no banco de dados
- [ ] Implementar endpoint `/change-plan`
- [ ] Implementar tokenização de cartão
- [ ] Implementar geração de PIX QR Code
- [ ] Implementar geração de boleto
- [ ] Implementar webhook de notificação
- [ ] Adicionar validações de segurança
- [ ] Implementar rate limiting
- [ ] Adicionar logs de auditoria
- [ ] Testar fluxo completo
- [ ] Implementar emails de confirmação
- [ ] Criar dashboard de pagamentos (admin)

---

**Última atualização:** 05/12/2025
**Versão da API:** 1.0.0
