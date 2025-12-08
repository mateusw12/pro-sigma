import { Card } from 'antd';

interface StatisticalInterpretationProps {
  stats: {
    mean: number;
    median: number;
    std: number;
    skew: number;
    kurtosis: number;
  };
}

export const StatisticalInterpretation = ({
  stats,
}: StatisticalInterpretationProps) => {
  const coefficientOfVariation = stats.std / stats.mean;

  return (
    <Card
      type="inner"
      title="🎓 Interpretação dos Resultados"
      size="small"
      style={{
        marginBottom: 16,
        background: '#fff7e6',
        borderColor: '#ffd591',
      }}
    >
      <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
        {/* Tendência Central */}
        <p style={{ margin: '0 0 12px 0' }}>
          <strong>📈 Tendência Central:</strong>
          <br />
          {Math.abs(stats.mean - stats.median) < stats.std * 0.1 ? (
            <span style={{ color: '#52c41a' }}>
              A média e a mediana estão próximas, sugerindo{' '}
              <strong>distribuição simétrica</strong> dos dados.
            </span>
          ) : (
            <span style={{ color: '#faad14' }}>
              Existe diferença entre média e mediana, indicando possível{' '}
              <strong>
                assimetria{' '}
                {stats.mean > stats.median
                  ? '(cauda à direita)'
                  : '(cauda à esquerda)'}
              </strong>
              .
            </span>
          )}
        </p>

        {/* Dispersão */}
        <p style={{ margin: '0 0 12px 0' }}>
          <strong>📊 Dispersão:</strong>
          <br />
          {coefficientOfVariation < 0.2 ? (
            <span style={{ color: '#52c41a' }}>
              Coeficiente de variação baixo (
              {(coefficientOfVariation * 100).toFixed(1)}%), indicando{' '}
              <strong>dados homogêneos</strong>.
            </span>
          ) : coefficientOfVariation < 0.5 ? (
            <span style={{ color: '#1890ff' }}>
              Coeficiente de variação moderado (
              {(coefficientOfVariation * 100).toFixed(1)}%), indicando{' '}
              <strong>dispersão média</strong> dos dados.
            </span>
          ) : (
            <span style={{ color: '#ff4d4f' }}>
              Coeficiente de variação alto (
              {(coefficientOfVariation * 100).toFixed(1)}%), indicando{' '}
              <strong>dados heterogêneos</strong>.
            </span>
          )}
        </p>

        {/* Formato da Distribuição */}
        <p style={{ margin: '0 0 12px 0' }}>
          <strong>🔔 Formato da Distribuição:</strong>
          <br />
          <span>
            • <strong>Assimetria:</strong>{' '}
            {Math.abs(stats.skew) < 0.5 ? (
              <span style={{ color: '#52c41a' }}>
                Aproximadamente simétrica
              </span>
            ) : stats.skew > 0 ? (
              <span style={{ color: '#faad14' }}>
                Assimétrica positiva - maior concentração de dados abaixo da
                média
              </span>
            ) : (
              <span style={{ color: '#faad14' }}>
                Assimétrica negativa - maior concentração de dados acima da
                média
              </span>
            )}
          </span>
          <br />
          <span>
            • <strong>Curtose:</strong>{' '}
            {Math.abs(stats.kurtosis) < 0.5 ? (
              <span style={{ color: '#52c41a' }}>
                Distribuição mesocúrtica (próxima do normal)
              </span>
            ) : stats.kurtosis > 0 ? (
              <span style={{ color: '#1890ff' }}>
                Leptocúrtica - distribuição com pico acentuado
              </span>
            ) : (
              <span style={{ color: '#1890ff' }}>
                Platicúrtica - distribuição achatada
              </span>
            )}
          </span>
        </p>

        {/* Sugestões */}
        <p style={{ margin: 0 }}>
          <strong>💡 Sugestões de Análise:</strong>
          <br />
          {Math.abs(stats.skew) < 0.5 && Math.abs(stats.kurtosis) < 1 ? (
            <span style={{ color: '#52c41a' }}>
              • Distribuição aproximadamente normal detectada
              <br />• Testes paramétricos (t-test, ANOVA) podem ser apropriados
              <br />• Regressão linear pode ser aplicável
            </span>
          ) : (
            <span style={{ color: '#faad14' }}>
              • Distribuição apresenta desvios da normalidade
              <br />• Considere transformação de dados (log, raiz quadrada,
              Box-Cox)
              <br />• Testes não-paramétricos (Mann-Whitney, Kruskal-Wallis)
              podem ser mais adequados
            </span>
          )}
        </p>
      </div>
    </Card>
  );
};
