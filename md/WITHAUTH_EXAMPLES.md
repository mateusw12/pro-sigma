// EXEMPLOS DE USO DO withAuth HOC

// ==========================================
// 1. Página que requer apenas autenticação básica (qualquer usuário logado)
// ==========================================
import { withAuth } from '@/components/auth';
import { UserRole } from '@/types';

function DashboardPage() {
return <div>Dashboard - Qualquer usuário autenticado</div>;
}

export default withAuth(DashboardPage);
// ou
export default withAuth(DashboardPage, { requiredRole: UserRole.BASICO });

// ==========================================
// 2. Página que requer plano PRO ou superior
// ==========================================
function AdvancedToolPage() {
return <div>Ferramenta Avançada - Apenas PRO</div>;
}

export default withAuth(AdvancedToolPage, {
requiredRole: UserRole.PRO
});

// ==========================================
// 3. Página apenas para administradores
// ==========================================
import { withAdminAuth } from '@/components/auth';

function AdminPanelPage() {
return <div>Painel Admin</div>;
}

export default withAdminAuth(AdminPanelPage);

// ou usando withAuth
export default withAuth(AdminPanelPage, { adminOnly: true });

// ==========================================
// 4. Página sem redirecionamento automático
// ==========================================
import { withOptionalAuth } from '@/components/auth';

function PublicPage() {
const { isAuthenticated } = useAuth();

return (
<div>
{isAuthenticated
? 'Conteúdo para usuários autenticados'
: 'Conteúdo público'}
</div>
);
}

export default withOptionalAuth(PublicPage);

// ==========================================
// 5. Com callback customizado
// ==========================================
function PremiumPage() {
return <div>Conteúdo Premium</div>;
}

export default withAuth(PremiumPage, {
requiredRole: UserRole.INTERMEDIARIO,
onAccessDenied: () => {
console.log('Usuário tentou acessar sem permissão');
// analytics, logging, etc
}
});

// ==========================================
// 6. Usando o hook useAuth para verificações condicionais
// ==========================================
import { useAuth } from '@/hooks';
import { UserRole } from '@/types';

function MyComponent() {
const { user, role, hasRole, isAdmin } = useAuth();

if (hasRole(UserRole.PRO)) {
return <div>Conteúdo PRO</div>;
}

if (hasRole(UserRole.INTERMEDIARIO)) {
return <div>Conteúdo Intermediário</div>;
}

return <div>Conteúdo Básico</div>;
}

// ==========================================
// 7. Hierarquia de Roles
// ==========================================
// GUEST = 0 -> Não autenticado
// BASICO = 1 -> Plano básico
// INTERMEDIARIO = 2 -> Plano intermediário (tem acesso a BASICO também)
// PRO = 3 -> Plano pro (tem acesso a BASICO e INTERMEDIARIO)
// ADMIN = 4 -> Admin (tem acesso a tudo)

// ==========================================
// 8. Exemplo de página de planos refatorada
// ==========================================
'use client';

import { withAuth } from '@/components/auth';
import { useAuth } from '@/hooks';
import { UserRole } from '@/types';
import { DashboardLayout } from '@/components/layout';

function PlansPage() {
const { user, plan, isAdmin } = useAuth();

return (
<DashboardLayout>
<div>
<h1>Gerenciar Plano</h1>
{isAdmin ? (
<p>Você é administrador</p>
) : (
<p>Seu plano atual: {plan}</p>
)}
</div>
</DashboardLayout>
);
}

// Apenas usuários autenticados (BASICO ou superior)
export default withAuth(PlansPage);
