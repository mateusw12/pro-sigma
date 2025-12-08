import styled from 'styled-components';
import { Card } from 'antd';

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 24px;
  color: #1890ff;
`;

export const StyledCard = styled(Card)`
  margin-bottom: 16px;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s;
  }
`;

export const QuickAccessCard = styled(Card)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 24px;

  .ant-card-body {
    text-align: center;
  }

  h2 {
    color: white;
    margin-bottom: 16px;
  }
`;
