import { Layout } from 'antd';
import styled from 'styled-components';

const { Header, Content } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledHeader = styled(Header)`
  background: #001529;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`;

export const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;
`;

export const UserInfo = styled.div`
  color: white;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledContent = styled(Content)`
  margin: 24px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  min-height: 280px;
`;
