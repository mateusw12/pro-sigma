# Sistema de Autenticação e Roles - Pro Sigma

## 📋 Visão Geral

Sistema completo de autenticação com controle de acesso baseado em **roles hierárquicos**, substituindo o antigo `<ProtectedRoute>` por soluções mais flexíveis e modernas.

## 🎯 Hierarquia de Roles

```typescript
enum UserRole {
  GUEST = 0, // Não autenticado
  BASICO = 1, // Plano Básico
  INTERMEDIARIO = 2, // Plano Intermediário (herda BASICO)
  PRO = 3, // Plano Pro (herda BASICO + INTERMEDIARIO)
  ADMIN = 4, // Administrador (acesso total)
}
```

### Como funciona a hierarquia?

- Um usuário **PRO** tem acesso a recursos de **INTERMEDIARIO** e **BASICO**
- Um usuário **INTERMEDIARIO** tem acesso a recursos de **BASICO**
- Um usuário **BASICO** só tem acesso a recursos básicos
- Um **ADMIN** tem acesso irrestrito a tudo

---

## 🛠️ Ferramentas Disponíveis

### 1. HOC `withAuth` - Proteção de Páginas Inteiras

Use para proteger páginas completas.

#### Sintaxe Básica

```typescript
import { withAuth } from '@/components/auth';

function MyPage() {
  return <div>Conteúdo protegido</div>;
}

export default withAuth(MyPage);
```

#### Opções Disponíveis

```typescript
interface WithAuthOptions {
  requiredRole?: UserRole; // Role mínimo necessário (padrão: BASICO)
  redirectToSignin?: boolean; // Redireciona para login (padrão: true)
  redirectUrl?: string; // URL de redirecionamento (padrão: '/auth/signin')
  adminOnly?: boolean; // Apenas admin (padrão: false)
  onAccessDenied?: () => void; // Callback quando acesso negado
}
```

#### Exemplos Práticos

```typescript
// Qualquer usuário autenticado
export default withAuth(DashboardPage);

// Requer plano Intermediário ou superior
import { UserRole } from '@/types';
export default withAuth(ToolPage, { requiredRole: UserRole.INTERMEDIARIO });

// Requer plano PRO
export default withAuth(AdvancedToolPage, { requiredRole: UserRole.PRO });

// Apenas administradores
export default withAuth(AdminPage, { adminOnly: true });
// ou
import { withAdminAuth } from '@/components/auth';
export default withAdminAuth(AdminPage);

// Sem redirecionamento (mostra erro na página)
import { withOptionalAuth } from '@/components/auth';
export default withOptionalAuth(PublicPage);

// Com callback customizado
export default withAuth(AnalyticsPage, {
  requiredRole: UserRole.PRO,
  onAccessDenied: () => {
    // Log de analytics, tracking, etc
    console.log('Acesso negado à página de analytics');
  },
});
```

---

### 2. Hook `useAuth` - Informações do Usuário

Use para obter informações do usuário autenticado e verificar permissões.

#### Retorno do Hook

```typescript
interface UseAuthReturn {
  user: Session['user'] | null; // Dados do usuário
  isAuthenticated: boolean; // Se está autenticado
  isLoading: boolean; // Se está carregando
  isAdmin: boolean; // Se é administrador
  plan: string | null; // Plano atual
  role: UserRole; // Role atual
  hasRole: (role: UserRole) => boolean; // Verifica se tem role
}
```

#### Exemplos de Uso

```typescript
import { useAuth } from '@/hooks';
import { UserRole } from '@/types';

function MyComponent() {
  const { user, isAuthenticated, isAdmin, hasRole, role, plan } = useAuth();

  // Verificar se está autenticado
  if (!isAuthenticated) {
    return <div>Faça login</div>;
  }

  // Verificar se tem role específico
  if (hasRole(UserRole.PRO)) {
    return <div>Conteúdo PRO</div>;
  }

  // Verificar se é admin
  if (isAdmin) {
    return <div>Painel Admin</div>;
  }

  // Mostrar informações do usuário
  return (
    <div>
      <p>Nome: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Plano: {plan}</p>
    </div>
  );
}
```

---

### 3. Componentes Condicionais - Controle Granular

Use para mostrar/esconder partes específicas de uma página.

#### `<RequireRole>` - Mostrar conteúdo por role

