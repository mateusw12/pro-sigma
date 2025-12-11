import styled from 'styled-components';

export const HistoryContainer = styled.div`
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
`;

export const HistoryTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #1f2937;
`;

export const TabsContainer = styled.div`
  margin-bottom: 24px;
`;

export const FileItemContainer = styled.div`
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
  }
`;

export const FileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const FileName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

export const FileInfo = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6b7280;
`;

export const FileInfoItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;

  strong {
    color: #374151;
  }
`;

export const AnalysisItemContainer = styled.div`
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 12px;
  background: #fafafa;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: #10b981;
  }
`;

export const AnalysisHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const AnalysisTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

export const StatusBadge = styled.span<{
  status: 'completed' | 'failed' | 'pending';
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;

  ${(props) => {
    switch (props.status) {
      case 'completed':
        return `background-color: #d1fae5; color: #065f46;`;
      case 'failed':
        return `background-color: #fee2e2; color: #7f1d1d;`;
      case 'pending':
        return `background-color: #fef3c7; color: #78350f;`;
      default:
        return `background-color: #e5e7eb; color: #374151;`;
    }
  }}
`;

export const AnalysisInfo = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
`;

export const AnalysisInfoItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;

  strong {
    color: #374151;
  }
`;

export const ResultsContainer = styled.div`
  background: white;
  padding: 12px;
  border-radius: 6px;
  margin-top: 12px;
  font-size: 13px;
  color: #374151;

  pre {
    margin: 0;
    overflow-x: auto;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  color: #6b7280;

  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  p {
    margin: 0;
    font-size: 16px;
  }
`;
