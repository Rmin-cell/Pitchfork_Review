import React, { useMemo } from 'react';
import { Typography, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { HeaderProps } from '../types';

const { Title, Paragraph } = Typography;

const HeroSection = styled.section`
  position: relative;
  padding: 120px 40px 80px;
  text-align: left;
  background: var(--bg-primary);
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 80px 24px 60px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
`;

const HeroTitle = styled(Title)`
  color: var(--text-primary) !important;
  margin: 0 0 24px 0 !important;
  font-size: 5rem !important;
  font-weight: 300 !important;
  letter-spacing: -0.03em;
  line-height: 1.1 !important;
  
  @media (max-width: 768px) {
    font-size: 3rem !important;
  }
  
  span {
    display: block;
    color: var(--text-secondary);
    font-weight: 300;
  }
`;

const HeroSubtitle = styled(Paragraph)`
  color: var(--text-secondary) !important;
  margin: 0 0 60px 0 !important;
  font-size: 1.125rem !important;
  font-weight: 300 !important;
  line-height: 1.8;
  max-width: 600px;
`;

const HeroStats = styled.div`
  display: flex;
  gap: 80px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    gap: 40px;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  text-align: left;
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 200;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: var(--text-tertiary);
  text-transform: lowercase;
  letter-spacing: 0.05em;
  font-weight: 300;
`;

const RefreshButton = styled(Button)`
  height: 48px;
  padding: 0 32px;
  font-weight: 300;
  font-size: 0.9375rem;
  border-radius: 0px;
  border: 1px solid var(--text-primary);
  background: transparent;
  color: var(--text-primary);
  transition: all 0.2s ease;
  letter-spacing: 0.05em;
  
  &:hover:not(:disabled) {
    background: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  .anticon {
    font-size: 0.875rem;
  }
`;

const Header: React.FC<HeaderProps> = ({ onRefresh, loading, albums = [] }) => {
  const stats = useMemo(() => {
    return {
      total: albums?.length || 0,
      bestNew: albums?.filter(album => album.best_new).length || 0,
    };
  }, [albums]);

  return (
    <HeroSection>
      <HeroContent>
        <HeroTitle level={1}>
          Pitchfork <span>Hall of Fame</span>
        </HeroTitle>
        
        <HeroSubtitle>
          A curated collection of the highest-rated albums from Pitchfork's acclaimed music criticism, 
          featuring the best new music and timeless classics.
        </HeroSubtitle>
        
        {!loading && albums.length > 0 && (
          <>
            <HeroStats>
              <StatItem>
                <StatNumber>{stats.total}</StatNumber>
                <StatLabel>albums</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{stats.bestNew}</StatNumber>
                <StatLabel>best new</StatLabel>
              </StatItem>
            </HeroStats>
            
            <RefreshButton
              icon={<ReloadOutlined />}
              onClick={onRefresh}
              disabled={loading}
              loading={loading}
            >
              Refresh Collection
            </RefreshButton>
          </>
        )}
      </HeroContent>
    </HeroSection>
  );
};

export default Header;
