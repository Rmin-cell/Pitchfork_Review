import React from 'react';
import { Input, Select, Switch, Row, Col, Typography } from 'antd';
import { SearchOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SearchBarProps } from '../types';

const { Text } = Typography;

const SearchBarContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 203, 218, 0.3);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(226, 203, 218, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    box-shadow: 0 12px 40px rgba(226, 203, 218, 0.2);
    background: rgba(255, 255, 255, 0.9);
  }
`;

const StyledInput = styled(Input)`
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid rgba(226, 203, 218, 0.3);
  
  &:hover, &:focus {
    border-color: rgba(226, 203, 218, 0.6);
    box-shadow: 0 0 0 2px rgba(226, 203, 218, 0.1);
  }
`;

const StyledSelect = styled(Select)`
  .ant-select-selector {
    border-radius: 12px !important;
    padding: 4px 12px !important;
    border: 1px solid rgba(226, 203, 218, 0.3) !important;
    min-height: 44px !important;
    
    &:hover, &:focus {
      border-color: rgba(226, 203, 218, 0.6) !important;
      box-shadow: 0 0 0 2px rgba(226, 203, 218, 0.1) !important;
    }
  }
`;

const FilterLabel = styled(Text)`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2C3E50;
  font-size: 0.9rem;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
`;

const SearchBar: React.FC<SearchBarProps> = ({ albums, filters, onFiltersChange }) => {
  // Extract unique genres from albums
  const genres = React.useMemo(() => {
    const uniqueGenres = new Set(albums.map(album => album.genre));
    return Array.from(uniqueGenres).sort();
  }, [albums]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchQuery: e.target.value,
    });
  };

  const handleGenreChange = (value: unknown) => {
    onFiltersChange({
      ...filters,
      selectedGenre: value as string,
    });
  };

  const handleSortChange = (value: unknown) => {
    const [sortBy, sortOrder] = (value as string).split('-');
    onFiltersChange({
      ...filters,
      sortBy: sortBy as any,
      sortOrder: sortOrder as 'asc' | 'desc',
    });
  };

  const handleBestNewToggle = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      showBestNewOnly: checked,
    });
  };

  return (
    <SearchBarContainer>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <FilterLabel>
            <SearchOutlined /> Search Albums
          </FilterLabel>
          <StyledInput
            placeholder="Search by title or artist..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            prefix={<SearchOutlined style={{ color: '#5D6D7E' }} />}
            allowClear
          />
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <FilterLabel>
            <FilterOutlined /> Genre
          </FilterLabel>
          <StyledSelect
            style={{ width: '100%' }}
            placeholder="All Genres"
            value={filters.selectedGenre || undefined}
            onChange={handleGenreChange}
            allowClear
          >
            <Select.Option value="">All Genres</Select.Option>
            {genres.map(genre => (
              <Select.Option key={genre} value={genre}>
                {genre}
              </Select.Option>
            ))}
          </StyledSelect>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <FilterLabel>
            <SortAscendingOutlined /> Sort By
          </FilterLabel>
          <StyledSelect
            style={{ width: '100%' }}
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={handleSortChange}
          >
            <Select.Option value="title-asc">Title (A-Z)</Select.Option>
            <Select.Option value="title-desc">Title (Z-A)</Select.Option>
            <Select.Option value="artist-asc">Artist (A-Z)</Select.Option>
            <Select.Option value="artist-desc">Artist (Z-A)</Select.Option>
            <Select.Option value="score-desc">Score (High to Low)</Select.Option>
            <Select.Option value="score-asc">Score (Low to High)</Select.Option>
            <Select.Option value="genre-asc">Genre (A-Z)</Select.Option>
            <Select.Option value="genre-desc">Genre (Z-A)</Select.Option>
          </StyledSelect>
        </Col>
      </Row>
      
      <Row style={{ marginTop: '16px' }}>
        <Col xs={24}>
          <SwitchContainer>
            <Switch
              checked={filters.showBestNewOnly}
              onChange={handleBestNewToggle}
              style={{
                background: filters.showBestNewOnly ? '#D3F3F1' : undefined,
              }}
            />
            <FilterLabel style={{ margin: 0 }}>
              Show "Best New" Only
            </FilterLabel>
          </SwitchContainer>
        </Col>
      </Row>
    </SearchBarContainer>
  );
};

export default SearchBar;

