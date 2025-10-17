import React, { useMemo } from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import styled from 'styled-components';
import { StatsProps } from '../types';

const StatsContainer = styled.div`
  margin-bottom: 80px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px;
  
  @media (max-width: 768px) {
    padding: 0 24px;
    margin-bottom: 60px;
  }
`;

const SectionNumber = styled.div`
  font-size: 6rem;
  font-weight: 300;
  color: var(--text-tertiary);
  opacity: 0.3;
  line-height: 0.8;
  margin-bottom: 40px;
  letter-spacing: -0.05em;
  
  @media (max-width: 768px) {
    font-size: 4rem;
    margin-bottom: 24px;
  }
`;

const StatCard = styled(Card)`
  background: transparent;
  border: 1px solid var(--card-border);
  border-radius: 0px;
  box-shadow: none;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--text-primary);
  }
  
  .ant-card-body {
    padding: 32px;
  }
  
  .ant-statistic-title {
    color: var(--text-tertiary);
    font-size: 0.8125rem;
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: 0.05em;
    margin-bottom: 16px;
  }
  
  .ant-statistic-content {
    color: var(--text-primary);
    font-weight: 500;
    font-size: 3rem;
  }
  
  .anticon {
    display: none;
  }
`;

const Stats: React.FC<StatsProps> = ({ albums, loading }) => {
  const stats = useMemo(() => {
    if (!albums || albums.length === 0) {
      return { total: 0, bestNew: 0, averageScore: 0 };
    }
    
    const total = albums.length;
    const bestNew = albums.filter(album => album.best_new).length;
    
    // Calculate average score
    const scores = albums
      .map(album => parseFloat(album.score.replace('+', '')))
      .filter(score => !isNaN(score));
    const averageScore = scores.length > 0
      ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1)
      : 0;
    
    return { total, bestNew, averageScore };
  }, [albums]);

  if (loading) {
    return null;
  }

  return (
    <StatsContainer>
      <SectionNumber>01</SectionNumber>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <StatCard>
            <Statistic
              title="total albums"
              value={stats.total}
            />
          </StatCard>
        </Col>
        <Col xs={24} sm={8}>
          <StatCard>
            <Statistic
              title="best new"
              value={stats.bestNew}
            />
          </StatCard>
        </Col>
        <Col xs={24} sm={8}>
          <StatCard>
            <Statistic
              title="avg score"
              value={stats.averageScore}
              precision={1}
            />
          </StatCard>
        </Col>
      </Row>
    </StatsContainer>
  );
};

export default Stats;
