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
    background: linear-gradient(135deg, #FF6B6B, #FFD93D, #6BCB77) !important;
    border: none !important;
    box-shadow: 0 8px 24px rgba(255, 107, 107, 0.4) !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    animation: rainbow 3s ease-in-out infinite !important;
    
    &:hover {
      transform: scale(1.1) rotate(15deg) !important;
      box-shadow: 0 12px 32px rgba(255, 107, 107, 0.6) !important;
    }
    
    &:active {
      transform: scale(0.95) rotate(0deg) !important;
    }
  }
  
  svg {
    color: #fff !important;
    font-size: 1.3rem !important;
    animation: pulse 1.5s ease-in-out infinite !important;
  }
  
  @keyframes rainbow {
    0%, 100% {
      background: linear-gradient(135deg, #FF6B6B, #FFD93D, #6BCB77) !important;
    }
    25% {
      background: linear-gradient(135deg, #FFD93D, #6BCB77, #4ECDC4) !important;
    }
    50% {
      background: linear-gradient(135deg, #6BCB77, #4ECDC4, #C77DFF) !important;
    }
    75% {
      background: linear-gradient(135deg, #4ECDC4, #C77DFF, #FF6B6B) !important;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;

const SurpriseMeButton: React.FC<SurpriseMeButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <Tooltip 
      title="Surprise Me! 🎲" 
      placement="left"
    >
      <StyledFloatButton
        icon={<ThunderboltFilled />}
        onClick={onClick}
        style={{
          bottom: 90,
          right: 24,
          opacity: disabled ? 0.5 : 1,
          pointerEvents: disabled ? 'none' : 'auto',
        }}
        aria-label="Show random album"
      />
    </Tooltip>
  );
};

export default SurpriseMeButton;

