import React from 'react';
import { Layout, Typography, Button, Space } from 'antd';
import { ReloadOutlined, TrophyOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header: AntHeader } = Layout;
const { Title, Paragraph } = Typography;

const HeroSection = styled.div`
  min-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 40px;
`;

const HeroTitle = styled(Title)`
  color: #2C3E50 !important;
  margin: 0 0 24px 0 !important;
  font-family: 'Playfair Display', serif !important;
  font-size: 4.5rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
  
  @media (max-width: 768px) {
    font-size: 3rem !important;
  }
`;

const HeroSubtitle = styled(Paragraph)`
  color: #5D6D7E !important;
  margin: 0 0 40px 0 !important;
  font-size: 1.25rem !important;
  font-weight: 400 !important;
  letter-spacing: 0.01em;
  line-height: 1.6;
`;

const HeroStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-bottom: 48px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2C3E50;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #5D6D7E;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const RefreshButton = styled(Button)`
  background: linear-gradient(135deg, #E2CBDA, #DED5E0);
  border: none;
  color: #2C3E50;
  height: 56px;
  padding: 0 32px;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 28px;
  box-shadow: 0 8px 24px rgba(226, 203, 218, 0.3);
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #E5C1D4, #E2CBDA);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(226, 203, 218, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    transform: none;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #5D6D7E;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
`;

const Header = ({ onRefresh, loading, albums }) => {
  const stats = {
    total: albums?.length || 0,
    bestNew: albums?.filter(album => album.best_new).length || 0,
  };

  return (
    <HeroSection>
      <HeroContent>
        <TrophyOutlined style={{ fontSize: '4rem', color: '#2C3E50', marginBottom: '24px' }} />
        
        <HeroTitle level={1}>
          Hall of Fame
        </HeroTitle>
        
        <HeroSubtitle>
          The most exceptional albums that have earned their place in music history. 
          Curated from Pitchfork's highest-rated reviews.
        </HeroSubtitle>
        
        <HeroStats>
          <StatItem>
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>Masterpieces</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{stats.bestNew}</StatNumber>
            <StatLabel>Best New</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>8.0+</StatNumber>
            <StatLabel>Rating</StatLabel>
          </StatItem>
        </HeroStats>
        
        <RefreshButton
          type="primary"
          icon={<ReloadOutlined />}
          onClick={onRefresh}
          loading={loading}
          size="large"
        >
          Discover Albums
        </RefreshButton>
      </HeroContent>
      
      <ScrollIndicator>
        Scroll to explore
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Header;