```typescript
import { RequireRole } from '@/components/auth';
import { UserRole } from '@/types';

function ToolPage() {
  return (
    <div>
      {/* Conteúdo para todos */}
      <h1>Ferramenta Estatística</h1>

      {/* Recurso apenas para PRO */}
      <RequireRole requiredRole={UserRole.PRO}>
        <AdvancedFeature />
      </RequireRole>

      {/* Com alerta de upgrade */}
      <RequireRole
        requiredRole={UserRole.PRO}
        fallbackType="alert"
      >
        <PremiumChart />
      </RequireRole>

      {/* Com card bonito de upgrade */}
      <RequireRole
        requiredRole={UserRole.PRO}
        fallbackType="upgrade-card"
        fallbackMessage="Análises avançadas disponíveis apenas no plano PRO"
      >
        <AdvancedAnalysis />
      </RequireRole>

      {/* Ocultar completamente */}
      <RequireRole
        requiredRole={UserRole.ADMIN}
        fallbackType="hidden"
      >
        <AdminButton />
      </RequireRole>
    </div>
  );
}
```

#### `<ShowForRole>` - Mostrar apenas para role específico

```typescript
import { ShowForRole } from '@/components/auth';
import { UserRole } from '@/types';

<ShowForRole role={UserRole.PRO}>
  <ProFeature />
</ShowForRole>

<ShowForRole role={UserRole.ADMIN}>
  <AdminPanel />
</ShowForRole>
```

#### `<HideForRole>` - Esconder para role específico

```typescript
import { HideForRole } from '@/components/auth';
import { UserRole } from '@/types';

// Esconde mensagem de upgrade para quem já é PRO
<HideForRole role={UserRole.PRO}>
  <UpgradeMessage />
</HideForRole>
```

#### `<AdminOnly>` - Apenas para administradores

```typescript
import { AdminOnly } from '@/components/auth';

<AdminOnly>
  <AdminControls />
</AdminOnly>

<AdminOnly fallback={<div>Acesso restrito</div>}>
  <SensitiveData />
</AdminOnly>
```

---

### 4. Funções Utilitárias

```typescript
import { hasPermission, getRoleFromPlan, isAdmin, getRoleName } from '@/types';

// Verificar permissão
const canAccess = hasPermission(UserRole.INTERMEDIARIO, UserRole.BASICO); // true

// Obter role a partir do plano
const role = getRoleFromPlan('pro'); // UserRole.PRO

// Verificar se é admin
const admin = isAdmin(UserRole.ADMIN); // true

// Obter nome legível do role
const name = getRoleName(UserRole.PRO); // "Profissional"
```

---

## 🔄 Migração do Sistema Antigo

### Antes (com `<ProtectedRoute>`)

```typescript
'use client';

import { ProtectedRoute } from '@/components/auth';
import { DashboardLayout } from '@/components/layout';

function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>Conteúdo</div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default DashboardPage;
```

### Depois (com `withAuth`)

```typescript
'use client';

import { withAuth } from '@/components/auth';
import { DashboardLayout } from '@/components/layout';

function DashboardPage() {
  return (
    <DashboardLayout>
      <div>Conteúdo</div>
    </DashboardLayout>
  );
}

export default withAuth(DashboardPage);
```

**Vantagens:**

- ✅ Menos código (remove wrapper)
- ✅ Mais limpo e declarativo
- ✅ Controle granular por role
- ✅ Mensagens específicas por plano
- ✅ Melhor UX com fallbacks customizados

---

## 📊 Sugestão de Roles por Ferramenta

### Ferramentas Básicas (BASICO)

- Estatísticas Descritivas
- Capacidade do Processo
- Gráficos de Controle Simples

### Ferramentas Intermediárias (INTERMEDIARIO)

- Gráficos de Controle Avançados
- Testes de Hipótese
- Testes de Normalização
- Regressão Simples

### Ferramentas Avançadas (PRO)

- DOE (Design of Experiments)
- Monte Carlo
- Análise Multivariada
- Space Filling
- Regressão Múltipla
- Análise de Texto
- Custos de Garantia

### Admin (ADMIN)

- Gerenciamento de Usuários
- Configurações do Sistema
- Analytics Completo
- Logs e Auditoria

---

## 💡 Casos de Uso Comuns

### 1. Dashboard com recursos condicionais

