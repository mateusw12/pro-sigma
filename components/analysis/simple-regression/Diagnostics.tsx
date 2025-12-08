import { Card } from 'antd';

interface DiagnosticsProps {
  isSignificant: boolean;
  hasGoodFit: boolean;
}

export const Diagnostics = ({
  isSignificant,
  hasGoodFit,
}: DiagnosticsProps) => {
  return (
    <Card
      title="Diagnóstico e Recomendações"
      style={{
        background: isSignificant && hasGoodFit ? '#e6f7ff' : '#fffbe6',
      }}
    >
      {isSignificant && hasGoodFit ? (
        <div>
          <p>
            ✓ <strong>Modelo adequado!</strong> A regressão apresenta bom ajuste
            e é estatisticamente significativa.
          </p>
          <ul>
            <li>
              Use o modelo para previsões dentro do intervalo dos dados
              observados
            </li>
            <li>
              Monitore novos dados para verificar se o modelo continua válido
            </li>
            <li>Considere análise de resíduos para detectar outliers</li>
          </ul>
        </div>
      ) : (
        <div>
          <p>
            ⚠ <strong>Atenção:</strong> O modelo apresenta limitações.
          </p>
          <ul>
            {!isSignificant && (
              <li>
                O modelo não é estatisticamente significativo (p-valor {'>'}{' '}
                0.05)
              </li>
            )}
            {!hasGoodFit && (
              <li>
                R² baixo indica que o modelo explica pouca variabilidade dos
                dados
              </li>
            )}
            <li>
              Considere adicionar outras variáveis independentes (regressão
              múltipla)
            </li>
            <li>Verifique se existe relação não-linear entre as variáveis</li>
            <li>
              Investigue possíveis outliers que podem estar afetando o ajuste
            </li>
          </ul>
        </div>
      )}
    </Card>
  );
};
