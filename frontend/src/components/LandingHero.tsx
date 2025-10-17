import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Album } from '../types';

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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(2deg);
  }
  66% {
    transform: translateY(10px) rotate(-2deg);
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
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const FloatingAlbumsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingAlbum = styled.div<{ delay: number; duration: number; x: string; y: string }>`
  position: absolute;
  width: 200px;
  height: 200px;
  filter: blur(80px);
  opacity: 0.03;
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  left: ${props => props.x};
  top: ${props => props.y};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 900px;
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  z-index: 2;
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
  z-index: 2;
  
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
  albums?: Album[];
}

const LandingHero: React.FC<LandingHeroProps> = ({ 
  totalAlbums, 
  bestNewCount, 
  avgScore,
  onScrollClick,
  albums = []
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'hall of fame';
  
  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 80; // milliseconds per character
    
    const typeNextChar = () => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
        setTimeout(typeNextChar, typingSpeed);
      }
    };
    
    // Start typing after a short delay
    const startDelay = setTimeout(typeNextChar, 300);
    
    return () => clearTimeout(startDelay);
  }, []);
  
  // Select 5 random albums for background
  const floatingAlbums = React.useMemo(() => {
    if (!albums || albums.length === 0) return [];
    
    const albumsWithImages = albums.filter(a => a.image_url && a.image_url.trim() !== '');
    const shuffled = [...albumsWithImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [albums]);
  
  const floatingPositions = [
    { x: '10%', y: '15%', delay: 0, duration: 40 },
    { x: '75%', y: '25%', delay: 2, duration: 45 },
    { x: '15%', y: '70%', delay: 4, duration: 50 },
    { x: '80%', y: '65%', delay: 1, duration: 42 },
    { x: '45%', y: '85%', delay: 3, duration: 48 },
  ];
  
  return (
    <HeroContainer>
      {/* Floating Albums Background */}
      <FloatingAlbumsBackground>
        {floatingAlbums.map((album, index) => (
          album.image_url ? (
            <FloatingAlbum
              key={index}
              delay={floatingPositions[index]?.delay || 0}
              duration={floatingPositions[index]?.duration || 40}
              x={floatingPositions[index]?.x || '50%'}
              y={floatingPositions[index]?.y || '50%'}
            >
              <img src={album.image_url} alt="" />
            </FloatingAlbum>
          ) : null
        ))}
      </FloatingAlbumsBackground>
      
      <HeroContent>
        <MainTitle>{displayedText}<span style={{ opacity: displayedText.length < fullText.length ? 1 : 0 }}>_</span></MainTitle>
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

