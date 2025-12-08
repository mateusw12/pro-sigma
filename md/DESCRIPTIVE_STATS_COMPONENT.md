# Componente de Resultados de Estatística Descritiva

## DescriptiveStatsResult

Componente React que exibe os resultados de uma análise de estatística descritiva de forma visual e organizada.

## Uso

```tsx
import { DescriptiveStatsResult } from '@/components/analysis';

<DescriptiveStatsResult
  data={analysisData}
  onClose={() => setAnalysisResult(null)}
/>;
```

## Props

| Prop      | Tipo                   | Obrigatório | Descrição                                 |
| --------- | ---------------------- | ----------- | ----------------------------------------- |
| `data`    | `DescriptiveStatsData` | Sim         | Dados da análise estatística              |
| `onClose` | `() => void`           | Não         | Callback para fechar/limpar os resultados |

## Estrutura dos Dados

```typescript
interface DescriptiveStatsData {
  result: {
    [columnName: string]: {
      mean: number; // Média
      std: number; // Desvio padrão
      mode: number; // Moda
      kurtosis: number; // Curtose
      median: number; // Mediana
      quantile25: number; // 1º Quartil (25%)
      quantile50: number; // 2º Quartil (50%)
      quantile75: number; // 3º Quartil (75%)
      quantile100: number; // Máximo (100%)
      variance: number; // Variância
      skew: number; // Assimetria
      count: number; // Contagem
      y: number[]; // Valores da amostra
    };
  };
}
```

## Exemplo de Dados (Mock)

```typescript
const MOCK_STATISTIC_DESCRIPTIVE = {
  result: {
    Y: {
      mean: 14.35,
      std: 1.46,
      mode: 16.2,
      kurtosis: -1.55,
      median: 14.35,
      quantile25: 13.2,
      quantile75: 15.8,
      quantile100: 16.3,
      quantile50: 14.35,
      variance: 2.14,
      skew: -0.027,
      count: 42,
      y: [12.5, 12.4, 12.4, ...],
    },
  },
};
```

## Recursos Visuais

### 1. **Cabeçalho Informativo**

- Título destacado com ícone
- Lista de colunas analisadas em tags
- Botão "Fechar" (se `onClose` fornecido)

### 2. **Estatísticas em Cards (Statistic)**

- Média (verde)
- Mediana (azul)
- Desvio Padrão (vermelho)
- Contagem (roxo)

### 3. **Seção de Quartis (Descriptions)**

- Q1 (25%)
- Q2 (50%)
- Q3 (75%)
- Máximo (100%)

### 4. **Tabela de Métricas**

Exibe todas as métricas com ícones:

- 📊 Média
- 📈 Mediana
- 🎯 Moda
- 📉 Desvio Padrão
- 📐 Variância
- ↗️ Assimetria
- 📊 Curtose
- 🔢 Contagem

### 5. **Valores da Amostra**

- Exibição em tags coloridas
- Área com scroll para grandes conjuntos
- Estilo monoespaçado

## Implementação no Workspace

```tsx
const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
  null,
);

// Após análise bem-sucedida
setAnalysisResult({
  tool: 'descriptive-stats',
  data: responseData,
  timestamp: new Date(),
});

// No JSX
{
  analysisResult && analysisResult.tool === 'descriptive-stats' && (
    <div style={{ marginTop: 32 }}>
      <DescriptiveStatsResult
        data={analysisResult.data}
        onClose={() => setAnalysisResult(null)}
      />
    </div>
  );
}
```

## Componentes Ant Design Utilizados

- `Card` - Container principal
- `Row` / `Col` - Grid responsivo
- `Statistic` - Métricas destacadas
- `Descriptions` - Quartis
- `Table` - Lista de métricas
- `Tag` - Valores e colunas
- `Button` - Botão fechar

## Responsividade

O componente é totalmente responsivo:

- `xs={12}` - Mobile (2 colunas)
- `sm={8}` - Tablet (3 colunas)
- `md={6}` - Desktop (4 colunas)

## Estilização

- Cores seguem paleta do Ant Design
- Fundo azul claro (#e6f7ff) para destaque
- Tags coloridas para categorização visual
- Scroll automático para listas longas

## Próximos Passos

1. Adicionar gráficos (histograma, boxplot)
2. Exportar resultados para PDF/Excel
3. Comparar múltiplas colunas lado a lado
4. Adicionar testes estatísticos
5. Salvar histórico de análises
