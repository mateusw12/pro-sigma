# Clean Architecture - Sistema de Roles e Planos

## 📐 Arquitetura Implementada

O arquivo `types/roles.ts` foi refatorado seguindo os princípios de **Clean Architecture**, separando responsabilidades em camadas bem definidas.

```
┌─────────────────────────────────────────────────┐
│         PRESENTATION LAYER (UI)                 │
│         Components, Pages, Hooks                │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│      APPLICATION LAYER (Use Cases)              │
│  getRoleFromPlan, getPlanFromRole, etc.         │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│         DOMAIN LAYER (Business Logic)           │
│  PlanType, UserRole, hasPermission, isAdmin     │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│    INFRASTRUCTURE LAYER (Validators/Helpers)    │
│  isValidPlan, isPlanType, normalizeStringToPlan │
└─────────────────────────────────────────────────┘
```

## 🏗️ Camadas da Arquitetura

### 1. **DOMAIN LAYER** - Entidades e Regras de Negócio

Contém as entidades fundamentais do sistema e as regras de negócio puras.

#### Entidades (Entities)

```typescript
enum PlanType { ... }     // Tipos de planos
enum UserRole { ... }     // Níveis de permissão
```

#### Value Objects

```typescript
ROLE_NAMES; // Nomes legíveis (imutável)
PLAN_NAMES; // Nomes de planos (imutável)
PLAN_ROLE_MAPPING; // Mapeamento plan→role (imutável)
ROLE_PLAN_MAPPING; // Mapeamento role→plan (imutável)
AVAILABLE_PLANS; // Planos disponíveis (imutável)
```

#### Regras de Negócio (Business Rules)

```typescript
hasPermission(); // Hierarquia de permissões
isAdmin(); // Verificação de admin
isGuest(); // Verificação de guest
compareRoles(); // Comparação de roles
```

**Princípios aplicados:**

- ✅ **Independente de frameworks**
- ✅ **Testável** (lógica pura, sem dependências)
- ✅ **Imutabilidade** (Value Objects são `readonly`)
- ✅ **Single Responsibility** (cada função tem uma responsabilidade)

---

### 2. **APPLICATION LAYER** - Use Cases / Services

Orquestra a lógica de negócio para casos de uso específicos.

#### Use Cases Implementados

```typescript
getRoleFromPlan(); // Converter plano → role
getPlanFromRole(); // Converter role → plano
getRoleName(); // Obter nome formatado do role
getPlanName(); // Obter nome formatado do plano
getNextUpgrade(); // Calcular próximo upgrade
canUpgradeTo(); // Validar upgrade
canDowngradeTo(); // Validar downgrade
```

**Princípios aplicados:**

- ✅ **Use Case Driven** (cada função representa um caso de uso)
- ✅ **Dependency Inversion** (depende de abstrações, não implementações)
- ✅ **Interface Segregation** (funções pequenas e específicas)

---

### 3. **INFRASTRUCTURE LAYER** - Validadores e Helpers

Funções de infraestrutura, validação e conversão.

#### Validadores (Public)

```typescript
isValidPlan(); // Valida se string é PlanType
isValidRole(); // Valida se número é UserRole
```

#### Helpers (Private)

```typescript
isPlanType(); // Type guard para PlanType
normalizeStringToPlan(); // Normaliza strings legadas
```

**Princípios aplicados:**

- ✅ **Encapsulamento** (helpers privados)
- ✅ **Type Safety** (type guards)
- ✅ **Backward Compatibility** (suporta strings legadas)

---

## 🎯 Benefícios da Arquitetura

### 1. **Separação de Responsabilidades**

```typescript
// ❌ ANTES - tudo misturado
export function getRoleFromPlan(plan: string) {
  if (!plan) return UserRole.GUEST;
  return PLAN_TO_ROLE[plan] ?? UserRole.GUEST;
}

// ✅ DEPOIS - camadas separadas
// Domain: Regra de negócio
function hasPermission(user, required) { ... }

// Application: Caso de uso
export function getRoleFromPlan(plan) {
  const planType = normalizeStringToPlan(plan); // Infrastructure
  return PLAN_ROLE_MAPPING[planType];           // Domain
}
```

### 2. **Testabilidade**

```typescript
// Fácil de testar - funções puras sem side effects
describe('Business Rules', () => {
  it('should validate permission hierarchy', () => {
    expect(hasPermission(UserRole.PRO, UserRole.BASICO)).toBe(true);
  });
});
```

### 3. **Extensibilidade**

```typescript
// Adicionar novo use case é simples
export function canSwitchTo(
  currentRole: UserRole,
  targetPlan: PlanType,
): boolean {
  return (
    canUpgradeTo(currentRole, targetPlan) ||
    canDowngradeTo(currentRole, targetPlan)
  );
}
```

### 4. **Manutenibilidade**

```typescript
// Value Objects centralizados e imutáveis
const ROLE_NAMES = { ... } as const; // Não pode ser modificado acidentalmente
```

---

## 📚 Novos Use Cases Disponíveis

### `getNextUpgrade()` - Sugerir próximo plano

```typescript
import { getNextUpgrade } from '@/types';

const { role } = useAuth();
const nextPlan = getNextUpgrade(role);

if (nextPlan) {
  console.log(`Faça upgrade para ${getPlanName(nextPlan)}`);
}
```

