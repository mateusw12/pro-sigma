# API de Upload de Arquivos

## Rota: `/api/files/upload`

Esta rota do Next.js processa o upload de arquivos e encaminha para o backend junto com as informações do usuário autenticado.

## Autenticação

- **Requerida**: Sim
- **Método**: NextAuth session
- O usuário deve estar autenticado via NextAuth

## Método HTTP

`POST`

## Request

### Headers

Não é necessário definir `Content-Type`, será definido automaticamente como `multipart/form-data` com boundary.

### Body (FormData)

- `file`: Arquivo a ser enviado (CSV ou Excel)

### Exemplo de uso no frontend:

```typescript
const formData = new FormData();
formData.append('file', file);

const response = await fetch('/api/files/upload', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
```

## Response

### Sucesso (200)

```json
{
  "success": true,
  "id": "abc123",
  "columns": ["coluna1", "coluna2", "coluna3"],
  "preview": [
    { "coluna1": "valor1", "coluna2": "valor2", "coluna3": "valor3" },
    { "coluna1": "valor4", "coluna2": "valor5", "coluna3": "valor6" }
  ],
  "rowCount": 100,
  "fileName": "dados.csv",
  "fileSize": 1024,
  "uploadedBy": "user@example.com",
  "uploadedAt": "2025-12-08T10:30:00.000Z"
}
```

### Erros

#### 401 - Não Autenticado

```json
{
  "error": "Não autenticado"
}
```

#### 400 - Nenhum arquivo fornecido

```json
{
  "error": "Nenhum arquivo fornecido"
}
```

#### 400 - Tipo de arquivo não suportado

```json
{
  "error": "Tipo de arquivo não suportado. Use CSV ou Excel."
}
```

#### 500 - Erro interno

```json
{
  "error": "Erro interno no servidor",
  "message": "Detalhes do erro"
}
```

## Validações

### Tipos de arquivo aceitos:

- `text/csv` (.csv)
- `application/vnd.ms-excel` (.xls)
- `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (.xlsx)

## Dados enviados ao Backend

A rota encaminha os seguintes dados para o backend em `http://localhost:8000/api/files/upload`:

### FormData enviado:

- `file`: O arquivo original
- `userId`: Email do usuário (string)
- `userName`: Nome do usuário (string)
- `userPlan`: Plano do usuário (basico | intermediario | pro | admin)
- `userRole`: Role numérico do usuário (0-4) - opcional

## Fluxo de Dados

```
Frontend (workspace/page.tsx)
    ↓ FormData com file
Next.js API Route (/api/files/upload)
    ↓ Valida autenticação
    ↓ Valida tipo de arquivo
    ↓ Adiciona dados do usuário
    ↓ FormData com file + user info
Backend Python (http://localhost:8000/api/files/upload)
    ↓ Processa arquivo
    ↓ Retorna colunas e preview
Next.js API Route
    ↓ Formata resposta
Frontend
    ↓ Exibe preview
```

## Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Segurança

- ✅ Autenticação via NextAuth
- ✅ Validação de tipo de arquivo
- ✅ Informações do usuário anexadas automaticamente
- ✅ Logs de erro no console
- ✅ Tratamento de erros do backend

## Limitações

- Tamanho máximo de arquivo: Definido pelo Next.js (padrão 4.5MB para API routes)
- Para aumentar o limite, configurar em `next.config.ts`:

```typescript
export default {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
```

## Próximos Passos

1. Implementar backend Python em `/api/files/upload`
2. Adicionar validação de tamanho de arquivo
3. Implementar limpeza de arquivos temporários
4. Adicionar suporte para outros formatos (JSON, Parquet)
5. Implementar cache de preview para arquivos grandes
