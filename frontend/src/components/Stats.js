import React, { useMemo } from 'react';
import { Card, Statistic, Row, Col, Typography } from 'antd';
import { TrophyOutlined, StarOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title } = Typography;

const StatsContainer = styled.div`
  margin-bottom: 24px;
`;

const StatCard = styled(Card)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 170, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(0, 212, 170, 0.4);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  }
`;

const Stats = ({ albums, loading }) => {
  const stats = useMemo(() => {
    if (!albums || albums.length === 0) {
      return { total: 0, bestNew: 0 };
    }
    
    return {
      total: albums.length,
      bestNew: albums.filter(album => album.best_new).length,
    };
  }, [albums]);

  if (loading) {
    return null;
  }

  return (
    <StatsContainer>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <StatCard>
            <Statistic
              title="High-Scoring Albums"
              value={stats.total}
              prefix={<StarOutlined style={{ color: '#00d4aa' }} />}
              valueStyle={{ color: '#00d4aa', fontSize: '2rem', fontWeight: 700 }}
            />
          </StatCard>
        </Col>
        <Col xs={24} sm={12}>
          <StatCard>
            <Statistic
              title="Best New Selections"
              value={stats.bestNew}
              prefix={<TrophyOutlined style={{ color: '#fdcb6e' }} />}
              valueStyle={{ color: '#fdcb6e', fontSize: '2rem', fontWeight: 700 }}
            />
          </StatCard>
        </Col>
      </Row>
    </StatsContainer>
  );
};

export default Stats;

