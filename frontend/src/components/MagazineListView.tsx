import React, { useState } from 'react';
import { Typography, Button, Divider } from 'antd';
import { 
  StarFilled, 
  HeartOutlined, 
  HeartFilled,
  LinkOutlined,
  ReadOutlined,
  TrophyFilled
} from '@ant-design/icons';
import styled from 'styled-components';
import { Album } from '../types';

const { Title, Text, Paragraph } = Typography;

interface MagazineListViewProps {
  albums: Album[];
  onAlbumClick: (album: Album) => void;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 24px;
`;

const ArticleCard = styled.article<{ featured?: boolean }>`
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border-radius: ${props => props.featured ? '32px' : '24px'};
  overflow: hidden;
  border: ${props => props.featured ? '2px' : '1px'} solid var(--card-border);
  box-shadow: ${props => props.featured ? 'var(--shadow-xl)' : 'var(--shadow-md)'};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
    border-color: var(--card-border-hover);
  }
  
  ${props => props.featured && `
    background: linear-gradient(135deg, 
      rgba(108, 99, 255, 0.05) 0%, 
      rgba(199, 125, 255, 0.05) 100%
    );
    border-image: linear-gradient(135deg, #6C63FF, #C77DFF) 1;
  `}
`;

const ArticleContent = styled.div<{ layout: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${props => props.layout === 'horizontal' ? 'row' : 'column'};
  gap: ${props => props.layout === 'horizontal' ? '40px' : '0'};
  padding: ${props => props.layout === 'horizontal' ? '32px' : '0'};
  
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 24px;
    gap: 24px;
  }
`;

const AlbumArtwork = styled.div<{ size: 'large' | 'medium'; layout: 'horizontal' | 'vertical' }>`
  position: relative;
  flex-shrink: 0;
  ${props => {
    if (props.layout === 'vertical') {
      return `
        width: 100%;
        height: 400px;
      `;
    }
    return props.size === 'large' 
      ? 'width: 350px; height: 350px;' 
      : 'width: 280px; height: 280px;';
  }}
  border-radius: ${props => props.layout === 'vertical' ? '32px 32px 0 0' : '20px'};
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover img {
    transform: scale(1.08);
  }
  
  @media (max-width: 1024px) {
    width: 100%;
    height: ${props => props.size === 'large' ? '350px' : '280px'};
    border-radius: 20px;
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  padding: 8px 16px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
  animation: glow 2s ease-in-out infinite;
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 8px 24px rgba(255, 215, 0, 0.5); }
    50% { box-shadow: 0 8px 32px rgba(255, 215, 0, 0.8); }
  }
`;

const ScoreBadge = styled.div<{ score: number }>`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${props => {
    if (props.score >= 9.0) return 'linear-gradient(135deg, #6BCB77, #4ECDC4)';
    if (props.score >= 8.5) return 'linear-gradient(135deg, #00D4FF, #667eea)';
    return 'linear-gradient(135deg, #FFB800, #FF6B9D)';
  }};
  color: #fff;
  padding: 12px 20px;
  border-radius: 50px;
  font-weight: 900;
  font-size: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    font-size: 1.2rem;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${props => props.theme === 'vertical' ? '32px' : '0'};
  
  @media (max-width: 1024px) {
    padding: 0;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ArticleTitle = styled(Title)<{ featured?: boolean }>`
  margin: 0 !important;
  font-family: 'Playfair Display', serif !important;
  font-size: ${props => props.featured ? '3rem' : '2.5rem'} !important;
  font-weight: 700 !important;
  color: var(--text-primary) !important;
  line-height: 1.2 !important;
  transition: color 0.3s ease;
  
  @media (max-width: 1024px) {
    font-size: ${props => props.featured ? '2.2rem' : '2rem'} !important;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem !important;
  }
`;

const ArtistName = styled(Text)`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
`;

const GenrePill = styled.div<{ color: string }>`
  background: ${props => props.color};
  color: #fff;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px ${props => props.color}40;
`;

const BestNewIndicator = styled.div`
  background: linear-gradient(135deg, #6BCB77, #4ECDC4);
  color: #fff;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(107, 203, 119, 0.4);
`;

const ReviewExcerpt = styled(Paragraph)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary) !important;
  margin: 0 !important;
  font-family: 'Georgia', serif;
  font-style: italic;
  
  &::before {
    content: '"';
    font-size: 3rem;
    color: var(--primary);
    opacity: 0.3;
    line-height: 0;
    margin-right: 8px;
  }
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid var(--border-light);
  flex-wrap: wrap;
`;

const ActionButton = styled(Button)<{ variant?: 'primary' | 'secondary' }>`
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #6C63FF, #C77DFF);
    border: none;
    color: #fff;
    height: 48px;
    padding: 0 32px;
    font-weight: 700;
    font-size: 1rem;
    border-radius: 24px;
    box-shadow: 0 8px 24px rgba(108, 99, 255, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #5548E8, #B167FF);
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(108, 99, 255, 0.4);
      color: #fff;
    }
  ` : `
    background: transparent;
    border: 2px solid var(--card-border);
    color: var(--text-primary);
    height: 48px;
    padding: 0 24px;
    font-weight: 600;
    border-radius: 24px;
    
    &:hover {
      border-color: var(--primary);
      color: var(--primary);
      transform: translateY(-2px);
    }
  `}
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  background: ${props => props.isFavorite 
    ? 'linear-gradient(135deg, #FF6B9D, #f5576c)' 
    : 'transparent'
  };
  border: 2px solid ${props => props.isFavorite ? 'transparent' : 'var(--card-border)'};
  color: ${props => props.isFavorite ? '#fff' : 'var(--text-primary)'};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  svg {
    font-size: 1.2rem;
  }
  
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 4px 16px ${props => 
      props.isFavorite ? 'rgba(255, 107, 157, 0.4)' : 'var(--shadow-sm)'
    };
  }
