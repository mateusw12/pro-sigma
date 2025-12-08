# """
# API de Pagamentos - Pro Sigma
# Exemplo de implementação com FastAPI

# Instalar dependências:
# pip install fastapi uvicorn sqlalchemy pydantic stripe mercadopago python-jose[cryptography]
# """

# from fastapi import APIRouter, Depends, HTTPException, Header
# from sqlalchemy.orm import Session
# from typing import Optional, List
# from datetime import datetime, timedelta
# from pydantic import BaseModel, Field
# import stripe
# import hashlib
# import hmac

# # Configurar Stripe (ou outro gateway)
# stripe.api_key = "sk_test_..."  # Substituir pela chave real

# router = APIRouter(prefix="/api/payments", tags=["payments"])

# # ========================
# # MODELOS PYDANTIC
# # ========================

# class CreditCardData(BaseModel):
#     cardNumber: str = Field(..., min_length=16, max_length=16)
#     cardName: str
#     cardExpiry: str = Field(..., regex=r"^\d{2}/\d{2}$")
#     cardCVV: str = Field(..., min_length=3, max_length=4)

# class ChangePlanRequest(BaseModel):
#     newPlan: str = Field(..., regex="^(basico|intermediario|pro)$")
#     paymentMethod: str = Field(..., regex="^(credit_card|pix|boleto)$")
#     paymentData: Optional[CreditCardData] = None

# class ChangePlanResponse(BaseModel):
#     success: bool
#     message: str
#     paymentId: Optional[str] = None
#     pixQRCode: Optional[str] = None
#     boletoUrl: Optional[str] = None
#     transactionId: Optional[str] = None

# class PaymentStatusResponse(BaseModel):
#     id: str
#     status: str
#     amount: float
#     paymentMethod: str
#     createdAt: datetime
#     updatedAt: datetime

# class InvoiceResponse(BaseModel):
#     id: str
#     userId: str
#     plan: str
#     amount: float
#     status: str
#     dueDate: datetime
#     paidAt: Optional[datetime] = None
#     paymentMethod: Optional[str] = None
#     invoiceUrl: Optional[str] = None

# # ========================
# # CONFIGURAÇÕES
# # ========================

# PLAN_PRICES = {
#     "basico": 49.90,
#     "intermediario": 99.90,
#     "pro": 199.90
# }

# # ========================
# # FUNÇÕES AUXILIARES
# # ========================

# def get_current_user(authorization: str = Header(...)):
#     """Extrai e valida o token JWT do usuário"""
#     # Implementar validação do token JWT
#     # Por enquanto, retornando mock
#     return {
#         "id": "user_123",
#         "email": "teste@prosigma.com",
#         "plan": "basico"
#     }

# def create_payment_record(db: Session, user_id: str, amount: float, method: str, gateway_id: str):
#     """Cria registro de pagamento no banco"""
#     # Implementar lógica de inserção no banco
#     return {
#         "id": f"pay_{gateway_id}",
#         "user_id": user_id,
#         "amount": amount,
#         "method": method,
#         "status": "pending",
#         "created_at": datetime.now()
#     }

# def update_user_plan(db: Session, user_id: str, new_plan: str):
#     """Atualiza o plano do usuário no banco"""
#     # Implementar lógica de atualização
#     pass

# def validate_card_number(card_number: str) -> bool:
#     """Valida número do cartão usando algoritmo de Luhn"""
#     def luhn_checksum(card):
#         def digits_of(n):
#             return [int(d) for d in str(n)]
#         digits = digits_of(card)
#         odd_digits = digits[-1::-2]
#         even_digits = digits[-2::-2]
#         checksum = sum(odd_digits)
#         for d in even_digits:
#             checksum += sum(digits_of(d*2))
#         return checksum % 10
#     return luhn_checksum(card_number) == 0

# # ========================
# # ENDPOINTS
# # ========================

# @router.post("/change-plan", response_model=ChangePlanResponse)
# async def change_plan(
#     request: ChangePlanRequest,
#     current_user: dict = Depends(get_current_user)
# ):
#     """
#     Processa pagamento e altera o plano do usuário
#     """
#     try:
#         # 1. Validar se o novo plano é diferente do atual
#         if request.newPlan == current_user["plan"]:
#             raise HTTPException(
#                 status_code=400,
#                 detail="Você já está neste plano"
#             )

#         # 2. Calcular valor
#         amount = PLAN_PRICES[request.newPlan]

#         # 3. Processar pagamento conforme método
#         if request.paymentMethod == "credit_card":
#             if not request.paymentData:
#                 raise HTTPException(
#                     status_code=400,
#                     detail="Dados do cartão são obrigatórios"
#                 )

#             # Validar número do cartão
#             if not validate_card_number(request.paymentData.cardNumber):
#                 raise HTTPException(
#                     status_code=400,
#                     detail="Número do cartão inválido"
#                 )

#             # Processar com Stripe
#             try:
#                 # Criar token do cartão
#                 token = stripe.Token.create(
#                     card={
#                         "number": request.paymentData.cardNumber,
#                         "exp_month": int(request.paymentData.cardExpiry.split("/")[0]),
#                         "exp_year": int("20" + request.paymentData.cardExpiry.split("/")[1]),
#                         "cvc": request.paymentData.cardCVV,
#                         "name": request.paymentData.cardName,
#                     }
#                 )

