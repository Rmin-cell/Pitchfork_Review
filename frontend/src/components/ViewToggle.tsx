import React from 'react';
import { Segmented } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined, ReadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface ViewToggleProps {
  value: 'list' | 'genre' | 'magazine';
  onChange: (value: 'list' | 'genre' | 'magazine') => void;
}

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
`;

const StyledSegmented = styled(Segmented)`
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--card-border);
  border-radius: 50px;
  padding: 4px;
  box-shadow: var(--shadow-sm);
  
  .ant-segmented-item {
    border-radius: 50px;
    padding: 8px 24px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      color: var(--primary);
    }
  }
  
  .ant-segmented-item-selected {
    background: linear-gradient(135deg, var(--primary), var(--primary-hover));
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .ant-segmented-thumb {
    background: linear-gradient(135deg, var(--primary), var(--primary-hover));
    border-radius: 50px;
  }
`;

const ViewToggle: React.FC<ViewToggleProps> = ({ value, onChange }) => {
  return (
    <ToggleContainer>
      <StyledSegmented
        value={value}
        onChange={(val) => onChange(val as 'list' | 'genre' | 'magazine')}
        options={[
          {
            label: 'List View',
            value: 'list',
            icon: <UnorderedListOutlined />,
          },
          {
            label: 'By Genre',
            value: 'genre',
            icon: <AppstoreOutlined />,
          },
          {
            label: 'Magazine',
            value: 'magazine',
            icon: <ReadOutlined />,
          },
        ]}
      />
    </ToggleContainer>
  );
};

export default ViewToggle;

