import { PlanType } from "@/types/plan";

export const PLAN_FEATURES: Record<PlanType, string[]> = {
  [PlanType.BASICO]: [
    'Variability',
    'Indice de Capacidade de Processo',
    'Teste de Hipotese',
    'Análise estatistica na tabela de dados',
    'Analise de Distribuição',
    'COV EMS',
  ],
  [PlanType.INTERMEDIARIO]: [
    'Analise de Texto',
    'Teste de Normalização',
    'Cartas de Controle',
    'Dashboard',
    'Monte Carlo',
  ],
  [PlanType.PRO]: [
    'Regressão Simples',
    'Regressão Multipla',
    'Multivariate',
    'StackUp',
    'DOE',
    'Space Filling',
    'Custos de Garantia',
  ],
  [PlanType.ADMIN]: [
    'Acesso Total à Plataforma',
    'Gerenciamento de Usuários',
    'Configurações do Sistema',
    'Analytics Completo',
    'Logs e Auditoria',
  ],
};

export const PLAN_PRICES: Record<PlanType, number> = {
  [PlanType.BASICO]: 49.90,
  [PlanType.INTERMEDIARIO]: 99.90,
  [PlanType.PRO]: 199.90,
  [PlanType.ADMIN]: 0, // Admin não paga
};
