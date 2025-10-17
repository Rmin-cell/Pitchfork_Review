import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Layout, Typography, message, FloatButton } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Stats from './components/Stats';
import SearchBar from './components/SearchBar';
import AlbumDetailModal from './components/AlbumDetailModal';
import AlbumSkeleton from './components/AlbumSkeleton';
import DarkModeToggle from './components/DarkModeToggle';
import FeaturedAlbumHero from './components/FeaturedAlbumHero';
import GenreSections from './components/GenreSections';
import MagazineListView from './components/MagazineListView';
import AlbumListView from './components/AlbumListView';
import ViewToggle from './components/ViewToggle';
import SurpriseMeButton from './components/SurpriseMeButton';
import { fetchAlbums } from './services/api';
import { Album, AlbumFilters } from './types';

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

const ErrorContainer = styled.div`
  text-align: center;
  padding: 48px 24px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const ResultsCount = styled.div`
  text-align: center;
  margin: 24px 0;
  font-size: 1rem;
  color: #5D6D7E;
  font-weight: 500;
`;

const App: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'list' | 'genre' | 'magazine'>('list');
  
  const [filters, setFilters] = useState<AlbumFilters>({
    searchQuery: '',
    selectedGenre: '',
    showBestNewOnly: false,
    sortBy: 'title',
    sortOrder: 'asc',
  });

  const loadAlbums = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchAlbums();
      setAlbums(data);
      message.success(`Loaded ${data.length} albums successfully!`);
    } catch (err) {
      console.error('Error loading albums:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load albums';
      setError(errorMessage);
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

  const handleAlbumClick = useCallback((album: Album) => {
    setSelectedAlbum(album);
    setModalVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    setSelectedAlbum(null);
  }, []);

  const handleFiltersChange = useCallback((newFilters: AlbumFilters) => {
    setFilters(newFilters);
  }, []);
  
  const handleSurpriseMe = useCallback(() => {
    if (albums.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * albums.length);
    const randomAlbum = albums[randomIndex];
    setSelectedAlbum(randomAlbum);
    setModalVisible(true);
    
    message.success({
      content: `🎲 Surprise! Discover "${randomAlbum.title}"`,
      duration: 3,
    });
  }, [albums]);

  // Filter and sort albums based on current filters
  const filteredAndSortedAlbums = useMemo(() => {
    let result = [...albums];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        album =>
          album.title.toLowerCase().includes(query) ||
          album.artist.toLowerCase().includes(query)
      );
    }

    // Apply genre filter
    if (filters.selectedGenre) {
      result = result.filter(album => album.genre === filters.selectedGenre);
    }

    // Apply "Best New" filter
    if (filters.showBestNewOnly) {
      result = result.filter(album => album.best_new);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'artist':
          comparison = a.artist.localeCompare(b.artist);
          break;
        case 'genre':
          comparison = a.genre.localeCompare(b.genre);
          break;
        case 'score':
          const scoreA = parseFloat(a.score.replace('+', '')) || 0;
          const scoreB = parseFloat(b.score.replace('+', '')) || 0;
          comparison = scoreA - scoreB;
          break;
        default:
          comparison = 0;
      }
      
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [albums, filters]);

  const renderContent = () => {
    if (loading) {
      return <AlbumSkeleton count={12} />;
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

    if (filteredAndSortedAlbums.length === 0) {
      return (
        <ErrorContainer>
          <Title level={3}>No albums match your filters</Title>
          <Paragraph>Try adjusting your search or filter criteria.</Paragraph>
        </ErrorContainer>
      );
    }

    // Show appropriate view based on mode
    if (viewMode === 'genre') {
      return <GenreSections albums={filteredAndSortedAlbums} onAlbumClick={handleAlbumClick} />;
    }
    
    if (viewMode === 'magazine') {
      return <MagazineListView albums={filteredAndSortedAlbums} onAlbumClick={handleAlbumClick} />;
    }

    return (
      <>
        <ResultsCount>
          Showing {filteredAndSortedAlbums.length} of {albums.length} albums
        </ResultsCount>
        <AlbumListView albums={filteredAndSortedAlbums} onAlbumClick={handleAlbumClick} />
      </>
    );
  };

  return (
    <ThemeProvider>
      <AppContainer>
        <DarkModeToggle />
        <Header onRefresh={handleRefresh} loading={loading} albums={albums} />
        <MainContent>
          <Stats albums={albums} loading={loading} />
          
          {!loading && albums.length > 0 && (
            <>
              <FeaturedAlbumHero 
                albums={albums} 
                onViewDetails={handleAlbumClick} 
              />
              
              <SearchBar 
                albums={albums} 
                filters={filters} 
                onFiltersChange={handleFiltersChange} 
              />
              
              <ViewToggle 
                value={viewMode} 
                onChange={setViewMode} 
              />
            </>
          )}
          
          {renderContent()}
        </MainContent>
        
        {!loading && albums.length > 0 && (
          <>
            <FloatButton
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              tooltip="Refresh Albums"
              style={{
                background: 'linear-gradient(135deg, #E2CBDA, #DED5E0)',
                border: 'none',
              }}
            />
            
            <SurpriseMeButton 
              onClick={handleSurpriseMe}
              disabled={loading || albums.length === 0}
            />
          </>
        )}
        
        <AlbumDetailModal
          album={selectedAlbum}
          visible={modalVisible}
          onClose={handleModalClose}
        />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;

