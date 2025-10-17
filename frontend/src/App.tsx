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
  padding: 0;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  background: transparent;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 80px 40px;
  background: transparent;
  max-width: 1200px;
  margin: 0 auto;
`;

const ResultsCount = styled.div`
  text-align: center;
  margin: 40px 0 60px;
  font-size: 0.875rem;
  color: var(--text-tertiary);
  font-weight: 300;
  text-transform: lowercase;
  letter-spacing: 0.05em;
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
          <Title level={3} style={{ color: 'var(--text-primary)', fontWeight: 300, fontSize: '2rem' }}>
            something went wrong
          </Title>
          <Paragraph style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>{error}</Paragraph>
        </ErrorContainer>
      );
    }

    if (albums.length === 0) {
      return (
        <ErrorContainer>
          <Title level={3} style={{ fontWeight: 300, fontSize: '2rem' }}>no albums found</Title>
          <Paragraph style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>try refreshing</Paragraph>
        </ErrorContainer>
      );
    }

    if (filteredAndSortedAlbums.length === 0) {
      return (
        <ErrorContainer>
          <Title level={3} style={{ fontWeight: 300, fontSize: '2rem' }}>no results</Title>
          <Paragraph style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>adjust your filters</Paragraph>
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
              tooltip="refresh"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '0px',
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

