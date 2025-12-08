import styled from 'styled-components';
import { Card } from 'antd';

export const PageContainer = styled.div`
  padding: 24px;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 8px;
  color: #1890ff;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
`;

export const UploadSection = styled(Card)`
  margin-bottom: 24px;
  border: 2px dashed #d9d9d9;
  background: #fafafa;

  &:hover {
    border-color: #1890ff;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin-top: 16px;
  border: 1px solid #d9d9d9;
`;

export const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

export const ToolCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;

  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
    transform: translateY(-2px);
  }

  .ant-card-head {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    .ant-card-head-title {
      color: white;
    }
  }
`;

export const DataPreview = styled(Card)`
  margin-top: 24px;
  max-height: 400px;
  overflow: auto;
`;
