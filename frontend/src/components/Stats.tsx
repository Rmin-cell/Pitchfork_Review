import React, { useMemo } from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { TrophyOutlined, StarOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { StatsProps } from '../types';

const StatsContainer = styled.div`
  margin-bottom: 40px;
`;

const StatCard = styled(Card)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 203, 218, 0.3);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(226, 203, 218, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(226, 203, 218, 0.25);
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(226, 203, 218, 0.5);
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
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <StatCard>
            <Statistic
              title="High-Scoring Albums"
              value={stats.total}
              prefix={<StarOutlined style={{ color: '#E2CBDA' }} />}
              valueStyle={{ color: '#2C3E50', fontSize: '2rem', fontWeight: 700 }}
            />
          </StatCard>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatCard>
            <Statistic
              title="Best New Selections"
              value={stats.bestNew}
              prefix={<TrophyOutlined style={{ color: '#D3F3F1' }} />}
              valueStyle={{ color: '#2C3E50', fontSize: '2rem', fontWeight: 700 }}
            />
          </StatCard>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <StatCard>
            <Statistic
              title="Average Score"
              value={stats.averageScore}
              prefix={<StarOutlined style={{ color: '#E9B7CE' }} />}
              valueStyle={{ color: '#2C3E50', fontSize: '2rem', fontWeight: 700 }}
            />
          </StatCard>
        </Col>
      </Row>
    </StatsContainer>
  );
};

export default Stats;

