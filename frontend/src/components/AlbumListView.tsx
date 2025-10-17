import React, { useState } from 'react';
import { Tag } from 'antd';
import { StarFilled, HeartOutlined, HeartFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { Album } from '../types';

interface AlbumListViewProps {
  albums: Album[];
  onAlbumClick: (album: Album) => void;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 1fr 160px 100px 80px 60px;
  gap: 24px;
  padding: 20px 40px;
  background: transparent;
  border-bottom: 1px solid var(--card-border);
  font-weight: 300;
  font-size: 0.8125rem;
  text-transform: lowercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  
  @media (max-width: 1024px) {
    grid-template-columns: 70px 1fr 1fr 140px 80px 60px;
    gap: 16px;
    padding: 16px 24px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr 80px 50px;
    gap: 12px;
    padding: 16px 20px;
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
  grid-template-columns: 80px 1fr 1fr 160px 100px 80px 60px;
  gap: 24px;
  padding: 24px 40px;
  background: transparent;
  border-bottom: 1px solid var(--card-border);
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: var(--card-bg-hover);
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: 70px 1fr 1fr 140px 80px 60px;
    gap: 16px;
    padding: 20px 24px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr 80px 50px;
    gap: 12px;
    padding: 16px 20px;
  }
`;

const CoverImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 0px;
  object-fit: cover;
  border: 1px solid var(--card-border);
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const CoverPlaceholder = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 0px;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  font-size: 1.25rem;
  border: 1px solid var(--card-border);
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1rem;
  }
`;

const TextCell = styled.div<{ truncate?: boolean; hideOnMobile?: boolean; hideOnTablet?: boolean }>`
  color: var(--text-primary);
  font-size: 0.9375rem;
  font-weight: 300;
  
  ${props => props.truncate && `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
  
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
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const SecondaryTextCell = styled(TextCell)`
  color: var(--text-secondary);
  font-weight: 300;
`;

const ScoreBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  border-radius: 0px;
  background: transparent;
  border: 1px solid var(--text-primary);
  color: var(--text-primary);
  font-weight: 300;
  font-size: 0.9375rem;
  min-width: 50px;
  
  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 0.875rem;
    min-width: 45px;
  }
`;

const BestNewTag = styled(Tag)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 0px;
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 300;
  border: 1px solid var(--text-primary);
  background: transparent;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    padding: 2px 8px;
  }
  
  .anticon {
    font-size: 0.625rem;
  }
`;

const FavoriteButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--text-primary);
  }
  
  &.favorited {
    color: var(--text-primary);
  }
  
  .anticon {
    font-size: 1.125rem;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const AlbumListView: React.FC<AlbumListViewProps> = ({ albums, onAlbumClick }) => {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const toggleFavorite = (e: React.MouseEvent, album: Album) => {
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

  const isFavorite = (album: Album) => {
    const key = `${album.title}-${album.artist}`;
    return favorites.has(key);
  };

  return (
    <ListContainer>
      <ListHeader>
        <HeaderCell>cover</HeaderCell>
        <HeaderCell>title</HeaderCell>
        <HeaderCell>artist</HeaderCell>
        <HeaderCell hideOnMobile>genre</HeaderCell>
        <HeaderCell hideOnTablet>best new</HeaderCell>
        <HeaderCell>score</HeaderCell>
        <HeaderCell></HeaderCell>
      </ListHeader>
      
      {albums.map((album, index) => (
        <ListRow key={index} onClick={() => onAlbumClick(album)}>
          <div>
            {album.image_url ? (
              <CoverImage src={album.image_url} alt={album.title} loading="lazy" />
            ) : (
              <CoverPlaceholder>♪</CoverPlaceholder>
            )}
          </div>
          
          <TextCell truncate>{album.title}</TextCell>
          
          <SecondaryTextCell truncate>{album.artist}</SecondaryTextCell>
          
          <SecondaryTextCell truncate hideOnMobile>
            {album.genre || '—'}
          </SecondaryTextCell>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {album.best_new ? (
              <BestNewTag>
                <StarFilled /> best
              </BestNewTag>
            ) : (
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>—</span>
            )}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ScoreBadge>{album.score}</ScoreBadge>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FavoriteButton
              onClick={(e) => toggleFavorite(e, album)}
              className={isFavorite(album) ? 'favorited' : ''}
            >
              {isFavorite(album) ? <HeartFilled /> : <HeartOutlined />}
            </FavoriteButton>
          </div>
        </ListRow>
      ))}
    </ListContainer>
  );
};

export default AlbumListView;
