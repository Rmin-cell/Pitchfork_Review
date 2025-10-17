import React, { useState } from 'react';
import { Modal, Typography, Tag, Button, Space, Divider } from 'antd';
import { 
  CloseOutlined, 
  StarOutlined, 
  TrophyOutlined, 
  LinkOutlined,
  CustomerServiceOutlined 
} from '@ant-design/icons';
import styled from 'styled-components';
import { AlbumDetailModalProps } from '../types';

const { Title, Text } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 24px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
  }
  
  .ant-modal-header {
    background: transparent;
    border-bottom: 1px solid rgba(226, 203, 218, 0.2);
  }
  
  .ant-modal-body {
    padding: 32px;
  }
  
  .ant-modal-footer {
    border-top: 1px solid rgba(226, 203, 218, 0.2);
    background: transparent;
  }
`;

const AlbumCover = styled.div`
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1;
  margin: 0 auto 24px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #E2CBDA, #DED5E0);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(226, 203, 218, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AlbumTitle = styled(Title)`
  margin: 0 0 8px 0 !important;
  font-family: 'Playfair Display', serif !important;
  font-size: 2rem !important;
  font-weight: 700 !important;
  color: #2C3E50 !important;
  text-align: center;
`;

const AlbumArtist = styled(Text)`
  display: block;
  font-size: 1.25rem;
  color: #5D6D7E;
  font-weight: 500;
  text-align: center;
  margin-bottom: 24px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

const InfoLabel = styled(Text)`
  font-weight: 600;
  color: #2C3E50;
  font-size: 0.9rem;
`;

const ScoreDisplay = styled.div<{ score: number }>`
  display: inline-block;
  background: ${props => {
    if (props.score >= 9.0) return '#D3F3F1';
    if (props.score >= 8.5) return '#E9B7CE';
    return '#D7E9EB';
  }};
  color: #2C3E50;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(226, 203, 218, 0.2);
`;

const GenreTag = styled(Tag)`
  border-radius: 16px;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 8px 16px;
  background: rgba(226, 203, 218, 0.3);
  color: #2C3E50;
  border: 1px solid rgba(226, 203, 218, 0.5);
`;

const BestNewBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(211, 243, 241, 0.9);
  color: #2C3E50;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(211, 243, 241, 0.5);
`;

const ViewReviewButton = styled(Button)`
  background: linear-gradient(135deg, #E2CBDA, #DED5E0);
  border: none;
  color: #2C3E50;
  height: 48px;
  padding: 0 32px;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(226, 203, 218, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #E5C1D4, #E2CBDA);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(226, 203, 218, 0.4);
    color: #2C3E50;
  }
`;

const AlbumDetailModal: React.FC<AlbumDetailModalProps> = ({ album, visible, onClose }) => {
  const [imageError, setImageError] = useState(false);
  
  if (!album) return null;
  
  const scoreValue = parseFloat(album.score.replace('+', '')) || 8.0;
  
  const handleViewReview = () => {
    if (album.review_url) {
      window.open(album.review_url, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <StyledModal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      closeIcon={<CloseOutlined />}
      centered
    >
      <AlbumCover>
        {album.image_url && !imageError ? (
          <img 
            src={album.image_url} 
            alt={`${album.title} by ${album.artist}`}
            onError={() => setImageError(true)}
          />
        ) : (
          <CustomerServiceOutlined style={{ fontSize: '4rem', color: '#4D4D4D' }} />
        )}
      </AlbumCover>
      
      <AlbumTitle level={2}>
        {album.title}
      </AlbumTitle>
      
      <AlbumArtist>
        {album.artist}
      </AlbumArtist>
      
      <Divider style={{ margin: '24px 0' }} />
      
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <InfoRow>
          <InfoLabel>
            <StarOutlined /> Score
          </InfoLabel>
          <ScoreDisplay score={scoreValue}>
            {album.score}
          </ScoreDisplay>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>Genre</InfoLabel>
          <GenreTag>{album.genre}</GenreTag>
        </InfoRow>
        
        {album.best_new && (
          <InfoRow>
            <InfoLabel>Recognition</InfoLabel>
            <BestNewBadge>
              <TrophyOutlined />
              Best New Album
            </BestNewBadge>
          </InfoRow>
        )}
        
        <Divider style={{ margin: '8px 0' }} />
        
        {album.review_url && (
          <ViewReviewButton
            block
            icon={<LinkOutlined />}
            onClick={handleViewReview}
          >
            Read Full Review on Pitchfork
          </ViewReviewButton>
        )}
      </Space>
    </StyledModal>
  );
};

export default AlbumDetailModal;