`;

const StyledDivider = styled(Divider)`
  margin: 48px 0;
  border-color: var(--border-light);
  
  &::before, &::after {
    border-top-color: var(--border-light);
  }
`;

// Generate random review excerpts for demo
const reviewExcerpts = [
  "A masterpiece of sonic innovation that pushes boundaries while maintaining emotional resonance.",
  "This album captures lightning in a bottle - raw, powerful, and utterly unforgettable.",
  "An ambitious work that showcases artistic maturity and fearless experimentation.",
  "Every track is a carefully crafted gem, resulting in a cohesive and compelling listen.",
  "A bold statement that redefines genre conventions and sets new standards.",
  "Breathtaking production meets profound lyricism in this career-defining work.",
];

const genreColors: Record<string, string> = {
  'Rock': 'linear-gradient(135deg, #667eea, #764ba2)',
  'Pop': 'linear-gradient(135deg, #f093fb, #f5576c)',
  'Electronic': 'linear-gradient(135deg, #4e54c8, #8f94fb)',
  'Folk': 'linear-gradient(135deg, #ffecd2, #fcb69f)',
  'Country': 'linear-gradient(135deg, #f7971e, #ffd200)',
  'Metal': 'linear-gradient(135deg, #3f2b96, #a8c0ff)',
  'Rap': 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
  'Experimental': 'linear-gradient(135deg, #c77dff, #00d4ff)',
  'R&B': 'linear-gradient(135deg, #ff6b9d, #c77dff)',
  'Pop/R&B': 'linear-gradient(135deg, #ff6b9d, #c77dff)',
  'Default': 'linear-gradient(135deg, #6c63ff, #918eff)',
};

const MagazineListView: React.FC<MagazineListViewProps> = ({ albums, onAlbumClick }) => {
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  const toggleFavorite = (e: React.MouseEvent, albumTitle: string) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(albumTitle)
      ? favorites.filter(f => f !== albumTitle)
      : [...favorites, albumTitle];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <ListContainer>
      {albums.map((album, index) => {
        const isFavorite = favorites.includes(album.title);
        const score = parseFloat(album.score.replace('+', '')) || 8.0;
        const isFeatured = index === 0 && score >= 9.0;
        const layout = isFeatured || index % 3 === 0 ? 'vertical' : 'horizontal';
        const size = isFeatured ? 'large' : 'medium';
        const excerpt = reviewExcerpts[index % reviewExcerpts.length];
        const genreColor = genreColors[album.genre] || genreColors['Default'];
        
        return (
          <React.Fragment key={`${album.title}-${index}`}>
            <ArticleCard featured={isFeatured}>
              <ArticleContent layout={layout}>
                <AlbumArtwork size={size} layout={layout}>
                  {isFeatured && (
                    <FeaturedBadge>
                      <TrophyFilled />
                      Featured
                    </FeaturedBadge>
                  )}
                  <ScoreBadge score={score}>
                    <StarFilled />
                    {album.score}
                  </ScoreBadge>
                  {album.image_url ? (
                    <img 
                      src={album.image_url} 
                      alt={`${album.title} by ${album.artist}`}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: genreColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '4rem',
                    }}>
                      🎵
                    </div>
                  )}
                </AlbumArtwork>
                
                <ContentSection theme={layout}>
                  <TitleSection>
                    <ArticleTitle level={1} featured={isFeatured}>
                      {album.title}
                    </ArticleTitle>
                    <ArtistName>{album.artist}</ArtistName>
                    
                    <MetaInfo>
                      <GenrePill color={genreColor}>
                        {album.genre}
                      </GenrePill>
                      {album.best_new && (
                        <BestNewIndicator>
                          <TrophyFilled />
                          Best New Music
                        </BestNewIndicator>
                      )}
                    </MetaInfo>
                  </TitleSection>
                  
                  <ReviewExcerpt>
                    {excerpt}
                  </ReviewExcerpt>
                  
                  <ActionBar>
                    <ActionButton 
                      variant="primary"
                      icon={<ReadOutlined />}
                      onClick={() => onAlbumClick(album)}
                    >
                      Read Full Review
                    </ActionButton>
                    
                    {album.review_url && (
                      <ActionButton 
                        variant="secondary"
                        icon={<LinkOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(album.review_url, '_blank');
                        }}
                      >
                        View on Pitchfork
                      </ActionButton>
                    )}
                    
                    <FavoriteButton
                      isFavorite={isFavorite}
                      onClick={(e) => toggleFavorite(e, album.title)}
                      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFavorite ? <HeartFilled /> : <HeartOutlined />}
                    </FavoriteButton>
                  </ActionBar>
                </ContentSection>
              </ArticleContent>
            </ArticleCard>
            
            {index < albums.length - 1 && <StyledDivider />}
          </React.Fragment>
        );
      })}
    </ListContainer>
  );
};

export default MagazineListView;

