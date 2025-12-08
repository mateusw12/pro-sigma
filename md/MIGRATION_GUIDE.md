/\*\*

- GUIA DE MIGRAÇÃO: ProtectedRoute -> withAuth
-
- Este arquivo mostra como migrar páginas que usam <ProtectedRoute>
- para o novo sistema com HOC withAuth
  \*/

// ============================================
// ANTES (usando ProtectedRoute)
// ============================================

'use client';

import { ProtectedRoute } from '@/components/auth';
import { DashboardLayout } from '@/components/layout';

function DashboardPage() {
return (
<ProtectedRoute>
<DashboardLayout>
<div>Conteúdo do Dashboard</div>
</DashboardLayout>
</ProtectedRoute>
);
}

export default DashboardPage;

// ============================================
// DEPOIS (usando withAuth)
// ============================================

'use client';

import { withAuth } from '@/components/auth';
import { DashboardLayout } from '@/components/layout';

function DashboardPage() {
return (
<DashboardLayout>
<div>Conteúdo do Dashboard</div>
</DashboardLayout>
);
}

export default withAuth(DashboardPage);

// ============================================
// VANTAGENS DO NOVO SISTEMA
// ============================================

/\*\*

- 1.  Menos código - sem wrapper <ProtectedRoute>
- 2.  Mais limpo - proteção declarada no export
- 3.  Controle granular - baseado em roles/planos
- 4.  Mensagens específicas - mostra qual plano é necessário
- 5.  Reutilizável - diferentes níveis de acesso
      \*/

// ============================================
// EXEMPLOS PRÁTICOS POR TIPO DE PÁGINA
// ============================================

// Dashboard - Qualquer usuário autenticado
export default withAuth(DashboardPage);

// Ferramentas Básicas - Plano Básico ou superior
export default withAuth(BasicToolPage);

// Ferramentas Intermediárias - Plano Intermediário ou superior
import { UserRole } from '@/types';
export default withAuth(IntermediateToolPage, {
requiredRole: UserRole.INTERMEDIARIO
});

// Ferramentas Avançadas - Apenas Plano PRO
export default withAuth(ProToolPage, {
requiredRole: UserRole.PRO
});

// Painel Admin - Apenas administradores
import { withAdminAuth } from '@/components/auth';
export default withAdminAuth(AdminPage);

// ============================================
// VERIFICAÇÕES CONDICIONAIS DENTRO DO COMPONENTE
// ============================================

'use client';

import { withAuth } from '@/components/auth';
import { useAuth } from '@/hooks';
import { UserRole } from '@/types';

function ToolPage() {
const { hasRole, isAdmin, plan } = useAuth();

return (
<div>
{/_ Conteúdo para todos _/}
<h1>Ferramenta Estatística</h1>

      {/* Conteúdo apenas para PRO ou ADMIN */}
      {hasRole(UserRole.PRO) && (
        <div>Recursos Avançados PRO</div>
      )}

      {/* Conteúdo apenas para ADMIN */}
      {isAdmin && (
        <div>Painel de Administração</div>
      )}

      {/* Mensagem para upgrade */}
      {!hasRole(UserRole.PRO) && (
        <div>Faça upgrade para PRO para acessar recursos avançados</div>
      )}
    </div>

);
}

// Requer pelo menos plano Intermediário
export default withAuth(ToolPage, { requiredRole: UserRole.INTERMEDIARIO });

// ============================================
// LISTA DE PÁGINAS PARA MIGRAR
// ============================================

/\*\*

- Páginas que ainda usam <ProtectedRoute>:
-
- ✅ /app/[locale]/plans/page.tsx - MIGRADO
- ⏳ /app/[locale]/dashboard/page.tsx - MIGRAR
- ⏳ /app/[locale]/workspace/page.tsx - MIGRAR
- ⏳ /app/[locale]/support/page.tsx - MIGRAR
- ⏳ /app/[locale]/tools/\* (todas as ferramentas) - MIGRAR
-
- Sugestão de roles por ferramenta:
- - Descriptive Stats, Process Capability -> BASICO
- - Control Charts, Hypothesis Test, Normalization Test -> INTERMEDIARIO
- - DOE, Monte Carlo, Multivariate, Space Filling -> PRO
- - Text Analysis, Warranty Costs -> PRO
    \*/
