import React, { useMemo } from 'react';
import { Button, Typography } from 'antd';
import { StarFilled, ReadOutlined, TrophyOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Album } from '../types';

const { Title, Text } = Typography;

interface FeaturedAlbumHeroProps {
  albums: Album[];
  onViewDetails: (album: Album) => void;
}

const HeroContainer = styled.div<{ backgroundImage?: string }>`
  position: relative;
  width: 100%;
  min-height: 500px;
  background: ${props => 
    props.backgroundImage 
      ? `url(${props.backgroundImage})` 
      : 'linear-gradient(135deg, var(--primary), var(--primary-hover))'
  };
  background-size: cover;
  background-position: center;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 48px;
  box-shadow: var(--shadow-lg);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    backdrop-filter: blur(3px);
  }
  
  @media (max-width: 768px) {
    min-height: 400px;
    border-radius: 16px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 60px;
  height: 100%;
  min-height: 500px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    padding: 40px;
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    padding: 32px 24px;
    min-height: 400px;
  }
`;

const AlbumArtwork = styled.div`
  flex-shrink: 0;
  position: relative;
  
  @media (max-width: 1024px) {
    width: 250px;
    height: 250px;
  }
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const ArtworkImage = styled.div<{ src?: string }>`
  width: 300px;
  height: 300px;
  background: ${props => 
    props.src 
      ? `url(${props.src})` 
      : 'linear-gradient(135deg, var(--primary), var(--accent))'
  };
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.05) rotate(2deg);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }
  
  @media (max-width: 1024px) {
    width: 250px;
    height: 250px;
  }
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: -12px;
  left: -12px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #1a1625;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.4);
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 3;
  animation: pulse 2s ease-in-out infinite;
  
  svg {
    font-size: 1rem;
  }
`;

const AlbumInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 1024px) {
    align-items: center;
  }
`;

const FeaturedTitle = styled(Title)`
  color: #fff !important;
  margin: 0 !important;
  font-family: 'Playfair Display', serif !important;
  font-size: 3.5rem !important;
  font-weight: 700 !important;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  line-height: 1.2 !important;
  
  @media (max-width: 1024px) {
    font-size: 2.5rem !important;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem !important;
  }
`;

const FeaturedArtist = styled(Text)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.5rem;
  font-weight: 500;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ScoreSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 16px 0;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const ScoreBadge = styled.div`
  background: linear-gradient(135deg, var(--score-perfect), var(--score-excellent));
  color: var(--text-primary);
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 2rem;
  font-weight: 800;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GenreBadge = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const BestNewIndicator = styled.div`
  background: rgba(78, 205, 196, 0.3);
  backdrop-filter: blur(10px);
  border: 2px solid #4ECDC4;
  color: #4ECDC4;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Description = styled(Text)`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const CTAButton = styled(Button)`
  background: linear-gradient(135deg, #fff, rgba(255, 255, 255, 0.9));
  border: none;
  color: var(--text-primary);
  height: 56px;
  padding: 0 40px;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 28px;
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: linear-gradient(135deg, #fff, #fff);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 32px rgba(255, 255, 255, 0.4);
    color: var(--text-primary);
  }
  
  &:active {
    transform: translateY(0) scale(1.02);
  }
`;

const FeaturedAlbumHero: React.FC<FeaturedAlbumHeroProps> = ({ albums, onViewDetails }) => {
  const featuredAlbum = useMemo(() => {
    if (!albums || albums.length === 0) return null;
    
    // Find the highest-scored album
    return albums.reduce((highest, current) => {
      const currentScore = parseFloat(current.score.replace('+', '')) || 0;
      const highestScore = parseFloat(highest.score.replace('+', '')) || 0;
      return currentScore > highestScore ? current : highest;
    });
  }, [albums]);

  if (!featuredAlbum) return null;

  return (
    <HeroContainer backgroundImage={featuredAlbum.image_url}>
      <HeroContent>
        <AlbumArtwork>
          <FeaturedBadge>
            <StarFilled />
            Featured
          </FeaturedBadge>
          <ArtworkImage src={featuredAlbum.image_url} />
        </AlbumArtwork>
        
        <AlbumInfo>
          <div>
            <FeaturedTitle level={1}>
              {featuredAlbum.title}
            </FeaturedTitle>
            <FeaturedArtist>
              {featuredAlbum.artist}
            </FeaturedArtist>
          </div>
          
          <ScoreSection>
            <ScoreBadge>
              <StarFilled style={{ fontSize: '1.5rem' }} />
              {featuredAlbum.score}
            </ScoreBadge>
            <GenreBadge>{featuredAlbum.genre}</GenreBadge>
            {featuredAlbum.best_new && (
              <BestNewIndicator>
                <TrophyOutlined />
                Best New
              </BestNewIndicator>
            )}
          </ScoreSection>
          
          <Description>
            One of the highest-rated albums on Pitchfork. This masterpiece has earned its place 
            in the hall of fame with exceptional artistry and critical acclaim.
          </Description>
          
          <div>
            <CTAButton
              icon={<ReadOutlined />}
              size="large"
              onClick={() => onViewDetails(featuredAlbum)}
            >
              Explore This Album
            </CTAButton>
          </div>
        </AlbumInfo>
      </HeroContent>
    </HeroContainer>
  );
};

export default FeaturedAlbumHero;