### `canUpgradeTo()` - Validar upgrade

```typescript
import { canUpgradeTo, PlanType } from '@/types';

const { role } = useAuth();

if (canUpgradeTo(role, PlanType.PRO)) {
  // Mostrar botão de upgrade
}
```

### `canDowngradeTo()` - Validar downgrade

```typescript
import { canDowngradeTo, PlanType } from '@/types';

const { role } = useAuth();

if (canDowngradeTo(role, PlanType.BASICO)) {
  // Mostrar botão de downgrade
}
```

### `getPlanFromRole()` - Obter plano do role

```typescript
import { getPlanFromRole, UserRole } from '@/types';

const plan = getPlanFromRole(UserRole.PRO); // PlanType.PRO
```

### `isGuest()` - Verificar se é visitante

```typescript
import { isGuest } from '@/types';

if (isGuest(role)) {
  // Mostrar tela de login
}
```

### `compareRoles()` - Comparar roles

```typescript
import { compareRoles, UserRole } from '@/types';

const result = compareRoles(UserRole.PRO, UserRole.BASICO);
// result > 0 (PRO é maior que BASICO)
```

### `isValidRole()` - Validar role

```typescript
import { isValidRole } from '@/types';

if (isValidRole(3)) {
  // É um role válido
}
```

---

## 🔄 Compatibilidade com Código Legado

A arquitetura mantém **100% de compatibilidade** com código existente:

```typescript
// ✅ Ainda funciona
import { PLAN_TO_ROLE, ROLE_TO_PLAN } from '@/types';

const role = PLAN_TO_ROLE['pro']; // Funciona, mas deprecated
```

**Migração recomendada:**

```typescript
// ✅ Recomendado - usa use case
import { getRoleFromPlan, PlanType } from '@/types';

const role = getRoleFromPlan(PlanType.PRO);
```

---

## 🧪 Testes Sugeridos

```typescript
// tests/types/roles.test.ts

describe('Domain - Business Rules', () => {
  describe('hasPermission', () => {
    it('should allow higher roles to access lower permissions', () => {
      expect(hasPermission(UserRole.PRO, UserRole.BASICO)).toBe(true);
    });

    it('should deny lower roles from higher permissions', () => {
      expect(hasPermission(UserRole.BASICO, UserRole.PRO)).toBe(false);
    });
  });

  describe('isAdmin', () => {
    it('should identify admin role', () => {
      expect(isAdmin(UserRole.ADMIN)).toBe(true);
      expect(isAdmin(UserRole.PRO)).toBe(false);
    });
  });
});

describe('Application - Use Cases', () => {
  describe('getRoleFromPlan', () => {
    it('should convert plan to role', () => {
      expect(getRoleFromPlan(PlanType.PRO)).toBe(UserRole.PRO);
    });

    it('should return GUEST for invalid plan', () => {
      expect(getRoleFromPlan(null)).toBe(UserRole.GUEST);
    });

    it('should normalize legacy strings', () => {
      expect(getRoleFromPlan('pro')).toBe(UserRole.PRO);
      expect(getRoleFromPlan('profissional')).toBe(UserRole.PRO);
    });
  });

  describe('canUpgradeTo', () => {
    it('should allow upgrade to higher plan', () => {
      expect(canUpgradeTo(UserRole.BASICO, PlanType.PRO)).toBe(true);
    });

    it('should deny upgrade to same or lower plan', () => {
      expect(canUpgradeTo(UserRole.PRO, PlanType.BASICO)).toBe(false);
    });

    it('should deny upgrade to admin', () => {
      expect(canUpgradeTo(UserRole.PRO, PlanType.ADMIN)).toBe(false);
    });
  });
});
```

---

## 📋 Checklist de Qualidade

- [x] ✅ **Separação de camadas** (Domain, Application, Infrastructure)
- [x] ✅ **Imutabilidade** (Value Objects com `as const`)
- [x] ✅ **Type Safety** (Type guards e validadores)
- [x] ✅ **Documentação** (JSDoc em todas as funções públicas)
- [x] ✅ **Single Responsibility** (cada função tem um propósito)
- [x] ✅ **Dependency Inversion** (depende de abstrações)
- [x] ✅ **Backward Compatibility** (código legado continua funcionando)
- [x] ✅ **Extensibilidade** (fácil adicionar novos use cases)
- [x] ✅ **Testabilidade** (funções puras, fácil de testar)

---

## 🎓 Princípios SOLID Aplicados

| Princípio | Como foi aplicado                                                |
| --------- | ---------------------------------------------------------------- |
| **S**RP   | Cada função tem uma única responsabilidade                       |
| **O**CP   | Aberto para extensão (novos use cases), fechado para modificação |
| **L**SP   | Enums garantem substituibilidade                                 |
| **I**SP   | Interfaces segregadas (funções pequenas e específicas)           |
| **D**IP   | Dependências de abstrações (enums) ao invés de implementações    |

---

## 🚀 Próximos Passos

1. **Criar testes unitários** para todas as camadas
2. **Adicionar logging** nos use cases (optional)
3. **Criar DTOs** se necessário para comunicação com backend
4. **Implementar Repository Pattern** para persistência de roles (futuro)
5. **Adicionar eventos de domínio** para mudanças de plano (futuro)
