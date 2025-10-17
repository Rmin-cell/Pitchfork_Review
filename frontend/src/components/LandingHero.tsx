import React from 'react';
import styled, { keyframes } from 'styled-components';

const scrollBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(8px);
    opacity: 0.5;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  background: var(--bg-primary);
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 900px;
  animation: ${fadeIn} 1s ease-out;
`;

const MainTitle = styled.h1`
  font-size: 8rem;
  font-weight: 400;
  color: var(--text-primary);
  margin: 0 0 24px 0;
  letter-spacing: -0.04em;
  line-height: 0.9;
  text-transform: lowercase;
  
  @media (max-width: 1024px) {
    font-size: 6rem;
  }
  
  @media (max-width: 768px) {
    font-size: 4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--text-secondary);
  margin: 0 0 48px 0;
  letter-spacing: 0.05em;
  text-transform: lowercase;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 80px;
  justify-content: center;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    gap: 40px;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 4rem;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--text-tertiary);
  text-transform: lowercase;
  letter-spacing: 0.05em;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  @media (max-width: 768px) {
    bottom: 24px;
  }
`;

const ScrollText = styled.span`
  font-size: 0.8125rem;
  font-weight: 400;
  color: var(--text-tertiary);
  text-transform: lowercase;
  letter-spacing: 0.1em;
`;

const ScrollArrow = styled.div`
  width: 1px;
  height: 40px;
  background: var(--text-tertiary);
  position: relative;
  animation: ${scrollBounce} 2s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid var(--text-tertiary);
  }
`;

interface LandingHeroProps {
  totalAlbums: number;
  bestNewCount: number;
  avgScore: string;
  onScrollClick: () => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({ 
  totalAlbums, 
  bestNewCount, 
  avgScore,
  onScrollClick 
}) => {
  return (
    <HeroContainer>
      <HeroContent>
        <MainTitle>hall of fame</MainTitle>
        <Subtitle>
          pitchfork's highest-rated albums, curated for discovery
        </Subtitle>
        
        {totalAlbums > 0 && (
          <StatsRow>
            <StatItem>
              <StatNumber>{totalAlbums}</StatNumber>
              <StatLabel>albums</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{bestNewCount}</StatNumber>
              <StatLabel>best new</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{avgScore}</StatNumber>
              <StatLabel>avg score</StatLabel>
            </StatItem>
          </StatsRow>
        )}
      </HeroContent>
      
      <ScrollIndicator onClick={onScrollClick}>
        <ScrollText>scroll to explore</ScrollText>
        <ScrollArrow />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default LandingHero;

