'use client';

import { HistoryAnalysis } from '@/types/history';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ClusterOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  AnalysisHeader,
  AnalysisInfo,
  AnalysisInfoItem,
  AnalysisItemContainer,
  AnalysisTitle,
  ResultsContainer,
  StatusBadge,
} from './styled';

interface AnalysisHistoryItemProps {
  analysis: HistoryAnalysis;
}

export const AnalysisHistoryItem = ({ analysis }: AnalysisHistoryItemProps) => {
  const executedDate = new Date(analysis.executedAt).toLocaleString();
  const durationSeconds = (analysis.duration / 1000).toFixed(2);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined />;
      case 'failed':
        return <ExclamationCircleOutlined />;
      case 'pending':
        return <ClockCircleOutlined />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'failed':
        return 'Falhou';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  return (
    <AnalysisItemContainer>
      <AnalysisHeader>
        <div>
          <AnalysisTitle>{analysis.name}</AnalysisTitle>
        </div>
        <StatusBadge status={analysis.status}>
          {getStatusIcon(analysis.status)}
          {getStatusLabel(analysis.status)}
        </StatusBadge>
      </AnalysisHeader>
      <AnalysisInfo>
        <AnalysisInfoItem>
          <ClusterOutlined />
          <strong>Tipo:</strong> {analysis.type}
        </AnalysisInfoItem>
        <AnalysisInfoItem>
          <strong>Arquivo:</strong> {analysis.fileName}
        </AnalysisInfoItem>
        <AnalysisInfoItem>
          <CalendarOutlined />
          <strong>Executada em:</strong> {executedDate}
        </AnalysisInfoItem>
        <AnalysisInfoItem>
          <strong>Duração:</strong> {durationSeconds}s
        </AnalysisInfoItem>
      </AnalysisInfo>
      {analysis.selectedColumns && (
        <div
          style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}
        >
          <strong>Colunas utilizadas:</strong>{' '}
          {analysis.selectedColumns.join(', ')}
        </div>
      )}
      {analysis.results && analysis.status === 'completed' && (
        <ResultsContainer>
          <strong style={{ display: 'block', marginBottom: '8px' }}>
            Resultados:
          </strong>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(analysis.results, null, 2)}
          </pre>
        </ResultsContainer>
      )}
    </AnalysisItemContainer>
  );
};
