import styled from 'styled-components';
import { Card } from 'antd';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  color: #1890ff;
  margin-bottom: 30px;
  font-size: 28px;
`;
