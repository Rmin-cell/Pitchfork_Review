import React, { useMemo } from 'react';
import { Tag } from 'antd';
import { StarFilled, HeartOutlined, HeartFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { Album } from '../types';

interface GenreSectionsProps {
  albums: Album[];
  onAlbumClick: (album: Album) => void;
}

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  
  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const GenreSection = styled.div`
  margin-bottom: 80px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const GenreHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--card-border);
`;

const GenreTitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  text-transform: lowercase;
  letter-spacing: -0.02em;
`;

const GenreCount = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--text-tertiary);
  text-transform: lowercase;
`;

const AlbumRow = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 1fr 100px 80px 60px;
  gap: 24px;
  padding: 20px 0;
  background: transparent;
  border-bottom: 1px solid var(--card-border);
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: var(--card-bg-hover);
    padding-left: 16px;
    padding-right: 16px;
    margin-left: -16px;
    margin-right: -16px;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: 50px 1fr 1fr 80px 60px;
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 50px 1fr 80px 50px;
    gap: 12px;
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

const TextCell = styled.div<{ hideOnMobile?: boolean }>`
  color: var(--text-primary);
  font-size: 0.9375rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  ${props => props.hideOnMobile && `
    @media (max-width: 768px) {
      display: none;
    }
  `}
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const SecondaryTextCell = styled(TextCell)`
  color: var(--text-secondary);
  font-weight: 400;
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
  font-weight: 400;
  font-size: 0.9375rem;
  
  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 0.875rem;
  }
`;

const BestNewTag = styled(Tag)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 0px;
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 400;
  border: 1px solid var(--text-primary);
  background: transparent;
  color: var(--text-primary);
  margin: 0;
  
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

const GenreSections: React.FC<GenreSectionsProps> = ({ albums, onAlbumClick }) => {
  const [favorites, setFavorites] = React.useState<Set<string>>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const albumsByGenre = useMemo(() => {
    const grouped = albums.reduce((acc, album) => {
      const genre = album.genre || 'Unknown';
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(album);
      return acc;
    }, {} as Record<string, Album[]>);

    // Sort genres alphabetically
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  }, [albums]);

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
    <Container>
      {albumsByGenre.map(([genre, genreAlbums]) => (
        <GenreSection key={genre}>
          <GenreHeader>
            <GenreTitle>{genre}</GenreTitle>
            <GenreCount>({genreAlbums.length} albums)</GenreCount>
          </GenreHeader>
          
          {genreAlbums.map((album, index) => (
            <AlbumRow key={index} onClick={() => onAlbumClick(album)}>
              <div>
                {album.image_url ? (
                  <CoverImage src={album.image_url} alt={album.title} loading="lazy" />
                ) : (
                  <CoverPlaceholder>♪</CoverPlaceholder>
                )}
              </div>
              
              <TextCell>{album.title}</TextCell>
              
              <SecondaryTextCell hideOnMobile>{album.artist}</SecondaryTextCell>
              
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
            </AlbumRow>
          ))}
        </GenreSection>
      ))}
    </Container>
  );
};

export default GenreSections;
