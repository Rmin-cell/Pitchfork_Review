import React from 'react';
import { Row, Col } from 'antd';
import AlbumCard from './AlbumCard';
import styled from 'styled-components';
import { AlbumGridProps } from '../types';

const GridContainer = styled.div`
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AlbumGrid: React.FC<AlbumGridProps> = ({ albums, onAlbumClick }) => {
  return (
    <GridContainer>
      <Row gutter={[24, 24]}>
        {albums.map((album, index) => (
          <Col 
            key={`${album.title}-${album.artist}-${index}`}
            xs={24} 
            sm={12} 
            md={8} 
            lg={6}
            className="fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <AlbumCard album={album} onClick={onAlbumClick} />
          </Col>
        ))}
      </Row>
    </GridContainer>
  );
};

export default AlbumGrid;

