# Estrutura do Projeto Pro Sigma

## 📁 Organização de Pastas

```
pro-sigma/
├── app/                              # App Router do Next.js 16
│   ├── api/                          # API Routes
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # Configuração NextAuth
│   │
│   ├── auth/                         # Páginas de autenticação
│   │   ├── signin/
│   │   │   └── page.tsx              # Página de login
│   │   └── signup/
│   │       └── page.tsx              # Página de cadastro
│   │
│   ├── dashboard/
│   │   └── page.tsx                  # Dashboard principal
│   │
│   ├── tools/                        # Ferramentas de análise
│   │   ├── variability/              # Análise de Variabilidade
│   │   ├── control-charts/           # Cartas de Controle
│   │   ├── process-capability/       # Capacidade de Processo (Cp, Cpk)
│   │   ├── hypothesis-test/          # Teste de Hipótese
│   │   ├── distribution-test/        # Teste de Distribuição
│   │   ├── normalization-test/       # Teste de Normalização
│   │   ├── descriptive-stats/        # Estatística Descritiva
│   │   ├── text-analysis/            # Análise de Texto
│   │   ├── monte-carlo/              # Simulação Monte Carlo
│   │   ├── multivariate/             # Análise Multivariada
│   │   ├── cov-ems/                  # COV EMS
│   │   ├── space-filling/            # Space Filling Design
│   │   ├── simple-regression/        # Regressão Simples
│   │   ├── multiple-regression/      # Regressão Múltipla
│   │   ├── doe/                      # Design of Experiments
│   │   ├── stackup/                  # Análise StackUp
│   │   └── warranty-costs/           # Custos de Garantia
│   │
│   ├── support/
│   │   └── page.tsx                  # Página de suporte
│   │
│   ├── globals.css                   # Estilos globais
│   ├── layout.tsx                    # Layout raiz com providers
│   └── page.tsx                      # Página inicial (landing page)
│
├── components/                       # Componentes React reutilizáveis
│   ├── DashboardLayout.tsx           # Layout do dashboard com menu lateral
│   ├── ProtectedRoute.tsx            # HOC para rotas protegidas
│   └── Providers.tsx                 # SessionProvider do NextAuth
│
├── lib/                              # Utilitários e configurações
│   ├── api/
│   │   └── axios.ts                  # Instância configurada do Axios
│   ├── constants/
│   │   └── plans.ts                  # Constantes dos planos e features
│   ├── types/
│   │   └── index.ts                  # Tipos TypeScript globais
│   └── registry.tsx                  # Registry para styled-components
│
├── public/                           # Arquivos estáticos
│
├── .babelrc                          # Configuração Babel para styled-components
├── .env.local                        # Variáveis de ambiente (não commitar)
├── next.config.ts                    # Configuração do Next.js
├── tsconfig.json                     # Configuração TypeScript
└── package.json                      # Dependências do projeto
```

## 🎯 Descrição dos Principais Arquivos

### Autenticação

- `app/api/auth/[...nextauth]/route.ts` - Configuração do NextAuth com credentials provider
- `app/auth/signin/page.tsx` - Formulário de login
- `app/auth/signup/page.tsx` - Formulário de cadastro com seleção de plano

### Layouts e Componentes

- `components/DashboardLayout.tsx` - Layout padrão do dashboard com:
  - Header com logo e informações do usuário
  - Menu lateral com todas as ferramentas
  - Área de conteúdo principal

- `components/ProtectedRoute.tsx` - Componente que protege rotas e redireciona usuários não autenticados

- `components/Providers.tsx` - Wrapper com SessionProvider do NextAuth

### Ferramentas (Tools)

Cada ferramenta tem sua própria página em `app/tools/[nome-ferramenta]/page.tsx`:

#### Plano Básico

1. **Variability** - Análise de variabilidade de dados
2. **Process Capability** - Cálculo de Cp, Cpk, Pp, Ppk
3. **Hypothesis Test** - Testes T, Z, ANOVA, Qui-quadrado
4. **Distribution Test** - Ajuste de distribuições (Normal, Weibull, etc)
5. **COV EMS** - Análise de coeficiente de variação

#### Plano Intermediário

6. **Text Analysis** - Análise textual e frequência de palavras
7. **Normalization Test** - Testes de normalidade (Shapiro-Wilk, KS, etc)
8. **Control Charts** - Cartas X-bar, R, S, P, NP, C, U
9. **Dashboard** - Visualização de métricas
10. **Monte Carlo** - Simulações Monte Carlo

#### Plano Pro

11. **Simple Regression** - Regressão linear simples
12. **Multiple Regression** - Regressão linear múltipla
13. **Multivariate** - PCA, Análise Fatorial, Cluster
14. **StackUp** - Análise de tolerâncias
15. **DOE** - Design of Experiments (Fatorial, RSM, Taguchi)
16. **Space Filling** - Latin Hypercube, Sobol, Halton
17. **Warranty Costs** - Análise de custos de garantia

### Bibliotecas e Configurações

- `lib/api/axios.ts` - Cliente HTTP configurado para comunicação com backend Python
- `lib/constants/plans.ts` - Define features por plano e preços
- `lib/types/index.ts` - Interfaces TypeScript
- `lib/registry.tsx` - Registry para SSR com styled-components

## 🔄 Fluxo de Autenticação

1. Usuário acessa página protegida
2. `ProtectedRoute` verifica sessão
3. Se não autenticado → redireciona para `/auth/signin`
4. Após login → NextAuth cria sessão JWT
5. Token armazenado e enviado em requisições para API Python

## 🎨 Padrão de Estilização

- Todos os componentes usam **Styled Components**
- Componentes UI do **Ant Design**
- Sem uso de Tailwind CSS
- Gráficos com **Chart.js + react-chartjs-2**

## 🔌 Integração com Backend Python

```typescript
// lib/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Exemplo de uso em uma ferramenta
const response = await api.post('/analyze/variability', data);
```

## 📊 Estrutura de Dados

### User

```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  plan: 'basico' | 'intermediario' | 'pro';
  createdAt: Date;
}
```

### Analysis Data

```typescript
interface AnalysisData {
  id: string;
  name: string;
  type: string;
  data: any;
  createdAt: Date;
  userId: string;
}
```

## 🚀 Próximas Implementações

1. **Upload de Arquivos** - CSV, Excel
2. **Exportação de Resultados** - PDF, Excel
3. **Salvamento de Análises** - Banco de dados
4. **Histórico** - Análises anteriores
5. **Compartilhamento** - Links compartilháveis
6. **Templates** - Templates de relatórios
