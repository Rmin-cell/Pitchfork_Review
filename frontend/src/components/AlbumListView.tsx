import React, { useState } from 'react';
import { Typography, Tag } from 'antd';
import { StarFilled, HeartOutlined, HeartFilled, CustomerServiceOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Album } from '../types';

const { Text } = Typography;

interface AlbumListViewProps {
  albums: Album[];
  onAlbumClick: (album: Album) => void;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr 1fr 160px 140px 100px 70px;
  gap: 24px;
  padding: 24px 32px;
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  border-radius: 16px 16px 0 0;
  font-weight: 800;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--primary);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(30px);
  box-shadow: var(--shadow-md);
  
  @media (max-width: 1024px) {
    grid-template-columns: 70px 1fr 1fr 130px 110px 70px;
    gap: 16px;
    padding: 20px 24px;
    font-size: 0.8rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr 100px 60px;
    gap: 12px;
    padding: 16px 20px;
    font-size: 0.75rem;
    letter-spacing: 1px;
  }
`;

const HeaderCell = styled.div<{ hideOnMobile?: boolean; hideOnTablet?: boolean }>`
  ${props => props.hideOnMobile && `
    @media (max-width: 768px) {
      display: none;
    }
  `}
  
  ${props => props.hideOnTablet && `
    @media (max-width: 1024px) {
      display: none;
    }
  `}
`;

const ListRow = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr 1fr 160px 140px 100px 70px;
  gap: 24px;
  padding: 20px 32px;
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  border-top: none;
  align-items: center;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--gradient-accent);
    opacity: 0;
    transition: opacity 0.35s ease;
  }
  
  &:last-child {
    border-radius: 0 0 16px 16px;
  }
  
  &:hover {
    background: var(--card-bg-hover);
    border-color: var(--card-border-hover);
    transform: translateX(8px) scale(1.01);
    box-shadow: var(--shadow-lg);
    z-index: 1;
    
    &::before {
      opacity: 1;
    }
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: 70px 1fr 1fr 130px 110px 70px;
    gap: 16px;
    padding: 16px 24px;
    
    &:hover {
      transform: translateX(6px) scale(1.005);
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr 100px 60px;
    gap: 12px;
    padding: 14px 20px;
    
    &:hover {
      transform: translateX(4px);
    }
  }
`;

const AlbumCover = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background: var(--gradient-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 0, 128, 0.3), rgba(0, 245, 255, 0.3));
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  ${ListRow}:hover & {
    transform: scale(1.1) rotate(-2deg);
    box-shadow: var(--shadow-neon);
    
    &::after {
      opacity: 0.3;
    }
    
    img {
      transform: scale(1.05);
    }
  }
`;

const AlbumTitle = styled(Text)`
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
  
  ${ListRow}:hover & {
    color: var(--primary);
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    -webkit-line-clamp: 1;
  }
`;

const ArtistName = styled(Text)`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  transition: color 0.3s ease;
  
  ${ListRow}:hover & {
    color: var(--text-primary);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    -webkit-line-clamp: 1;
  }
`;

const GenreTag = styled(Tag)`
  border-radius: 16px;
  font-weight: 500;
  font-size: 0.8rem;
  padding: 4px 12px;
  background: var(--card-bg-hover);
  color: var(--text-primary);
  border: 1px solid var(--card-border);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  
  @media (max-width: 1024px) {
    font-size: 0.75rem;
    padding: 3px 10px;
  }
