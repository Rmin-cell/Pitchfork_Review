import React from 'react';
import { Modal, Typography, Button } from 'antd';
import { 
  StarFilled, 
  LinkOutlined 
} from '@ant-design/icons';
import styled from 'styled-components';
import { AlbumDetailModalProps } from '../types';

const { Title, Text } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 0px;
    overflow: hidden;
    background: var(--bg-primary);
    border: 1px solid var(--card-border);
  }
  
  .ant-modal-header {
    background: transparent;
    border-bottom: 1px solid var(--card-border);
    padding: 24px 32px;
  }
  
  .ant-modal-title {
    color: var(--text-primary);
    font-weight: 300;
    font-size: 1.5rem;
  }
  
  .ant-modal-body {
    padding: 32px;
  }
  
  .ant-modal-footer {
    border-top: 1px solid var(--card-border);
    background: transparent;
    padding: 16px 32px;
  }
  
  .ant-modal-close {
    color: var(--text-tertiary);
    
    &:hover {
      color: var(--text-primary);
    }
  }
`;

const AlbumCover = styled.div`
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1;
  margin: 0 auto 32px;
  border-radius: 0px;
  overflow: hidden;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--card-border);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceholderIcon = styled.div`
  font-size: 5rem;
  opacity: 0.2;
`;

const AlbumTitle = styled(Title)`
  margin: 0 0 12px 0 !important;
  font-size: 2rem !important;
  font-weight: 300 !important;
  color: var(--text-primary) !important;
  text-align: center;
  letter-spacing: -0.02em;
`;

const AlbumArtist = styled(Text)`
  display: block;
  font-size: 1.125rem;
  color: var(--text-secondary);
  font-weight: 300;
  text-align: center;
  margin-bottom: 32px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--card-border);
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled(Text)`
  font-weight: 300;
  color: var(--text-tertiary);
  font-size: 0.875rem;
  text-transform: lowercase;
  letter-spacing: 0.05em;
`;

const InfoValue = styled(Text)`
  font-weight: 300;
  color: var(--text-primary);
  font-size: 0.9375rem;
`;

const ScoreDisplay = styled.div`
  display: inline-block;
  background: transparent;
  border: 1px solid var(--text-primary);
  color: var(--text-primary);
  padding: 4px 16px;
  border-radius: 0px;
  font-weight: 300;
  font-size: 1.125rem;
`;

const BestNewTag = styled.span`
  border-radius: 0px;
  padding: 4px 12px;
  font-size: 0.875rem;
  font-weight: 300;
  border: 1px solid var(--text-primary);
  background: transparent;
  color: var(--text-primary);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  .anticon {
    font-size: 0.75rem;
  }
`;

const ViewReviewButton = styled(Button)`
  && {
    border-radius: 0px;
    height: 48px;
    font-weight: 300;
    border: 1px solid var(--text-primary);
    background: transparent;
    color: var(--text-primary);
    letter-spacing: 0.02em;
    
    &:hover {
      background: var(--text-primary);
      color: var(--bg-primary);
      border-color: var(--text-primary);
    }
  }
`;

const AlbumDetailModal: React.FC<AlbumDetailModalProps> = ({ album, visible, onClose }) => {
  if (!album) return null;

  return (
    <StyledModal
      title="album details"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={560}
      centered
    >
      <AlbumCover>
        {album.image_url ? (
          <img src={album.image_url} alt={album.title} />
        ) : (
          <PlaceholderIcon>♪</PlaceholderIcon>
        )}
      </AlbumCover>
      
      <AlbumTitle level={3}>{album.title}</AlbumTitle>
      <AlbumArtist>{album.artist}</AlbumArtist>
      
      <div style={{ marginBottom: '32px' }}>
        <InfoRow>
          <InfoLabel>genre</InfoLabel>
          <InfoValue>{album.genre || '—'}</InfoValue>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>score</InfoLabel>
          <ScoreDisplay>{album.score}</ScoreDisplay>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>best new</InfoLabel>
          <div>
            {album.best_new ? (
              <BestNewTag><StarFilled /> best new</BestNewTag>
            ) : (
              <InfoValue>—</InfoValue>
            )}
          </div>
        </InfoRow>
      </div>
      
      {album.review_url && (
        <ViewReviewButton
          type="default"
          icon={<LinkOutlined />}
          block
          onClick={() => window.open(album.review_url, '_blank')}
        >
          read review on pitchfork
        </ViewReviewButton>
      )}
    </StyledModal>
  );
};

export default AlbumDetailModal;
