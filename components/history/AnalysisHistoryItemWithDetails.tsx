'use client';

import { HistoryAnalysis } from '@/types/history';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ClusterOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  AnalysisHeader,
  AnalysisInfo,
  AnalysisInfoItem,
  AnalysisItemContainer,
  AnalysisTitle,
  StatusBadge,
} from './styled';

interface AnalysisHistoryItemWithDetailsProps {
  analysis: HistoryAnalysis;
}

export const AnalysisHistoryItemWithDetails = ({
  analysis,
}: AnalysisHistoryItemWithDetailsProps) => {
  const router = useRouter();
  const locale = useLocale();
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

  const handleViewDetails = () => {
    router.push(`/${locale}/history/${analysis.id}`);
  };

  return (
    <AnalysisItemContainer>
      <AnalysisHeader>
        <div>
          <AnalysisTitle>{analysis.name}</AnalysisTitle>
        </div>
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={handleViewDetails}
            size="small"
          >
            Ver Detalhes
          </Button>
          <StatusBadge status={analysis.status}>
            {getStatusIcon(analysis.status)}
            {getStatusLabel(analysis.status)}
          </StatusBadge>
        </Space>
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
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '12px' }}>
          <strong>Colunas utilizadas:</strong>{' '}
          {analysis.selectedColumns.join(', ')}
        </div>
      )}
    </AnalysisItemContainer>
  );
};
