# Pro Sigma - Sistema de Análise Six Sigma

Sistema completo de análise de dados para metodologia Six Sigma desenvolvido com Next.js, Ant Design, Styled Components e Chart.js.

## 🚀 Tecnologias

### Frontend
- **Next.js 16** - Framework React com Server Components
- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Styled Components** - CSS-in-JS para estilização
- **Ant Design** - Biblioteca de componentes UI
- **Chart.js** - Biblioteca para gráficos
- **NextAuth.js** - Autenticação

### Backend (API Python)
- O backend será desenvolvido separadamente em Python
- API RESTful para processar análises estatísticas

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
Edite o arquivo `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

4. Acesse: `http://localhost:3000`

## 📊 Ferramentas Disponíveis

### Plano Básico (R$ 49,90/mês)
- ✅ Variability
- ✅ Índice de Capacidade de Processo
- ✅ Teste de Hipótese
- ✅ Análise estatística na tabela de dados
- ✅ Análise de Distribuição
- ✅ COV EMS

### Plano Intermediário (R$ 99,90/mês)
Inclui tudo do Básico, mais:
- ✅ Análise de Texto
- ✅ Teste de Normalização
- ✅ Cartas de Controle
- ✅ Dashboard
- ✅ Monte Carlo

### Plano Pro (R$ 199,90/mês)
Inclui tudo do Intermediário, mais:
- ✅ Regressão Simples
- ✅ Regressão Múltipla
- ✅ Multivariate
- ✅ StackUp
- ✅ DOE (Design of Experiments)
- ✅ Space Filling
- ✅ Custos de Garantia

## 🔐 Autenticação

O sistema utiliza NextAuth.js para autenticação com:
- Login por email e senha
- Sessões JWT
- Rotas protegidas
- Diferentes níveis de acesso baseados no plano

## 📝 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run start    # Inicia servidor de produção
npm run lint     # Verifica erros de lint
```

---

Desenvolvido com ❤️ para profissionais Six Sigma

