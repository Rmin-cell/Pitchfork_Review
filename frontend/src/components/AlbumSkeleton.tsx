import React from 'react';
import { Card, Skeleton, Row, Col } from 'antd';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 203, 218, 0.3);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(226, 203, 218, 0.15);
  
  .ant-card-body {
    padding: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const SkeletonArtwork = styled(Skeleton.Image)`
  width: 100% !important;
  aspect-ratio: 1;
  border-radius: 16px;
  margin-bottom: 20px;
  
  .ant-skeleton-image {
    width: 100% !important;
    height: 100% !important;
    border-radius: 16px;
  }
`;

interface AlbumSkeletonProps {
  count?: number;
}

const AlbumSkeleton: React.FC<AlbumSkeletonProps> = ({ count = 8 }) => {
  return (
    <Row gutter={[24, 24]}>
      {Array.from({ length: count }).map((_, index) => (
        <Col 
          key={`skeleton-${index}`}
          xs={24} 
          sm={12} 
          md={8} 
          lg={6}
        >
          <StyledCard>
            <SkeletonArtwork active />
            <Skeleton 
              active 
              title={{ width: '100%' }}
              paragraph={{ 
                rows: 2,
                width: ['80%', '60%']
              }}
            />
          </StyledCard>
        </Col>
      ))}
    </Row>
  );
};

export default AlbumSkeleton;

