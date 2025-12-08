import { Card, Table, Tag } from 'antd';
import { WordFrequency } from './types';

interface WordFrequencyTableProps {
  topWords: WordFrequency[];
}

export const WordFrequencyTable = ({ topWords }: WordFrequencyTableProps) => {
  const columns = [
    {
      title: 'Ranking',
      key: 'ranking',
      width: 80,
      render: (_: unknown, __: unknown, index: number) => (
        <Tag color={index < 3 ? 'gold' : 'blue'}>{index + 1}º</Tag>
      ),
    },
    {
      title: 'Palavra',
      dataIndex: 'word',
      key: 'word',
      render: (word: string) => <strong>{word}</strong>,
    },
    {
      title: 'Frequência',
      dataIndex: 'count',
      key: 'count',
      width: 120,
      align: 'center' as const,
      render: (count: number) => (
        <Tag color="blue" style={{ fontSize: 14 }}>
          {count}
        </Tag>
      ),
    },
    {
      title: 'Comprimento',
      key: 'length',
      width: 120,
      align: 'center' as const,
      render: (_: unknown, record: WordFrequency) => (
        <span style={{ color: '#666' }}>{record.word.length} caracteres</span>
      ),
    },
  ];

  return (
    <Card
      title="Palavras Mais Frequentes (Top 20)"
      style={{ marginBottom: 24 }}
    >
      <Table
        columns={columns}
        dataSource={topWords
          .slice(0, 20)
          .map((item, index) => ({ ...item, key: index }))}
        pagination={false}
        size="small"
        scroll={{ y: 400 }}
      />
      <div
        style={{
          marginTop: 16,
          padding: '12px',
          background: '#fafafa',
          borderRadius: 4,
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Análise:</strong> As palavras mais frequentes representam os
          termos mais importantes e recorrentes no texto analisado. Palavras
          muito repetidas podem indicar temas centrais ou termos técnicos
          específicos do domínio.
        </p>
      </div>
    </Card>
  );
};
