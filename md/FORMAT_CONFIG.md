# Configuração de Formatação Automática

## ✅ Configurado com Sucesso!

O projeto agora está configurado para **formatar automaticamente** o código ao salvar arquivos.

---

## 🔧 Configurações Ativas

### **Format on Save** ✅

- ✅ **Formatar ao salvar** - Código é formatado automaticamente
- ✅ **Formatar ao colar** - Código colado é formatado
- ✅ **Organizar imports** - Imports são organizados automaticamente
- ✅ **Remover imports não utilizados** - Imports desnecessários são removidos
- ✅ **Fix ESLint** - Problemas do ESLint são corrigidos automaticamente

### **Prettier Settings**

```json
{
  "semi": true, // Ponto-e-vírgula
  "trailingComma": "all", // Vírgula final
  "singleQuote": true, // Aspas simples
  "printWidth": 80, // Largura máxima de linha
  "tabWidth": 2, // 2 espaços de indentação
  "useTabs": false, // Usar espaços (não tabs)
  "endOfLine": "lf" // Line ending Unix
}
```

---

## 📦 Pacotes Instalados

```bash
npm install -D prettier
npm install -D prettier-plugin-organize-imports
npm install -D prettier-plugin-tailwindcss
```

---

## 🎯 Como Usar

### **Automático (Recomendado)**

Basta salvar o arquivo (`Ctrl+S`) e tudo é formatado automaticamente!

### **Manual - Formatar arquivo atual**

- **Windows/Linux**: `Shift + Alt + F`
- **Mac**: `Shift + Option + F`

### **Manual - Formatar todo o projeto**

```bash
npm run format
```

### **Verificar formatação sem alterar**

```bash
npm run format:check
```

### **Formatar + Fix ESLint**

```bash
npm run format:fix
```

---

## 📁 Arquivos Ignorados

O Prettier **não formata** estes arquivos/pastas (`.prettierignore`):

```
node_modules
.next
yarn.lock
package-lock.json
pnpm-lock.yaml
```

---

## 🔍 Organização de Imports

Os imports são **organizados automaticamente** nesta ordem:

1. **Imports externos** (React, Next.js, bibliotecas)
2. **Imports internos** (seu código)
3. **Imports de tipos** (`import type`)

**Exemplo:**

```typescript
// ✅ DEPOIS da formatação automática
import { useState } from 'react';
import { Button } from 'antd';
import { UserRole } from '@/types';
import { useAuth } from '@/hooks';

// ❌ ANTES (desorganizado)
import { useAuth } from '@/hooks';
import { useState } from 'react';
import { UserRole } from '@/types';
import { Button } from 'antd';
```

---

## 🎨 Formatação por Linguagem

### **TypeScript/TSX** ✅

- Prettier + ESLint
- Organização de imports
- Remoção de imports não utilizados

### **JavaScript/JSX** ✅

- Prettier + ESLint
- Organização de imports

### **JSON/JSONC** ✅

- Prettier

### **Markdown** ✅

- Prettier (sem remover espaços finais)

### **CSS/Styled Components** ✅

- Prettier

---

## 🔌 Extensões Recomendadas

Instale estas extensões no VS Code para melhor experiência:

1. **Prettier - Code formatter** (esbenp.prettier-vscode) ⭐
2. **ESLint** (dbaeumer.vscode-eslint)
3. **vscode-styled-components** (styled-components.vscode-styled-components)
4. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
5. **TypeScript Next** (ms-vscode.vscode-typescript-next)

---

## 🛠️ Configuração Manual (se necessário)

Se a formatação automática não funcionar:

1. **Abra as configurações do VS Code** (`Ctrl + ,`)
2. **Procure por**: `Default Formatter`
3. **Selecione**: `Prettier - Code formatter`
4. **Procure por**: `Format On Save`
5. **Marque** a opção ✅

Ou adicione manualmente em `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit"
  }
}
```

---

## 📊 Scripts NPM Disponíveis

| Script                 | Descrição                          |
| ---------------------- | ---------------------------------- |
| `npm run format`       | Formata todo o projeto             |
| `npm run format:check` | Verifica formatação sem alterar    |
| `npm run format:fix`   | Formata + corrige ESLint           |
| `npm run dev`          | Inicia servidor de desenvolvimento |
| `npm run build`        | Build de produção                  |
| `npm run lint`         | Executa ESLint                     |

---

## ✨ Benefícios

- ✅ **Consistência** - Código sempre formatado do mesmo jeito
- ✅ **Produtividade** - Não perde tempo formatando manualmente
- ✅ **Qualidade** - Menos erros de sintaxe
- ✅ **Colaboração** - Todo o time usa o mesmo padrão
- ✅ **Clean Code** - Código mais limpo e legível
- ✅ **Organização** - Imports sempre organizados

---

## 🔄 Integração com Git

Para garantir que todo código commitado está formatado:

### **Git Hooks (Opcional - Recomendado)**

Instale o Husky para formatar antes de commit:

```bash
npm install -D husky lint-staged
npx husky init
```

Adicione em `package.json`:

```json
{
  "lint-staged": {
    "**/*.{ts,tsx,js,jsx,json,md}": ["prettier --write", "eslint --fix"]
  }
}
```

---

## 📝 Personalização

Para alterar regras do Prettier, edite `.prettierrc.json`:

```json
{
  "semi": true, // false para sem ponto-e-vírgula
  "singleQuote": true, // false para aspas duplas
  "printWidth": 80, // altere para 100 ou 120
  "tabWidth": 2, // altere para 4
  "trailingComma": "all" // "none", "es5", "all"
}
```

---

## ⚠️ Observações

- **Arquivos grandes** podem demorar alguns segundos para formatar
- **Prettier sobrescreve** regras do ESLint sobre formatação
- **Organize imports** remove imports não utilizados automaticamente
- **Markdown** preserva espaços finais (útil para quebras de linha)

---

## 🎓 Boas Práticas

1. ✅ **Salve frequentemente** - Formatação automática ao salvar
2. ✅ **Não formate manualmente** - Deixe o Prettier fazer isso
3. ✅ **Confie no Prettier** - Ele sabe o que faz
4. ✅ **Use scripts NPM** - Para formatar todo o projeto
5. ✅ **Commit código formatado** - Sempre formate antes de commit

---

## 🐛 Troubleshooting

### **Formatação não funciona ao salvar**

1. Verifique se a extensão Prettier está instalada
2. Verifique se é o formatter padrão
3. Recarregue o VS Code (`Ctrl + Shift + P` → `Reload Window`)

### **Imports não são organizados**

1. Verifique se `prettier-plugin-organize-imports` está instalado
2. Verifique se está em `.prettierrc.json`:
   ```json
   {
     "plugins": ["prettier-plugin-organize-imports"]
   }
   ```

### **Conflito entre ESLint e Prettier**

Use `eslint-config-prettier` para desabilitar regras conflitantes:

```bash
npm install -D eslint-config-prettier
```

---

## 📚 Recursos

- [Prettier Docs](https://prettier.io/docs/en/)
- [VS Code Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier Playground](https://prettier.io/playground/)

---

**✅ Tudo configurado e funcionando!** Basta salvar seus arquivos e eles serão formatados automaticamente! 🎉
