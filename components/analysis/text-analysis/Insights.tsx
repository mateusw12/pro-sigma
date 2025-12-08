import { Card } from 'antd';
import { calculateDiversity } from './utils';

interface InsightsProps {
  totalWordsCount: number;
  uniqueQuantityNotRepeat: number;
  phraseCount: number;
}

export const Insights = ({
  totalWordsCount,
  uniqueQuantityNotRepeat,
  phraseCount,
}: InsightsProps) => {
  const diversity = calculateDiversity(
    uniqueQuantityNotRepeat,
    totalWordsCount,
  );
  const avgWordsPerPhrase = totalWordsCount / phraseCount;
  const repetitionRate =
    ((totalWordsCount - uniqueQuantityNotRepeat) / totalWordsCount) * 100;

  return (
    <Card title="Insights e Recomendações" style={{ background: '#e6f7ff' }}>
      <div>
        <h4>📊 Análise Geral</h4>
        <ul>
          <li>
            <strong>Volume de Texto:</strong> O corpus analisado contém{' '}
            {totalWordsCount.toLocaleString()} palavras distribuídas em{' '}
            {phraseCount} frases, com média de {avgWordsPerPhrase.toFixed(1)}{' '}
            palavras por frase.
          </li>
          <li>
            <strong>Diversidade:</strong> Com {diversity.toFixed(2)}% de
            diversidade lexical, o texto{' '}
            {diversity > 50
              ? 'apresenta boa variedade vocabular'
              : 'tem vocabulário limitado com alta taxa de repetição'}
            .
          </li>
          <li>
            <strong>Taxa de Repetição:</strong> {repetitionRate.toFixed(2)}% das
            palavras são repetições, o que{' '}
            {repetitionRate > 60
              ? 'indica alta redundância no texto'
              : 'sugere uso equilibrado de termos'}
            .
          </li>
        </ul>

        <h4>💡 Recomendações</h4>
        <ul>
          {diversity < 50 && (
            <li>
              Considere enriquecer o vocabulário para evitar repetições
              excessivas
            </li>
          )}
          {avgWordsPerPhrase > 30 && (
            <li>
              Frases muito longas podem dificultar a leitura - considere
              simplificar
            </li>
          )}
          {repetitionRate > 70 && (
            <li>
              Alta taxa de repetição pode indicar uso de termos técnicos
              específicos ou templates padronizados
            </li>
          )}
          <li>
            Utilize as palavras e frases mais frequentes para identificar temas
            principais
          </li>
          <li>
            Analise frases longas e repetidas para possível otimização de
            comunicação
          </li>
        </ul>

        <h4>🎯 Aplicações</h4>
        <ul>
          <li>
            <strong>Análise de Sentimento:</strong> Use as palavras mais
            frequentes para identificar tom e contexto
          </li>
          <li>
            <strong>Categorização:</strong> Agrupe textos similares baseado nas
            frases recorrentes
          </li>
          <li>
            <strong>Otimização:</strong> Identifique redundâncias para melhorar
            eficiência da comunicação
          </li>
          <li>
            <strong>Tendências:</strong> Monitore mudanças na frequência de
            termos ao longo do tempo
          </li>
        </ul>
      </div>
    </Card>
  );
};
