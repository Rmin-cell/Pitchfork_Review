import React from 'react';
import { Segmented } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface ViewToggleProps {
  value: 'list' | 'genre';
  onChange: (value: 'list' | 'genre') => void;
}

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0 60px;
`;

const StyledSegmented = styled(Segmented)`
  background: transparent;
  border: 1px solid var(--card-border);
  border-radius: 0px;
  padding: 4px;
  
  .ant-segmented-item {
    border-radius: 0px;
    padding: 8px 24px;
    font-weight: 300;
    transition: all 0.2s ease;
    color: var(--text-secondary);
    font-size: 0.875rem;
    letter-spacing: 0.02em;
    
    &:hover {
      color: var(--text-primary);
    }
  }
  
  .ant-segmented-item-selected {
    background: var(--text-primary);
    color: var(--bg-primary);
  }
  
  .ant-segmented-thumb {
    background: var(--text-primary);
    border-radius: 0px;
  }
`;

const ViewToggle: React.FC<ViewToggleProps> = ({ value, onChange }) => {
  return (
    <ToggleContainer>
      <StyledSegmented
        value={value}
        onChange={(val) => onChange(val as 'list' | 'genre')}
        options={[
          {
            label: 'list',
            value: 'list',
            icon: <UnorderedListOutlined />,
          },
          {
            label: 'by genre',
            value: 'genre',
            icon: <AppstoreOutlined />,
          },
        ]}
      />
    </ToggleContainer>
  );
};

export default ViewToggle;
