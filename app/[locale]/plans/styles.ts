import styled from 'styled-components';
import { Card } from 'antd';

export const PageContainer = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

export const PlanCard = styled(Card)<{ $isCurrentPlan?: boolean; $isDisabled?: boolean }>`
  border: 2px solid ${props =>
    props.$isCurrentPlan ? '#1890ff' :
    props.$isDisabled ? '#f0f0f0' : '#d9d9d9'};
  border-radius: 12px;
  transition: all 0.3s;
  opacity: ${props => props.$isDisabled ? 0.6 : 1};
  cursor: ${props => props.$isDisabled ? 'not-allowed' : 'default'};

  &:hover {
    ${props => !props.$isDisabled && !props.$isCurrentPlan && `
      border-color: #40a9ff;
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
    `}
  }

  .ant-card-head {
    border-bottom: 2px solid ${props => props.$isCurrentPlan ? '#1890ff' : '#f0f0f0'};
    background: ${props => props.$isCurrentPlan ? '#e6f7ff' : 'white'};
  }
`;

export const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const PlanName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
  text-transform: capitalize;
`;

export const PriceContainer = styled.div`
  margin-bottom: 24px;
`;

export const Price = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #1890ff;

  span {
    font-size: 18px;
    color: #666;
  }
`;

export const PriceLabel = styled.div`
  font-size: 14px;
  color: #999;
  margin-top: 4px;
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
  font-size: 14px;
  color: #333;

  .anticon {
    color: #52c41a;
    margin-right: 8px;
    margin-top: 2px;
  }
`;

export const PaymentModalContent = styled.div`
  padding: 24px 0;
`;

export const PaymentSection = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1a1a1a;
`;

export const PaymentMethodCard = styled.div<{ $selected?: boolean }>`
  border: 2px solid ${props => props.$selected ? '#1890ff' : '#d9d9d9'};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s;
  background: ${props => props.$selected ? '#e6f7ff' : 'white'};

  &:hover {
    border-color: #40a9ff;
  }
`;

export const PaymentMethodLabel = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;

  .anticon {
    margin-right: 8px;
    font-size: 20px;
  }
`;

export const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
  margin-top: 16px;

  .anticon {
    color: #52c41a;
    margin-right: 8px;
    font-size: 18px;
  }

  span {
    font-size: 13px;
    color: #389e0d;
  }
`;

export const SummaryBox = styled.div`
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
    padding-top: 12px;
    border-top: 1px solid #d9d9d9;
    font-size: 18px;
    font-weight: 600;
  }
`;