`;

const ScoreBadge = styled.div<{ score: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${props => {
    if (props.score >= 9.0) return 'linear-gradient(135deg, #39FF14, #00F5FF)';
    if (props.score >= 8.5) return 'linear-gradient(135deg, #00F5FF, #FF0080)';
    return 'linear-gradient(135deg, #FFD93D, #FF0080)';
  }};
  color: ${props => props.score >= 9.0 ? '#000' : '#fff'};
  padding: 10px 20px;
  border-radius: 24px;
  font-weight: 900;
  font-size: 1.1rem;
  box-shadow: var(--shadow-md);
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  svg {
    font-size: 1rem;
  }
  
  ${ListRow}:hover & {
    transform: scale(1.1);
    box-shadow: ${props => {
      if (props.score >= 9.0) return '0 0 20px rgba(57, 255, 20, 0.6)';
      if (props.score >= 8.5) return '0 0 20px rgba(0, 245, 255, 0.6)';
      return '0 0 20px rgba(255, 0, 128, 0.6)';
    }};
  }
  
  @media (max-width: 1024px) {
    padding: 8px 16px;
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.9rem;
    gap: 6px;
  }
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  background: ${props => props.isFavorite ? 'var(--gradient-accent)' : 'transparent'};
  border: 2px solid ${props => props.isFavorite ? 'transparent' : 'var(--card-border)'};
  cursor: pointer;
  color: ${props => props.isFavorite ? '#fff' : 'var(--text-tertiary)'};
  font-size: 1.6rem;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: ${props => props.isFavorite ? 'var(--shadow-neon)' : 'none'};
  
  &:hover {
    color: ${props => props.isFavorite ? '#fff' : '#FF0080'};
    background: ${props => props.isFavorite ? 'var(--gradient-accent)' : 'rgba(255, 0, 128, 0.1)'};
    border-color: ${props => props.isFavorite ? 'transparent' : '#FF0080'};
    transform: scale(1.15) rotate(${props => props.isFavorite ? '0deg' : '12deg'});
    box-shadow: ${props => props.isFavorite ? 'var(--shadow-neon)' : '0 0 15px rgba(255, 0, 128, 0.4)'};
  }
  
  &:active {
    transform: scale(0.9);
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    width: 40px;
    height: 40px;
  }
`;

const CellContent = styled.div<{ hideOnMobile?: boolean; hideOnTablet?: boolean }>`
  ${props => props.hideOnMobile && `
    @media (max-width: 768px) {
      display: none;
    }
  `}
  
  ${props => props.hideOnTablet && `
    @media (max-width: 1024px) {
      display: none;
    }
  `}
`;

const AlbumListView: React.FC<AlbumListViewProps> = ({ albums, onAlbumClick }) => {
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const toggleFavorite = (e: React.MouseEvent, albumTitle: string) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(albumTitle)
      ? favorites.filter(f => f !== albumTitle)
      : [...favorites, albumTitle];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleImageError = (albumTitle: string) => {
    setImageErrors(prev => new Set(prev).add(albumTitle));
  };

  return (
    <ListContainer>
      <ListHeader>
        <HeaderCell>Cover</HeaderCell>
        <HeaderCell>Title</HeaderCell>
        <HeaderCell hideOnMobile>Artist</HeaderCell>
        <HeaderCell hideOnMobile hideOnTablet>Genre</HeaderCell>
        <HeaderCell>Score</HeaderCell>
        <HeaderCell hideOnTablet>Best New</HeaderCell>
        <HeaderCell>Favorite</HeaderCell>
      </ListHeader>
      
      {albums.map((album, index) => {
        const isFavorite = favorites.includes(album.title);
        const score = parseFloat(album.score.replace('+', '')) || 8.0;
        const hasBadge = album.score.includes('+') || album.score.includes('Best New');
        const hasImageError = imageErrors.has(album.title);

        return (
          <ListRow key={`${album.title}-${index}`} onClick={() => onAlbumClick(album)}>
            <AlbumCover>
              {album.image_url && !hasImageError ? (
                <img 
                  src={album.image_url} 
                  alt={`${album.title} by ${album.artist}`}
                  onError={() => handleImageError(album.title)}
                  loading="lazy"
                />
              ) : (
                <CustomerServiceOutlined style={{ fontSize: '1.5rem', color: 'white' }} />
              )}
            </AlbumCover>
            
            <AlbumTitle>{album.title}</AlbumTitle>
            
            <CellContent hideOnMobile>
              <ArtistName>{album.artist}</ArtistName>
            </CellContent>
            
            <CellContent hideOnMobile hideOnTablet>
              <GenreTag>{album.genre}</GenreTag>
            </CellContent>
            
            <ScoreBadge score={score}>
              <StarFilled />
              {album.score}
            </ScoreBadge>
            
            <CellContent hideOnTablet>
              {hasBadge ? (
                <Tag color="gold" style={{ margin: 0, fontWeight: 600 }}>✨ Yes</Tag>
              ) : (
                <Text style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>—</Text>
              )}
            </CellContent>
            
            <FavoriteButton
              isFavorite={isFavorite}
              onClick={(e) => toggleFavorite(e, album.title)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? <HeartFilled /> : <HeartOutlined />}
            </FavoriteButton>
          </ListRow>
        );
      })}
    </ListContainer>
  );
};

export default AlbumListView;

