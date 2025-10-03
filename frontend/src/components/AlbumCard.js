import React from 'react';
import { Card, Tag, Typography, Badge } from 'antd';
import { CustomerServiceOutlined, StarOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 203, 218, 0.3);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(226, 203, 218, 0.15);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 60px rgba(226, 203, 218, 0.25);
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(226, 203, 218, 0.5);
  }
  
  .ant-card-body {
    padding: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
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
  }
  
  ${StyledCard}:hover &::before {
    opacity: 1;
  }
`;

const ScoreDisplay = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${props => {
    if (props.score >= 9.0) return '#D3F3F1';
    if (props.score >= 8.5) return '#E9B7CE';
    return '#D7E9EB';
  }};
  color: #2C3E50;
  padding: 8px 16px;
  border-radius: 24px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(226, 203, 218, 0.2);
  transition: all 0.3s ease;
  
  ${StyledCard}:hover & {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(226, 203, 218, 0.3);
  }
`;

const BestNewBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(211, 243, 241, 0.9);
  color: #2C3E50;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(211, 243, 241, 0.5);
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
  color: #2C3E50 !important;
  line-height: 1.3 !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AlbumArtist = styled(Text)`
  font-size: 1rem;
  color: #5D6D7E;
  margin-bottom: 16px;
  display: block;
  font-weight: 500;
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
  background: rgba(226, 203, 218, 0.3);
  color: #2C3E50;
  border: 1px solid rgba(226, 203, 218, 0.5);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    background: rgba(226, 203, 218, 0.4);
  }
`;

const ScoreInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #85929E;
  font-size: 0.8rem;
  font-weight: 500;
`;

const AlbumCard = ({ album }) => {
  const hasBadge = album.best_new;
  const score = parseFloat(album.score.replace('+', '')) || 8.0;
  
  return (
    <StyledCard>
      <AlbumArtwork>
        <CustomerServiceOutlined style={{ fontSize: '3rem', color: '#4D4D4D' }} />
        <ScoreDisplay score={score}>
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
            <StarOutlined style={{ color: '#E2CBDA' }} />
            Pitchfork
          </ScoreInfo>
        </AlbumDetails>
      </CardContent>
    </StyledCard>
  );
};

export default AlbumCard;