import React, { useState } from 'react';
import { Card, Tag, Typography, Button } from 'antd';
import { CustomerServiceOutlined, StarOutlined, ReadOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { AlbumCardProps } from '../types';

const { Title, Text } = Typography;

const StyledCard = styled(Card)<{ isHovered?: boolean }>`
  height: 100%;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: var(--shadow-lg);
    background: var(--card-bg-hover);
    border-color: var(--card-border-hover);
  }
  
  &:active {
    transform: translateY(-8px) scale(1.01);
  }
  
  .ant-card-body {
    padding: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;

const AlbumArtwork = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #E2CBDA, #DED5E0);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${StyledCard}:hover img {
    transform: scale(1.05);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(233, 183, 206, 0.3), rgba(211, 243, 241, 0.3));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  ${StyledCard}:hover &::before {
    opacity: 1;
  }
`;

const ScoreDisplay = styled.div<{ score: number }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${props => {
    if (props.score >= 9.0) return 'var(--score-perfect)';
    if (props.score >= 8.5) return 'var(--score-excellent)';
    return 'var(--score-great)';
  }};
  color: var(--text-primary);
  padding: 8px 16px;
  border-radius: 24px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  z-index: 2;
  
  ${StyledCard}:hover & {
    transform: scale(1.1) rotate(-5deg);
    box-shadow: var(--shadow-md);
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  
  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const ActionButton = styled(Button)`
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${props => props.isFavorite ? 'rgba(255, 107, 107, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  svg {
    font-size: 1.1rem;
    color: ${props => props.isFavorite ? '#fff' : '#ff6b6b'};
  }
  
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const BestNewBadge = styled.div`
  position: absolute;
  top: 54px;
  left: 12px;
  background: var(--score-perfect);
  color: var(--text-primary);
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(211, 243, 241, 0.5);
  z-index: 2;
  transition: all 0.3s ease;
  
  ${StyledCard}:hover & {
    transform: translateY(-2px);
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AlbumTitle = styled(Title)`
  margin: 0 0 8px 0 !important;
  font-family: 'Playfair Display', serif !important;
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  color: var(--text-primary) !important;
  line-height: 1.3 !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
`;

const AlbumArtist = styled(Text)`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  display: block;
  font-weight: 500;
  transition: color 0.3s ease;
`;

const AlbumDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: auto;
`;

const GenreTag = styled(Tag)`
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.8rem;
  padding: 6px 16px;
  margin: 0;
  background: var(--card-border);
  color: var(--text-primary);
  border: 1px solid var(--card-border-hover);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
`;

const ScoreInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-tertiary);
  font-size: 0.8rem;
  font-weight: 500;
  transition: color 0.3s ease;
`;

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(album.title);
  });
  
  const hasBadge = album.best_new;
  const scoreValue = parseFloat(album.score.replace('+', '')) || 8.0;
  
  const handleClick = () => {
    if (onClick) {
      onClick(album);
    }
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter((f: string) => f !== album.title)
      : [...favorites, album.title];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(album);
    }
  };
  
  return (
    <StyledCard onClick={handleClick}>
      <AlbumArtwork>
        {album.image_url && !imageError ? (
          <img 
            src={album.image_url} 
            alt={`${album.title} by ${album.artist}`}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <CustomerServiceOutlined style={{ fontSize: '3rem', color: 'var(--text-tertiary)', zIndex: 2 }} />
        )}
        
        <HoverOverlay>
          <QuickActions>
            <ActionButton
              type="primary"
              icon={<ReadOutlined />}
              onClick={handleQuickView}
            >
              View Details
            </ActionButton>
          </QuickActions>
        </HoverOverlay>
        
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <HeartFilled /> : <HeartOutlined />}
        </FavoriteButton>
        
        <ScoreDisplay score={scoreValue}>
          {album.score}
        </ScoreDisplay>
        
        {hasBadge && (
          <BestNewBadge>
            Best New
          </BestNewBadge>
        )}
      </AlbumArtwork>
      
      <CardContent>
        <AlbumTitle level={4}>
          {album.title}
        </AlbumTitle>
        
        <AlbumArtist>
          {album.artist}
        </AlbumArtist>
        
        <AlbumDetails>
          <GenreTag>
            {album.genre}
          </GenreTag>
          <ScoreInfo>
            <StarOutlined style={{ color: 'var(--primary)' }} />
            Pitchfork
          </ScoreInfo>
        </AlbumDetails>
      </CardContent>
    </StyledCard>
  );
};

export default AlbumCard;

