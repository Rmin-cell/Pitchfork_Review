import React from 'react';
import { Row, Col } from 'antd';
import AlbumCard from './AlbumCard';
import styled from 'styled-components';

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

const AlbumGrid = ({ albums }) => {
  return (
    <GridContainer>
      <Row gutter={[16, 16]}>
        {albums.map((album, index) => (
          <Col 
            key={`${album.title}-${album.artist}-${index}`}
            xs={24} 
            sm={12} 
            md={8} 
            lg={6}
            className="fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <AlbumCard album={album} />
          </Col>
        ))}
      </Row>
    </GridContainer>
  );
};

export default AlbumGrid;

