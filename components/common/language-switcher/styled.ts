import { Select } from 'antd';
import styled from 'styled-components';

export const FlagIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 2px;
  }
`;

export const OptionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSelect = styled(Select)`
  width: 60px !important;

  .ant-select-selector {
    background: transparent !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: white !important;
    padding: 4px 8px !important;
  }

  .ant-select-arrow {
    color: rgba(255, 255, 255, 0.8);
  }

  &:hover .ant-select-selector {
    border-color: rgba(255, 255, 255, 0.5) !important;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 !important;
  }
`;
