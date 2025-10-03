import React from 'react';
import { Layout, Typography, Button, Space } from 'antd';
import { ReloadOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header: AntHeader } = Layout;
const { Title, Paragraph } = Typography;

const StyledHeader = styled(AntHeader)`
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 212, 170, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 768px) {
    padding: 0 20px;
    flex-direction: column;
    text-align: center;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  min-width: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  color: white;
  flex: 1;
`;

const StyledTitle = styled(Title)`
  color: white !important;
  margin: 0 !important;
  font-size: 2.5rem !important;
  font-weight: 700 !important;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 2rem !important;
  }
`;

const StyledParagraph = styled(Paragraph)`
  color: white !important;
  margin: 0 !important;
  font-size: 1.1rem !important;
  opacity: 0.95;
`;

const RefreshButton = styled(Button)`
  background: linear-gradient(135deg, #e91e63, #f06292);
  border: none;
  color: white;
  height: 48px;
  padding: 0 24px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(233, 30, 99, 0.3);
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #c2185b, #e91e63);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(233, 30, 99, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    transform: none;
  }
`;

const Header = ({ onRefresh, loading }) => {
  return (
    <StyledHeader>
      <HeaderContent>
        <CustomerServiceOutlined style={{ fontSize: '2rem', color: 'white' }} />
        <TitleContainer>
          <StyledTitle level={1}>Pitchfork High-Scoring Albums</StyledTitle>
          <StyledParagraph>
            Discover the latest albums rated 8.0+ by Pitchfork
          </StyledParagraph>
        </TitleContainer>
      </HeaderContent>
      <Space>
        <RefreshButton
          type="primary"
          icon={<ReloadOutlined />}
          onClick={onRefresh}
          loading={loading}
          size="large"
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </RefreshButton>
      </Space>
    </StyledHeader>
  );
};

export default Header;

