import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Typography, Spin, message, FloatButton } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Header from './components/Header';
import Stats from './components/Stats';
import AlbumGrid from './components/AlbumGrid';
import { fetchAlbums } from './services/api';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AppContainer = styled(Layout)`
  min-height: 100vh;
  background: transparent;
`;

const MainContent = styled(Content)`
  padding: 80px 40px;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  background: transparent;
  
  @media (max-width: 1200px) {
    padding: 60px 32px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  flex-direction: column;
  gap: 16px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 48px 24px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAlbums = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchAlbums();
      setAlbums(data);
      message.success(`Loaded ${data.length} albums successfully!`);
    } catch (err) {
      console.error('Error loading albums:', err);
      setError(err.message || 'Failed to load albums');
      message.error('Failed to load albums. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

  const handleRefresh = useCallback(() => {
    loadAlbums();
  }, [loadAlbums]);

  const renderContent = () => {
    if (loading) {
      return (
        <LoadingContainer>
          <Spin size="large" />
          <Paragraph>Loading albums...</Paragraph>
        </LoadingContainer>
      );
    }

    if (error) {
      return (
        <ErrorContainer>
          <Title level={3} style={{ color: '#f44336' }}>
            Oops! Something went wrong
          </Title>
          <Paragraph>{error}</Paragraph>
        </ErrorContainer>
      );
    }

    if (albums.length === 0) {
      return (
        <ErrorContainer>
          <Title level={3}>No albums found</Title>
          <Paragraph>Please try refreshing the data.</Paragraph>
        </ErrorContainer>
      );
    }

    return <AlbumGrid albums={albums} />;
  };

  return (
    <AppContainer>
      <Header onRefresh={handleRefresh} loading={loading} />
      <MainContent>
        <Stats albums={albums} loading={loading} />
        {renderContent()}
      </MainContent>
      <FloatButton
        icon={<ReloadOutlined />}
        onClick={handleRefresh}
        disabled={loading}
        tooltip="Refresh Albums"
        style={{
          background: 'linear-gradient(135deg, #E2CBDA, #DED5E0)',
          border: 'none',
        }}
      />
    </AppContainer>
  );
};

export default App;

