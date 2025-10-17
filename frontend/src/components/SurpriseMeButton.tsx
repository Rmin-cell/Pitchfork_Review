import React from 'react';
import { FloatButton, Tooltip } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import styled from 'styled-components';

interface SurpriseMeButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const StyledFloatButton = styled(FloatButton)`
  .ant-float-btn-body {
    background: var(--card-bg) !important;
    border: 1px solid var(--card-border) !important;
    box-shadow: none !important;
    border-radius: 0px !important;
    transition: all 0.2s ease !important;
    
    &:hover {
      border-color: var(--text-primary) !important;
    }
  }
  
  svg {
    color: var(--text-primary) !important;
    font-size: 1.125rem !important;
  }
`;

const SurpriseMeButton: React.FC<SurpriseMeButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <Tooltip 
      title="surprise me" 
      placement="left"
    >
      <StyledFloatButton
        icon={<ThunderboltFilled />}
        onClick={onClick}
        style={{
          bottom: 90,
          right: 24,
          opacity: disabled ? 0.3 : 1,
          pointerEvents: disabled ? 'none' : 'auto',
        }}
        aria-label="Show random album"
      />
    </Tooltip>
  );
};

export default SurpriseMeButton;
