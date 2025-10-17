import React from 'react';
import { Modal, Button } from 'antd';
import { 
  StarFilled, 
  LinkOutlined,
  CloseOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { AlbumDetailModalProps } from '../types';

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 0px;
    overflow: hidden;
    background: var(--bg-primary);
    border: 1px solid var(--card-border);
    padding: 0;
  }
  
  .ant-modal-header {
    display: none;
  }
  
  .ant-modal-body {
    padding: 0;
  }
  
  .ant-modal-footer {
    display: none;
  }
  
  .ant-modal-close {
    top: 24px;
    right: 24px;
    color: var(--text-tertiary);
    width: 40px;
    height: 40px;
    
    &:hover {
      color: var(--text-primary);
      background: var(--card-bg-hover);
    }
    
    .ant-modal-close-x {
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
  }
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  min-height: 400px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  background: var(--bg-secondary);
  border-right: 1px solid var(--card-border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  
  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid var(--card-border);
    padding: 24px;
  }
`;

const AlbumCover = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 0px;
  overflow: hidden;
  background: var(--bg-primary);
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
  font-size: 4rem;
  opacity: 0.2;
`;

const RightColumn = styled.div`
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const AlbumInfo = styled.div``;

const AlbumTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const AlbumArtist = styled.p`
  margin: 0 0 32px 0;
  font-size: 1.125rem;
  color: var(--text-secondary);
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
`;

const MetaGrid = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 40px;
`;

const MetaRow = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 16px;
  align-items: center;
`;

const MetaLabel = styled.div`
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  font-weight: 400;
  text-transform: lowercase;
  letter-spacing: 0.05em;
`;

const MetaValue = styled.div`
  font-size: 0.9375rem;
  color: var(--text-primary);
  font-weight: 400;
`;

const ScoreBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  border-radius: 0px;
  background: transparent;
  border: 1px solid var(--text-primary);
  color: var(--text-primary);
  font-weight: 500;
  font-size: 1.125rem;
`;

const BestNewBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 400;
  border-radius: 0px;
  border: 1px solid var(--text-primary);
  background: transparent;
  color: var(--text-primary);
  
  .anticon {
    font-size: 0.75rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

const ViewReviewButton = styled(Button)`
  && {
    flex: 1;
    border-radius: 0px;
    height: 48px;
    font-weight: 500;
    font-size: 0.875rem;
    border: 1px solid var(--text-primary);
    background: var(--text-primary);
    color: var(--bg-primary);
    letter-spacing: 0.05em;
    text-transform: lowercase;
    transition: all 0.2s ease;
    
    &:hover {
      background: transparent;
      color: var(--text-primary);
      border-color: var(--text-primary);
      transform: translateY(-2px);
    }
  }
`;

const AlbumDetailModal: React.FC<AlbumDetailModalProps> = ({ album, visible, onClose }) => {
  if (!album) return null;

  return (
    <StyledModal
      open={visible}
      onCancel={onClose}
      width={800}
      centered
      closeIcon={<CloseOutlined />}
    >
      <ModalContent>
        <LeftColumn>
          <AlbumCover>
            {album.image_url ? (
              <img src={album.image_url} alt={album.title} />
            ) : (
              <PlaceholderIcon>♪</PlaceholderIcon>
            )}
          </AlbumCover>
        </LeftColumn>
        
        <RightColumn>
          <AlbumInfo>
            <AlbumTitle>{album.title}</AlbumTitle>
            <AlbumArtist>{album.artist}</AlbumArtist>
            
            <MetaGrid>
              <MetaRow>
                <MetaLabel>genre</MetaLabel>
                <MetaValue>{album.genre || '—'}</MetaValue>
              </MetaRow>
              
              <MetaRow>
                <MetaLabel>score</MetaLabel>
                <ScoreBadge>{album.score}</ScoreBadge>
              </MetaRow>
              
              <MetaRow>
                <MetaLabel>status</MetaLabel>
                <div>
                  {album.best_new ? (
                    <BestNewBadge>
                      <StarFilled /> best new
                    </BestNewBadge>
                  ) : (
                    <MetaValue>—</MetaValue>
                  )}
                </div>
              </MetaRow>
            </MetaGrid>
          </AlbumInfo>
          
          {album.review_url && (
            <Actions>
              <ViewReviewButton
                type="default"
                icon={<LinkOutlined />}
                onClick={() => window.open(album.review_url, '_blank')}
              >
                read full review
              </ViewReviewButton>
            </Actions>
          )}
        </RightColumn>
      </ModalContent>
    </StyledModal>
  );
};

export default AlbumDetailModal;
