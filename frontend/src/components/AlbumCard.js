import React from 'react';
import { Card, Tag, Typography, Badge } from 'antd';
import { CustomerServiceOutlined, StarOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 170, 0.2);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00d4aa, #55efc4, #00d4aa);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(0, 212, 170, 0.4);
  }
  
  .ant-card-body {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const CardContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BestNewBadge = styled(Badge)`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
`;

const AlbumTitle = styled(Title)`
  margin: 0 0 8px 0 !important;
  font-size: 1.3rem !important;
  font-weight: 600 !important;
  color: #333 !important;
  line-height: 1.3 !important;
  padding-right: ${props => props.hasBadge ? '60px' : '0'};
`;

const AlbumArtist = styled(Text)`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 16px;
  display: block;
`;

const AlbumDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: auto;
`;

const GenreTag = styled(Tag)`
  border-radius: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ScoreTag = styled(Tag)`
  background: linear-gradient(135deg, #e91e63, #f06292);
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 16px;
`;

const getGenreColor = (genre) => {
  const colorMap = {
    'Rock': { color: '#c62828', background: '#ffebee' },
    'Pop': { color: '#c2185b', background: '#fce4ec' },
    'Electronic': { color: '#1976d2', background: '#e3f2fd' },
    'Folk': { color: '#2e7d32', background: '#e8f5e8' },
    'Country': { color: '#f57c00', background: '#fff3e0' },
    'Metal': { color: '#d32f2f', background: '#ffebee' },
    'Rap': { color: '#7b1fa2', background: '#f3e5f5' },
    'Experimental': { color: '#00695c', background: '#e0f2f1' },
    'R&B': { color: '#c2185b', background: '#fce4ec' },
  };
  
  return colorMap[genre] || { color: '#666', background: '#f5f5f5' };
};

const AlbumCard = ({ album }) => {
  const genreColors = getGenreColor(album.genre);
  const hasBadge = album.best_new;

  return (
    <StyledCard>
      <CardContent>
        {hasBadge && (
          <BestNewBadge
            count="Best New"
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 8px',
              borderRadius: '12px',
            }}
          />
        )}
        
        <AlbumTitle level={4} hasBadge={hasBadge}>
          <CustomerServiceOutlined style={{ marginRight: 8, color: '#00d4aa' }} />
          {album.title}
        </AlbumTitle>
        
        <AlbumArtist>
          <StarOutlined style={{ marginRight: 8, color: '#fdcb6e' }} />
          {album.artist}
        </AlbumArtist>
        
        <AlbumDetails>
          <GenreTag
            color={genreColors.color}
            style={{
              backgroundColor: genreColors.background,
              borderColor: genreColors.color,
            }}
          >
            {album.genre}
          </GenreTag>
          <ScoreTag>{album.score}</ScoreTag>
        </AlbumDetails>
      </CardContent>
    </StyledCard>
  );
};

export default AlbumCard;