```typescript
import { withAuth } from '@/components/auth';
import { RequireRole, ShowForRole } from '@/components/auth';
import { useAuth } from '@/hooks';
import { UserRole } from '@/types';

function Dashboard() {
  const { user, plan } = useAuth();

  return (
    <div>
      <h1>Bem-vindo, {user?.name}!</h1>
      <p>Seu plano: {plan}</p>

      {/* Widgets básicos - todos veem */}
      <BasicWidgets />

      {/* Widgets intermediários */}
      <RequireRole requiredRole={UserRole.INTERMEDIARIO}>
        <IntermediateWidgets />
      </RequireRole>

      {/* Widgets PRO */}
      <RequireRole
        requiredRole={UserRole.PRO}
        fallbackType="upgrade-card"
      >
        <ProWidgets />
      </RequireRole>

      {/* Painel admin */}
      <ShowForRole role={UserRole.ADMIN}>
        <AdminPanel />
      </ShowForRole>
    </div>
  );
}

export default withAuth(Dashboard);
```

### 2. Ferramenta com recursos escalonados

```typescript
import { withAuth } from '@/components/auth';
import { RequireRole } from '@/components/auth';
import { UserRole } from '@/types';

function StatisticalTool() {
  return (
    <div>
      <h1>Análise Estatística</h1>

      {/* Recursos básicos */}
      <BasicAnalysis />

      {/* Exportar PDF - apenas Intermediário+ */}
      <RequireRole
        requiredRole={UserRole.INTERMEDIARIO}
        fallbackType="alert"
        fallbackMessage="Exportação em PDF disponível no plano Intermediário"
      >
        <ExportPDFButton />
      </RequireRole>

      {/* Análise avançada - apenas PRO */}
      <RequireRole
        requiredRole={UserRole.PRO}
        fallbackType="upgrade-card"
      >
        <AdvancedAnalysis />
      </RequireRole>
    </div>
  );
}

export default withAuth(StatisticalTool, { requiredRole: UserRole.BASICO });
```

### 3. Página pública com recursos para autenticados

```typescript
import { withOptionalAuth } from '@/components/auth';
import { useAuth } from '@/hooks';
import { ShowForRole } from '@/components/auth';
import { UserRole } from '@/types';

function LandingPage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      <h1>Bem-vindo ao Pro Sigma</h1>

      {isAuthenticated ? (
        <p>Olá, {user?.name}!</p>
      ) : (
        <p>Faça login para começar</p>
      )}

      {/* Conteúdo público */}
      <PublicContent />

      {/* Extras para usuários autenticados */}
      <ShowForRole role={UserRole.BASICO}>
        <UserDashboardLink />
      </ShowForRole>
    </div>
  );
}

export default withOptionalAuth(LandingPage);
```

---

## 📝 Checklist de Migração

- [x] ✅ Criar enum `UserRole` com hierarquia
- [x] ✅ Criar HOC `withAuth`
- [x] ✅ Atualizar hook `useAuth` com suporte a roles
- [x] ✅ Criar componentes condicionais (`RequireRole`, etc)
- [x] ✅ Migrar página `/plans`
- [ ] ⏳ Migrar página `/dashboard`
- [ ] ⏳ Migrar página `/workspace`
- [ ] ⏳ Migrar página `/support`
- [ ] ⏳ Migrar todas as ferramentas em `/tools`
- [ ] ⏳ Documentar roles de cada ferramenta
- [ ] ⏳ Remover `<ProtectedRoute>` (quando não for mais usado)

---

## 🔗 Arquivos Criados

- `types/roles.ts` - Enum e utilitários de roles
- `components/auth/withAuth.tsx` - HOC principal
- `components/auth/RequireRole.tsx` - Componentes condicionais
- `hooks/useAuth.ts` - Hook atualizado
- `WITHAUTH_EXAMPLES.md` - Exemplos práticos
- `MIGRATION_GUIDE.md` - Guia de migração
- `AUTH_SYSTEM.md` - Esta documentação

---

## 🎓 Resumo Rápido

| Uso                          | Ferramenta      | Exemplo                               |
| ---------------------------- | --------------- | ------------------------------------- |
| Proteger página inteira      | `withAuth`      | `export default withAuth(Page)`       |
| Apenas admin                 | `withAdminAuth` | `export default withAdminAuth(Page)`  |
| Obter dados do usuário       | `useAuth()`     | `const { user, isAdmin } = useAuth()` |
| Verificar permissão          | `hasRole()`     | `hasRole(UserRole.PRO)`               |
| Mostrar conteúdo condicional | `<RequireRole>` | `<RequireRole role={UserRole.PRO}>`   |
| Esconder para role           | `<HideForRole>` | `<HideForRole role={UserRole.PRO}>`   |
| Apenas admin                 | `<AdminOnly>`   | `<AdminOnly>...</AdminOnly>`          |
