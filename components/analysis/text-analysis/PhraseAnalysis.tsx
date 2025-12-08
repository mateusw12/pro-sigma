import { Card, Collapse, Tag } from 'antd';
import { PhraseFrequency } from './types';

interface PhraseAnalysisProps {
  topPhrases: PhraseFrequency[];
}

export const PhraseAnalysis = ({ topPhrases }: PhraseAnalysisProps) => {
  const items = topPhrases.map((phrase, index) => ({
    key: index.toString(),
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>
          <Tag color={index < 3 ? 'gold' : 'blue'}>{index + 1}º</Tag>
          {phrase.phrase.substring(0, 100)}
          {phrase.phrase.length > 100 ? '...' : ''}
        </span>
        <div>
          <Tag color="blue">{phrase.count}x</Tag>
          <Tag color="green">{phrase.length} chars</Tag>
        </div>
      </div>
    ),
    children: (
      <div>
        <p style={{ marginBottom: 8 }}>
          <strong>Frase completa:</strong>
        </p>
        <div
          style={{
            padding: 12,
            background: '#f0f2f5',
            borderRadius: 4,
            marginBottom: 8,
          }}
        >
          {phrase.phrase}
        </div>
        <p style={{ margin: 0, color: '#666' }}>
          <strong>Estatísticas:</strong> {phrase.count} ocorrências •{' '}
          {phrase.length} caracteres • ~{Math.ceil(phrase.length / 5)} palavras
        </p>
      </div>
    ),
  }));

  return (
    <Card title="Frases Mais Frequentes (Top 10)" style={{ marginBottom: 24 }}>
      <Collapse items={items} accordion />
      <div
        style={{
          marginTop: 16,
          padding: '12px',
          background: '#fafafa',
          borderRadius: 4,
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Análise:</strong> As frases mais frequentes representam
          padrões textuais recorrentes. Frases muito repetidas podem indicar
          problemas comuns, questões frequentes ou mensagens padronizadas.
        </p>
      </div>
    </Card>
  );
};
