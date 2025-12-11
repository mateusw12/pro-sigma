'use client';

import styled from 'styled-components';

export const DetailContainer = styled.div`
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #e5e7eb;
`;

export const DetailTitle = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
`;

export const DetailSection = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

export const InfoCard = styled.div`
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  dt {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  dd {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

export const ResultCard = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  text-align: center;

  .label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.9;
    margin-bottom: 8px;
  }

  .value {
    display: block;
    font-size: 24px;
    font-weight: 700;
  }

  &.success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  &.warning {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  }

  &.danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }
`;

export const JSONResultsContainer = styled.pre`
  padding: 16px;
  background: #1f2937;
  color: #10b981;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
  font-family: 'Monaco', 'Courier New', monospace;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    border-color: #9ca3af;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ChartContainer = styled.div`
  padding: 20px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 16px;
`;
