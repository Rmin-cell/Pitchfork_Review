import React from 'react';
import { Switch } from 'antd';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const ToggleContainer = styled.div`
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    top: 24px;
    right: 24px;
  }
`;

const Label = styled.span`
  font-size: 0.8125rem;
  font-weight: 300;
  color: var(--text-tertiary);
  user-select: none;
  text-transform: lowercase;
  letter-spacing: 0.05em;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledSwitch = styled(Switch)`
  &.ant-switch {
    background: var(--card-border);
    border: 1px solid var(--card-border);
  }
  
  &.ant-switch-checked {
    background: var(--text-primary);
    border: 1px solid var(--text-primary);
  }
`;

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <ToggleContainer>
      <Label>{isDarkMode ? 'dark' : 'light'}</Label>
      
      <StyledSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
    </ToggleContainer>
  );
};

export default DarkModeToggle;
