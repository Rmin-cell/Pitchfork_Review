import React from 'react';
import { Switch } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const ToggleContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  padding: 12px 20px;
  border-radius: 50px;
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    background: var(--card-bg-hover);
  }
  
  @media (max-width: 768px) {
    top: 16px;
    right: 16px;
    padding: 10px 16px;
  }
`;

const IconWrapper = styled.div<{ active: boolean }>`
  font-size: 1.2rem;
  transition: all 0.3s ease;
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-tertiary)'};
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: rotate(20deg) scale(1.1);
  }
`;

const Label = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  user-select: none;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background: linear-gradient(135deg, #7B68EE, #C77DFF);
  }
  
  &:not(.ant-switch-checked) {
    background: linear-gradient(135deg, #E2CBDA, #DED5E0);
  }
`;

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <ToggleContainer>
      <IconWrapper active={!isDarkMode}>
        <BulbFilled />
      </IconWrapper>
      
      <StyledSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
      
      <Label>{isDarkMode ? 'Dark' : 'Light'}</Label>
      
      <IconWrapper active={isDarkMode}>
        <BulbOutlined />
      </IconWrapper>
    </ToggleContainer>
  );
};

export default DarkModeToggle;

