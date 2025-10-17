import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import { StarFilled, HeartOutlined, HeartFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { AlbumCardProps } from '../types';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  height: 100%;
  background: transparent;
  border: 1px solid var(--card-border);
  border-radius: 0px;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: none;
  cursor: pointer;
  
  &:hover {
    border-color: var(--text-primary);
  }
  
  .ant-card-body {
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const AlbumArtwork = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceholderIcon = styled.div`
  font-size: 3rem;
  opacity: 0.2;
`;

const ScoreDisplay = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--text-primary);
  color: var(--bg-primary);
  padding: 4px 12px;
  border-radius: 0px;
  font-weight: 300;
  font-size: 0.875rem;
  z-index: 2;
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--bg-primary);
  border: 1px solid var(--card-border);
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;
  
  &:hover {
    color: var(--text-primary);
    border-color: var(--text-primary);
  }
  
  &.favorited {
    color: var(--text-primary);
    border-color: var(--text-primary);
  }
  
  .anticon {
    font-size: 0.875rem;
  }
`;

const AlbumInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-top: 1px solid var(--card-border);
`;

const AlbumTitle = styled(Title)`
  && {
    margin: 0 0 8px 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.4;
    color: var(--text-primary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ArtistName = styled(Text)`
  && {
    font-size: 0.875rem;
    font-weight: 300;
    color: var(--text-secondary);
    display: block;
    margin-bottom: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  flex-wrap: wrap;
`;

const GenreText = styled.span`
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-weight: 300;
  text-transform: lowercase;
`;

const BestNewTag = styled.span`
  font-size: 0.75rem;
  color: var(--text-primary);
  font-weight: 300;
  display: flex;
  align-items: center;
  gap: 4px;
  text-transform: lowercase;
  
  .anticon {
    font-size: 0.625rem;
  }
`;

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const key = `${album.title}-${album.artist}`;
    const newFavorites = new Set(favorites);
    
    if (newFavorites.has(key)) {
      newFavorites.delete(key);
    } else {
      newFavorites.add(key);
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));
  };

  const isFavorite = () => {
    const key = `${album.title}-${album.artist}`;
    return favorites.has(key);
  };

  return (
    <StyledCard onClick={() => onClick?.(album)}>
      <AlbumArtwork>
        {album.image_url ? (
          <img src={album.image_url} alt={album.title} loading="lazy" />
        ) : (
          <PlaceholderIcon>♪</PlaceholderIcon>
        )}
        <ScoreDisplay>{album.score}</ScoreDisplay>
        <FavoriteButton
          onClick={toggleFavorite}
          className={isFavorite() ? 'favorited' : ''}
        >
          {isFavorite() ? <HeartFilled /> : <HeartOutlined />}
        </FavoriteButton>
      </AlbumArtwork>
      
      <AlbumInfo>
        <AlbumTitle level={5}>{album.title}</AlbumTitle>
        <ArtistName>{album.artist}</ArtistName>
        
        <MetaInfo>
          {album.genre && <GenreText>{album.genre}</GenreText>}
          {album.best_new && (
            <BestNewTag>
              <StarFilled /> best new
            </BestNewTag>
          )}
        </MetaInfo>
      </AlbumInfo>
    </StyledCard>
  );
};

export default AlbumCard;
