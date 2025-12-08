import { Card, Tag } from 'antd';

interface DiagnosticsProps {
  isSignificant: boolean;
  hasGoodFit: boolean;
  significantParameters: string[];
}

export const Diagnostics = ({
  isSignificant,
  hasGoodFit,
  significantParameters,
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
            ✓ <strong>Modelo adequado!</strong> O design Space-Filling apresenta
            bom ajuste e é estatisticamente significativo.
          </p>
          <ul>
            <li>
              Use o modelo para explorar a superfície de resposta no espaço
              experimental
            </li>
            <li>
              Identifique regiões ótimas ou de interesse baseado nas predições
            </li>
            <li>Valide o modelo com novos experimentos se possível</li>
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
                R² baixo/moderado indica que o modelo explica parte limitada da
                variabilidade
              </li>
            )}
            <li>Considere adicionar mais termos ao modelo</li>
            <li>Verifique se há outliers afetando o ajuste</li>
            <li>Avalie se mais pontos experimentais são necessários</li>
          </ul>
        </div>
      )}

      <h4 style={{ marginTop: 16 }}>
        Parâmetros Significativos (p &lt; 0.05):
      </h4>
      {significantParameters.length > 0 ? (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {significantParameters.map((param) => (
            <Tag key={param} color="blue" style={{ fontSize: 14 }}>
              {param}
            </Tag>
          ))}
        </div>
      ) : (
        <p style={{ color: '#999' }}>
          Nenhum parâmetro significativo encontrado (exceto Intercept)
        </p>
      )}

      <h4 style={{ marginTop: 16 }}>Sobre Space-Filling Design:</h4>
      <p style={{ fontSize: 13, color: '#666' }}>
        Designs Space-Filling (como Latin Hypercube Sampling) distribuem pontos
        uniformemente pelo espaço experimental, permitindo exploração eficiente
        de múltiplos fatores. São ideais quando há muitos fatores e recursos
        experimentais limitados, fornecendo boa cobertura do espaço para
        modelagem de superfície de resposta.
      </p>
    </Card>
  );
};
