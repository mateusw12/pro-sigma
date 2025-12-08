export const PLAN_FEATURES = {
  basico: [
    'Variability',
    'Indice de Capacidade de Processo',
    'Teste de Hipotese',
    'Análise estatistica na tabela de dados',
    'Analise de Distribuição',
    'COV EMS',
  ],
  intermediario: [
    'Analise de Texto',
    'Teste de Normalização',
    'Cartas de Controle',
    'Dashboard',
    'Monte Carlo',
  ],
  pro: [
    'Regressão Simples',
    'Regressão Multipla',
    'Multivariate',
    'StackUp',
    'DOE',
    'Space Filling',
    'Custos de Garantia',
  ],
};

export const PLAN_PRICES = {
  basico: 49.90,
  intermediario: 99.90,
  pro: 199.90,
};

export type PlanType = 'basico' | 'intermediario' | 'pro';
