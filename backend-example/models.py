# """
# Modelos SQLAlchemy para o sistema de pagamentos
# """

# from sqlalchemy import Column, String, Numeric, Enum, DateTime, ForeignKey, Text, JSON
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import relationship
# from datetime import datetime
# import enum

# Base = declarative_base()

# # ========================
# # ENUMS
# # ========================

# class PaymentMethodEnum(enum.Enum):
#     CREDIT_CARD = "credit_card"
#     PIX = "pix"
#     BOLETO = "boleto"

# class PaymentStatusEnum(enum.Enum):
#     PENDING = "pending"
#     PROCESSING = "processing"
#     APPROVED = "approved"
#     REJECTED = "rejected"
#     CANCELLED = "cancelled"

# class InvoiceStatusEnum(enum.Enum):
#     PAID = "paid"
#     PENDING = "pending"
#     OVERDUE = "overdue"
#     CANCELLED = "cancelled"

# class SubscriptionStatusEnum(enum.Enum):
#     ACTIVE = "active"
#     CANCELLED = "cancelled"
#     EXPIRED = "expired"
#     SUSPENDED = "suspended"

# class PlanEnum(enum.Enum):
#     BASICO = "basico"
#     INTERMEDIARIO = "intermediario"
#     PRO = "pro"

# # ========================
# # MODELOS
# # ========================

# class User(Base):
#     __tablename__ = "users"

#     id = Column(String(36), primary_key=True)
#     email = Column(String(255), unique=True, nullable=False)
#     password_hash = Column(String(255), nullable=False)
#     name = Column(String(255))
#     plan = Column(Enum(PlanEnum), default=PlanEnum.BASICO)
#     is_admin = Column(String(1), default="0")  # "0" ou "1"
#     created_at = Column(DateTime, default=datetime.utcnow)
#     updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

#     # Relacionamentos
#     payments = relationship("Payment", back_populates="user")
#     invoices = relationship("Invoice", back_populates="user")
#     subscription = relationship("Subscription", back_populates="user", uselist=False)


# class Payment(Base):
#     __tablename__ = "payments"

#     id = Column(String(36), primary_key=True)
#     user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
#     amount = Column(Numeric(10, 2), nullable=False)
#     payment_method = Column(Enum(PaymentMethodEnum), nullable=False)
#     status = Column(Enum(PaymentStatusEnum), nullable=False, default=PaymentStatusEnum.PENDING)
#     gateway_payment_id = Column(String(255))
#     gateway_response = Column(JSON)
#     error_message = Column(Text)
#     created_at = Column(DateTime, default=datetime.utcnow)
#     updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

#     # Relacionamentos
#     user = relationship("User", back_populates="payments")
#     invoice = relationship("Invoice", back_populates="payment", uselist=False)


# class Invoice(Base):
#     __tablename__ = "invoices"

#     id = Column(String(36), primary_key=True)
#     user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
#     payment_id = Column(String(36), ForeignKey("payments.id"))
#     plan = Column(Enum(PlanEnum), nullable=False)
#     amount = Column(Numeric(10, 2), nullable=False)
#     status = Column(Enum(InvoiceStatusEnum), nullable=False, default=InvoiceStatusEnum.PENDING)
#     due_date = Column(DateTime, nullable=False)
#     paid_at = Column(DateTime)
#     payment_method = Column(Enum(PaymentMethodEnum))
#     invoice_url = Column(String(500))
#     description = Column(Text)
#     created_at = Column(DateTime, default=datetime.utcnow)
#     updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

#     # Relacionamentos
#     user = relationship("User", back_populates="invoices")
#     payment = relationship("Payment", back_populates="invoice")


# class Subscription(Base):
#     __tablename__ = "subscriptions"

#     id = Column(String(36), primary_key=True)
#     user_id = Column(String(36), ForeignKey("users.id"), nullable=False, unique=True)
#     plan = Column(Enum(PlanEnum), nullable=False)
#     status = Column(Enum(SubscriptionStatusEnum), nullable=False, default=SubscriptionStatusEnum.ACTIVE)
#     started_at = Column(DateTime, nullable=False, default=datetime.utcnow)
#     cancelled_at = Column(DateTime)
#     expires_at = Column(DateTime)
#     gateway_subscription_id = Column(String(255))
#     cancel_reason = Column(Text)
#     cancel_feedback = Column(Text)
#     created_at = Column(DateTime, default=datetime.utcnow)
#     updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

#     # Relacionamentos
#     user = relationship("User", back_populates="subscription")


# # ========================
# # CRIAR TABELAS
# # ========================

# """
# Para criar as tabelas:

# from sqlalchemy import create_engine
# from models import Base

# engine = create_engine('postgresql://user:password@localhost/prosigma')
# Base.metadata.create_all(engine)
# """