#                 # Criar cobrança
#                 charge = stripe.Charge.create(
#                     amount=int(amount * 100),  # Stripe usa centavos
#                     currency="brl",
#                     source=token.id,
#                     description=f"Plano {request.newPlan.capitalize()} - Pro Sigma",
#                     metadata={
#                         "user_id": current_user["id"],
#                         "plan": request.newPlan
#                     }
#                 )

#                 # Salvar no banco
#                 payment_record = create_payment_record(
#                     db=None,  # Passar session do banco
#                     user_id=current_user["id"],
#                     amount=amount,
#                     method="credit_card",
#                     gateway_id=charge.id
#                 )

#                 # Atualizar plano imediatamente
#                 update_user_plan(None, current_user["id"], request.newPlan)

#                 return ChangePlanResponse(
#                     success=True,
#                     message="Plano alterado com sucesso!",
#                     paymentId=payment_record["id"],
#                     transactionId=charge.id
#                 )

#             except stripe.error.CardError as e:
#                 raise HTTPException(
#                     status_code=402,
#                     detail=f"Cartão recusado: {e.user_message}"
#                 )

#         elif request.paymentMethod == "pix":
#             # Gerar QR Code PIX (exemplo com Mercado Pago)
#             # Aqui você integraria com o SDK do Mercado Pago
#             pix_qrcode = f"00020126580014br.gov.bcb.pix...{current_user['id']}"

#             payment_record = create_payment_record(
#                 db=None,
#                 user_id=current_user["id"],
#                 amount=amount,
#                 method="pix",
#                 gateway_id=f"pix_{datetime.now().timestamp()}"
#             )

#             return ChangePlanResponse(
#                 success=True,
#                 message="QR Code PIX gerado. Efetue o pagamento.",
#                 paymentId=payment_record["id"],
#                 pixQRCode=pix_qrcode,
#                 transactionId=payment_record["id"]
#             )

#         elif request.paymentMethod == "boleto":
#             # Gerar boleto (exemplo)
#             boleto_url = f"https://api.prosigma.com/boletos/bol_{datetime.now().timestamp()}.pdf"

#             payment_record = create_payment_record(
#                 db=None,
#                 user_id=current_user["id"],
#                 amount=amount,
#                 method="boleto",
#                 gateway_id=f"bol_{datetime.now().timestamp()}"
#             )

#             return ChangePlanResponse(
#                 success=True,
#                 message="Boleto gerado com sucesso.",
#                 paymentId=payment_record["id"],
#                 boletoUrl=boleto_url,
#                 transactionId=payment_record["id"]
#             )

#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Erro ao processar pagamento: {str(e)}"
#         )


# @router.get("/status/{payment_id}", response_model=PaymentStatusResponse)
# async def get_payment_status(
#     payment_id: str,
#     current_user: dict = Depends(get_current_user)
# ):
#     """
#     Consulta o status de um pagamento
#     """
#     # Buscar no banco de dados
#     # Por enquanto, retornando mock
#     return PaymentStatusResponse(
#         id=payment_id,
#         status="approved",
#         amount=199.90,
#         paymentMethod="credit_card",
#         createdAt=datetime.now() - timedelta(minutes=5),
#         updatedAt=datetime.now()
#     )


# @router.get("/invoices", response_model=List[InvoiceResponse])
# async def list_invoices(
#     status: Optional[str] = None,
#     limit: int = 10,
#     offset: int = 0,
#     current_user: dict = Depends(get_current_user)
# ):
#     """
#     Lista todas as faturas do usuário
#     """
#     # Buscar no banco de dados
#     # Por enquanto, retornando mock
#     return [
#         InvoiceResponse(
#             id="inv_123",
#             userId=current_user["id"],
#             plan="pro",
#             amount=199.90,
#             status="paid",
#             dueDate=datetime.now() + timedelta(days=5),
#             paidAt=datetime.now(),
#             paymentMethod="credit_card",
#             invoiceUrl="https://api.prosigma.com/invoices/inv_123.pdf"
#         )
#     ]


# @router.post("/cancel-subscription")
# async def cancel_subscription(
#     reason: Optional[str] = None,
#     feedback: Optional[str] = None,
#     current_user: dict = Depends(get_current_user)
# ):
#     """
#     Cancela a assinatura do usuário
#     """
#     # Implementar lógica de cancelamento
#     access_until = datetime.now() + timedelta(days=30)

#     return {
#         "success": True,
#         "message": f"Assinatura cancelada. Você terá acesso até {access_until.strftime('%d/%m/%Y')}.",
#         "accessUntil": access_until
#     }


# @router.post("/webhook")
# async def payment_webhook(
#     request: dict,
#     x_webhook_signature: str = Header(None, alias="X-Webhook-Signature")
# ):
#     """
#     Recebe notificações do gateway de pagamento
#     """
#     # Validar assinatura do webhook
#     # webhook_secret = "seu_webhook_secret"
#     # expected_signature = hmac.new(
#     #     webhook_secret.encode(),
#     #     json.dumps(request).encode(),
#     #     hashlib.sha256
#     # ).hexdigest()

#     # if x_webhook_signature != f"sha256={expected_signature}":
#     #     raise HTTPException(401, "Assinatura inválida")

#     # Processar evento
#     event = request.get("event")

#     if event == "payment.approved":
#         # Atualizar status do pagamento
#         # Atualizar plano do usuário
#         pass
#     elif event == "payment.rejected":
#         # Notificar usuário
#         pass

#     return {"received": True}


# # ========================
# # INCLUIR NO MAIN APP
# # ========================

# """
# from fastapi import FastAPI
# from api.routes import payments

# app = FastAPI()
# app.include_router(payments.router)

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
# """
