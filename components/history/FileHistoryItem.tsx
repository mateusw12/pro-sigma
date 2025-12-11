'use client';

import { formatBytes } from '@/lib/utils/formatters';
import { HistoryFile } from '@/types/history';
import {
  CalendarOutlined,
  DatabaseOutlined,
  FileOutlined,
} from '@ant-design/icons';
import {
  FileHeader,
  FileInfo,
  FileInfoItem,
  FileItemContainer,
  FileName,
} from './styled';

interface FileHistoryItemProps {
  file: HistoryFile;
}

export const FileHistoryItem = ({ file }: FileHistoryItemProps) => {
  const uploadDate = new Date(file.uploadedAt).toLocaleString();

  return (
    <FileItemContainer>
      <FileHeader>
        <FileName>
          <FileOutlined style={{ marginRight: '8px' }} />
          {file.fileName}
        </FileName>
      </FileHeader>
      <FileInfo>
        <FileInfoItem>
          <DatabaseOutlined />
          <strong>Tamanho:</strong> {formatBytes(file.fileSize)}
        </FileInfoItem>
        <FileInfoItem>
          <CalendarOutlined />
          <strong>Enviado em:</strong> {uploadDate}
        </FileInfoItem>
        <FileInfoItem>
          <DatabaseOutlined />
          <strong>Colunas:</strong> {file.columns.length}
        </FileInfoItem>
        <FileInfoItem>
          <strong>Linhas:</strong> {file.rowCount.toLocaleString()}
        </FileInfoItem>
      </FileInfo>
      <div
        style={{
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid #e5e7eb',
        }}
      >
        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
          <strong>Colunas:</strong> {file.columns.join(', ')}
        </span>
      </div>
    </FileItemContainer>
  );
};
