# Uso dos Enums PlanType e UserRole

## 📦 Enums Criados

### PlanType
```typescript
enum PlanType {
  BASICO = 'basico',
  INTERMEDIARIO = 'intermediario',
  PRO = 'pro',
  ADMIN = 'admin',
}
```

### UserRole
```typescript
enum UserRole {
  GUEST = 0,
  BASICO = 1,
  INTERMEDIARIO = 2,
  PRO = 3,
  ADMIN = 4,
}
```

## 🔄 Alterações Realizadas

1. **`types/roles.ts`** - Adicionado enum `PlanType`
2. **`lib/data/mockUsers.ts`** - Adicionado campo `role` aos usuários mockados
3. **`lib/constants/plans.ts`** - Migrado para usar enum `PlanType`
4. **`app/[locale]/plans/page.tsx`** - Migrado para usar enum `PlanType`
5. **`types/index.ts`** - Exportando novos tipos e funções

## 💡 Exemplos de Uso

### 1. Usando PlanType no código

```typescript
import { PlanType } from '@/types';

// ✅ Correto - usando enum
const userPlan = PlanType.PRO;

// ✅ Também funciona - comparação
if (user.plan === PlanType.BASICO) {
  // ...
}

// ✅ Array de planos
const plans = [PlanType.BASICO, PlanType.INTERMEDIARIO, PlanType.PRO];

// ❌ Evitar - string literal (ainda funciona por compatibilidade)
const oldWay = 'pro'; // type: string
```

### 2. Usando UserRole

```typescript
import { UserRole, hasPermission } from '@/types';

// Verificar permissão
if (hasPermission(userRole, UserRole.PRO)) {
  // Usuário tem permissão PRO ou superior
}

// Comparação direta
if (role === UserRole.ADMIN) {
  // É admin
}

// Verificação de hierarquia
if (role >= UserRole.INTERMEDIARIO) {
  // É intermediário, PRO ou ADMIN
}
```

### 3. No Hook useAuth

```typescript
import { useAuth } from '@/hooks';
import { UserRole, PlanType } from '@/types';

function MyComponent() {
  const { role, plan, hasRole } = useAuth();

  // Verificar role
  if (hasRole(UserRole.PRO)) {
    return <ProFeature />;
  }

  // Verificar plano
  if (plan === PlanType.BASICO) {
    return <BasicFeature />;
  }
}
```

### 4. No HOC withAuth

```typescript
import { withAuth } from '@/components/auth';
import { UserRole } from '@/types';

function ProToolPage() {
  return <div>Ferramenta PRO</div>;
}

// Requer role PRO
export default withAuth(ProToolPage, {
  requiredRole: UserRole.PRO
});
```

### 5. Com RequireRole

```typescript
import { RequireRole } from '@/components/auth';
import { UserRole } from '@/types';

<RequireRole requiredRole={UserRole.PRO}>
  <AdvancedFeature />
</RequireRole>
```

### 6. Nos Mock Users

```typescript
import { PlanType, UserRole } from '@/types/roles';

export const mockUsers = [
  {
    id: '1',
    email: 'admin@prosigma.com',
    plan: PlanType.ADMIN,      // ✅ Usando enum
    role: UserRole.ADMIN,       // ✅ Role explícito
    isAdmin: true,
  },
  {
    id: '2',
    email: 'pro@prosigma.com',
    plan: PlanType.PRO,         // ✅ Usando enum
    role: UserRole.PRO,         // ✅ Role explícito
    isAdmin: false,
  },
];
```

### 7. Nas constantes de planos

```typescript
import { PlanType } from '@/types';

export const PLAN_FEATURES: Record<PlanType, string[]> = {
  [PlanType.BASICO]: [...],
  [PlanType.INTERMEDIARIO]: [...],
  [PlanType.PRO]: [...],
  [PlanType.ADMIN]: [...],
};

export const PLAN_PRICES: Record<PlanType, number> = {
  [PlanType.BASICO]: 49.90,
  [PlanType.INTERMEDIARIO]: 99.90,
  [PlanType.PRO]: 199.90,
  [PlanType.ADMIN]: 0,
};
```

## 🎯 Vantagens dos Enums

### Type Safety
```typescript
// ✅ TypeScript vai autocomplete e validar
function setPlan(plan: PlanType) {
  // plan só pode ser PlanType.BASICO, INTERMEDIARIO, PRO ou ADMIN
}

// ❌ Erro de compilação
setPlan('invalid'); // Error: Argument of type '"invalid"' is not assignable

// ✅ Correto
setPlan(PlanType.PRO);
```

### Refatoração Segura
```typescript
// Se mudar o valor do enum, todas as referências são atualizadas
enum PlanType {
  PRO = 'premium' // mudou de 'pro' para 'premium'
}
// Todas as comparações com PlanType.PRO continuam funcionando!
```

### Autocomplete no IDE
```typescript
import { PlanType } from '@/types';

// Ao digitar PlanType., o IDE mostra:
// - PlanType.BASICO
// - PlanType.INTERMEDIARIO
// - PlanType.PRO
// - PlanType.ADMIN
```

### Evita Typos
```typescript
// ❌ String literal - possível erro
if (plan === 'intermedirio') { // typo!
  // Código nunca executa
}

// ✅ Enum - erro de compilação
if (plan === PlanType.INTERMEDIRIO) { // Error: Property 'INTERMEDIRIO' does not exist
  // Não compila
}
```

## 📋 Funções Utilitárias Disponíveis

```typescript
import {
  getPlanName,
  getRoleName,
  getRoleFromPlan,
  isValidPlan,
  AVAILABLE_PLANS,
} from '@/types';

// Nome legível do plano
getPlanName(PlanType.PRO); // "Profissional"

// Nome legível do role
getRoleName(UserRole.INTERMEDIARIO); // "Intermediário"

// Obter role a partir do plano
const role = getRoleFromPlan(PlanType.PRO); // UserRole.PRO

// Verificar se é um plano válido
isValidPlan('pro'); // true
isValidPlan('invalid'); // false

// Lista de planos disponíveis (sem admin)
AVAILABLE_PLANS; // [PlanType.BASICO, PlanType.INTERMEDIARIO, PlanType.PRO]
```

## 🔄 Compatibilidade com Código Legado

O sistema mantém compatibilidade com strings literais:

```typescript
// ✅ Ainda funciona (mas não recomendado)
const planString = 'pro';
const role = getRoleFromPlan(planString); // UserRole.PRO

// ✅ Recomendado
const planEnum = PlanType.PRO;
const role = getRoleFromPlan(planEnum); // UserRole.PRO
```

## 🎓 Resumo das Mudanças

| Antes | Depois |
|-------|--------|
| `plan: 'pro'` | `plan: PlanType.PRO` |
| `plans = ['basico', 'intermediario', 'pro']` | `plans = AVAILABLE_PLANS` |
| `if (plan === 'basico')` | `if (plan === PlanType.BASICO)` |
| Role calculado em runtime | Role explícito: `role: UserRole.PRO` |
| Type: `string` | Type: `PlanType` (enum) |

## ✅ Checklist de Migração

- [x] ✅ Criar enum `PlanType`
- [x] ✅ Adicionar `role` aos mock users
- [x] ✅ Atualizar `PLAN_FEATURES` e `PLAN_PRICES`
- [x] ✅ Atualizar página de planos
- [x] ✅ Manter compatibilidade com strings
- [ ] ⏳ Migrar outras páginas para usar enums
- [ ] ⏳ Atualizar tipos da API (auth.ts)
- [ ] ⏳ Atualizar backend para retornar enum values
