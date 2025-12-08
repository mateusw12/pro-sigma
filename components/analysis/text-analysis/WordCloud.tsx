import { Card } from 'antd';
import { WordFrequency } from './types';

interface WordCloudProps {
  topWords: WordFrequency[];
}

export const WordCloud = ({ topWords }: WordCloudProps) => {
  // Encontrar a frequência máxima e mínima para normalização
  const maxFrequency = Math.max(...topWords.map((w) => w.count));
  const minFrequency = Math.min(...topWords.map((w) => w.count));

  // Calcular tamanho da fonte usando escala logarítmica para melhor distribuição
  const getFontSize = (count: number): number => {
    const minSize = 16;
    const maxSize = 64;

    // Se todas as palavras têm a mesma frequência, retorna tamanho médio
    if (maxFrequency === minFrequency) {
      return (minSize + maxSize) / 2;
    }

    // Normalização logarítmica para melhor distribuição visual
    const logMin = Math.log(minFrequency);
    const logMax = Math.log(maxFrequency);
    const logCount = Math.log(count);

    const normalized = (logCount - logMin) / (logMax - logMin);
    return minSize + normalized * (maxSize - minSize);
  };

  // Cores variadas para as palavras
  const colors = [
    '#1890ff',
    '#52c41a',
    '#faad14',
    '#f5222d',
    '#722ed1',
    '#eb2f96',
    '#13c2c2',
    '#2f54eb',
    '#fa8c16',
    '#a0d911',
    '#096dd9',
    '#389e0d',
    '#d48806',
    '#cf1322',
    '#531dab',
  ];

  const getColor = (index: number): string => {
    return colors[index % colors.length];
  };

  return (
    <Card
      title="Nuvem de Palavras - Frequência Visual"
      style={{ marginBottom: 24 }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          padding: '32px',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: 8,
          minHeight: 400,
        }}
      >
        {topWords.map((word, index) => {
          const fontSize = getFontSize(word.count);
          const color = getColor(index);

          // Determinar peso baseado na frequência normalizada
          const normalizedFreq =
            maxFrequency === minFrequency
              ? 0.5
              : (word.count - minFrequency) / (maxFrequency - minFrequency);

          const fontWeight =
            normalizedFreq > 0.7
              ? 'bold'
              : normalizedFreq > 0.4
                ? '600'
                : 'normal';

          return (
            <div
              key={index}
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: fontWeight,
                color: color,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                padding: '4px 8px',
                userSelect: 'none',
              }}
              title={`"${word.word}" - ${word.count} ocorrências (${(normalizedFreq * 100).toFixed(1)}% da frequência máxima)`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.textShadow =
                  '3px 3px 6px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.textShadow =
                  '2px 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              {word.word}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 16,
          padding: '12px',
          background: '#fafafa',
          borderRadius: 4,
        }}
      >
        <p style={{ margin: 0, marginBottom: 8 }}>
          <strong>Como interpretar:</strong> O tamanho de cada palavra
          representa sua frequência relativa usando escala logarítmica - isso
          permite visualizar melhor as diferenças entre palavras mesmo quando
          algumas aparecem muito mais que outras. Passe o mouse sobre as
          palavras para ver a contagem exata e frequência relativa.
        </p>
        <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
          <strong>Legenda:</strong> Palavras maiores e em negrito = alta
          frequência | Palavras médias = frequência moderada | Palavras menores
          = baixa frequência
        </p>
      </div>
    </Card>
  );
};
