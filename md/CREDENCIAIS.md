# 🔐 Credenciais de Acesso - Pro Sigma

## Usuários Mockados para Desenvolvimento

### 👨‍💼 Administrador

- **Email:** `admin@prosigma.com`
- **Senha:** `admin123`
- **Plano:** Admin (acesso total)
- **Recursos:** Todas as ferramentas + funcionalidades administrativas

---

### 💎 Usuário Pro

- **Email:** `teste@prosigma.com`
- **Senha:** `teste123`
- **Plano:** Pro (R$ 199,90/mês)
- **Recursos:** Todas as 17 ferramentas de análise Six Sigma

---

### 🥈 Usuário Intermediário

- **Email:** `intermediario@prosigma.com`
- **Senha:** `inter123`
- **Plano:** Intermediário (R$ 99,90/mês)
- **Recursos:** 11 ferramentas (básicas + intermediárias)

---

### 🥉 Usuário Básico

- **Email:** `basico@prosigma.com`
- **Senha:** `basico123`
- **Plano:** Básico (R$ 49,90/mês)
- **Recursos:** 6 ferramentas essenciais

---

## 🚀 Como Usar

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

2. Acesse: `http://localhost:3001`

3. Clique em **"Entrar"** no topo da página

4. Use uma das credenciais acima para fazer login

5. Após o login, você será redirecionado para o **Dashboard**

---

## 📝 Observações Importantes

- ⚠️ **Dados Mockados:** Estas credenciais são apenas para desenvolvimento local
- 🔒 **Segurança:** As senhas estão em texto plano no arquivo `/lib/data/mockUsers.ts`
- 🗑️ **Produção:** Remover o arquivo `mockUsers.ts` antes do deploy em produção
- 🔄 **Backend Real:** Quando a API Python estiver pronta, a autenticação será feita via requisição HTTP

---

## 🛠️ Implementação Técnica

### Arquivo de Usuários Mockados

- **Localização:** `/lib/data/mockUsers.ts`
- **Função:** `findUserByCredentials(email, password)`
- **Retorno:** Objeto `User` sem a senha

### Fluxo de Autenticação

1. NextAuth recebe credenciais do formulário
2. Tenta autenticar com `findUserByCredentials()` (mock)
3. Se não encontrar, tenta API real (quando disponível)
4. Retorna usuário com `id`, `email`, `name`, `plan`, `isAdmin`
5. Dados armazenados no JWT e na sessão

### Tipos TypeScript

- **User:** Interface em `/types/auth.ts`
- **Session:** Módulo augmentation em `/types/next-auth.d.ts`
- **PlanType:** `"basico" | "intermediario" | "pro" | "admin"`

---

## 🎯 Próximos Passos

- [ ] Implementar backend Python com FastAPI
- [ ] Criar endpoint `/api/auth/login` real
- [ ] Adicionar hash de senha com bcrypt
- [ ] Implementar banco de dados (PostgreSQL/MongoDB)
- [ ] Remover usuários mockados
- [ ] Adicionar sistema de registro de novos usuários
- [ ] Implementar recuperação de senha
- [ ] Adicionar verificação de email

---

**Data de criação:** 05/12/2025
**Versão:** 1.0.0 (Desenvolvimento)
