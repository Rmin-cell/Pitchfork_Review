import React, { useMemo, useRef } from 'react';
import { Typography, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import AlbumCard from './AlbumCard';
import { Album } from '../types';

const { Title } = Typography;

interface GenreSectionsProps {
  albums: Album[];
  onAlbumClick: (album: Album) => void;
}

const SectionsContainer = styled.div`
  margin: 60px 0;
`;

const GenreSection = styled.div`
  margin-bottom: 60px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const SectionTitle = styled(Title)`
  margin: 0 !important;
  font-family: 'Playfair Display', serif !important;
  font-size: 2rem !important;
  font-weight: 600 !important;
  color: var(--text-primary) !important;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &::before {
    content: '';
    width: 4px;
    height: 32px;
    background: linear-gradient(180deg, var(--primary), var(--accent));
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem !important;
  }
`;

const AlbumCount = styled.span`
  color: var(--text-tertiary);
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
`;

const ScrollControls = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const ScrollButton = styled(Button)`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
  
  &:hover:not(:disabled) {
    background: var(--card-bg-hover);
    border-color: var(--card-border-hover);
    transform: scale(1.1);
    box-shadow: var(--shadow-md);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  
  svg {
    color: var(--text-primary);
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding: 8px 4px 24px 4px;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Show subtle scroll indicator on hover */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--card-border);
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const CarouselCard = styled.div`
  flex: 0 0 auto;
  width: 280px;
  
  @media (max-width: 768px) {
    width: 240px;
  }
  
  @media (max-width: 480px) {
    width: 200px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 24px;
  color: var(--text-tertiary);
  font-size: 1.1rem;
`;

const GenreIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 8px;
`;

// Genre icons mapping
const genreIcons: Record<string, string> = {
  'Rock': '🎸',
  'Pop': '🎤',
  'Electronic': '🎹',
  'Folk': '🪕',
  'Country': '🤠',
  'Metal': '🤘',
  'Rap': '🎤',
  'Experimental': '🧪',
  'R&B': '🎵',
  'Pop/R&B': '🎵',
  'Jazz': '🎺',
  'Classical': '🎻',
  'Hip-Hop': '🎤',
  'Indie': '🎸',
  'Default': '🎶',
};

const GenreSections: React.FC<GenreSectionsProps> = ({ albums, onAlbumClick }) => {
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Group albums by genre
  const albumsByGenre = useMemo(() => {
    const grouped: Record<string, Album[]> = {};
    
    albums.forEach(album => {
      const genre = album.genre || 'Other';
      if (!grouped[genre]) {
        grouped[genre] = [];
      }
      grouped[genre].push(album);
    });
    
    // Sort genres by album count (descending)
    return Object.entries(grouped)
      .sort(([, a], [, b]) => b.length - a.length)
      .reduce((acc, [genre, albumList]) => {
        acc[genre] = albumList;
        return acc;
      }, {} as Record<string, Album[]>);
  }, [albums]);

  const scroll = (genre: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[genre];
    if (!container) return;
    
    const scrollAmount = 600;
    const newScrollPosition = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  if (Object.keys(albumsByGenre).length === 0) {
    return (
      <EmptyState>
        No albums available to display
      </EmptyState>
    );
  }

  return (
    <SectionsContainer>
      {Object.entries(albumsByGenre).map(([genre, genreAlbums]) => {
        const icon = genreIcons[genre] || genreIcons['Default'];
        
        return (
          <GenreSection key={genre}>
            <SectionHeader>
              <SectionTitle level={2}>
                <GenreIcon>{icon}</GenreIcon>
                {genre}
                <AlbumCount>({genreAlbums.length})</AlbumCount>
              </SectionTitle>
              
              <ScrollControls>
                <ScrollButton
                  icon={<LeftOutlined />}
                  onClick={() => scroll(genre, 'left')}
                  aria-label={`Scroll ${genre} left`}
                />
                <ScrollButton
                  icon={<RightOutlined />}
                  onClick={() => scroll(genre, 'right')}
                  aria-label={`Scroll ${genre} right`}
                />
              </ScrollControls>
            </SectionHeader>
            
            <CarouselContainer>
              <CarouselTrack
                ref={el => scrollRefs.current[genre] = el}
              >
                {genreAlbums.map((album, index) => (
                  <CarouselCard key={`${genre}-${album.title}-${index}`}>
                    <AlbumCard album={album} onClick={onAlbumClick} />
                  </CarouselCard>
                ))}
              </CarouselTrack>
            </CarouselContainer>
          </GenreSection>
        );
      })}
    </SectionsContainer>
  );
};

export default GenreSections;

