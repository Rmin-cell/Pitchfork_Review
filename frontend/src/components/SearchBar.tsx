import React, { useMemo } from 'react';
import { Input, Select, Row, Col, Switch, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SearchBarProps } from '../types';

const { Text } = Typography;

const SearchBarContainer = styled.div`
  background: transparent;
  border-top: 1px solid var(--card-border);
  border-bottom: 1px solid var(--card-border);
  padding: 40px;
  margin-bottom: 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    padding: 24px;
    margin-bottom: 40px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--text-primary);
  margin: 0 0 32px 0;
  letter-spacing: -0.01em;
`;

const StyledInput = styled(Input)`
  border-radius: 0px;
  padding: 14px 16px;
  font-size: 0.9375rem;
  font-weight: 300;
  border: 1px solid var(--card-border);
  background: transparent;
  color: var(--text-primary);
  
  &::placeholder {
    color: var(--text-tertiary);
    font-weight: 300;
  }
  
  &:hover {
    border-color: var(--text-primary);
    background: transparent;
  }
  
  &:focus {
    border-color: var(--text-primary);
    box-shadow: none;
    background: transparent;
  }
  
  .ant-input-prefix {
    color: var(--text-tertiary);
    margin-right: 12px;
  }
`;

const StyledSelect = styled(Select)`
  .ant-select-selector {
    border-radius: 0px !important;
    padding: 6px 16px !important;
    border: 1px solid var(--card-border) !important;
    background: transparent !important;
    min-height: 48px !important;
    font-weight: 300 !important;
    
    &:hover {
      border-color: var(--text-primary) !important;
    }
  }
  
  .ant-select-selection-item {
    color: var(--text-primary) !important;
  }
  
  .ant-select-selection-placeholder {
    color: var(--text-tertiary) !important;
  }
  
  &.ant-select-focused .ant-select-selector {
    border-color: var(--text-primary) !important;
    box-shadow: none !important;
  }
  
  .ant-select-arrow {
    color: var(--text-tertiary);
  }
`;

const FilterLabel = styled(Text)`
  display: block;
  margin-bottom: 12px;
  font-weight: 300;
  color: var(--text-tertiary);
  font-size: 0.8125rem;
  text-transform: lowercase;
  letter-spacing: 0.05em;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .ant-switch {
    background-color: var(--card-border);
  }
  
  .ant-switch-checked {
    background-color: var(--text-primary);
  }
`;

const SearchBar: React.FC<SearchBarProps> = ({ albums, filters, onFiltersChange }) => {
  const genres = useMemo(() => {
    const uniqueGenres = Array.from(new Set(albums.map(album => album.genre)))
      .filter(genre => genre && genre.trim() !== '')
      .sort();
    return uniqueGenres;
  }, [albums]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, searchQuery: e.target.value });
  };

  const handleGenreChange = (value: unknown) => {
    onFiltersChange({ ...filters, selectedGenre: value as string });
  };

  const handleBestNewToggle = (checked: boolean) => {
    onFiltersChange({ ...filters, showBestNewOnly: checked });
  };

  const handleSortByChange = (value: unknown) => {
    onFiltersChange({ ...filters, sortBy: value as 'title' | 'artist' | 'score' | 'genre' });
  };

  const handleSortOrderChange = (value: unknown) => {
    onFiltersChange({ ...filters, sortOrder: value as 'asc' | 'desc' });
  };

  return (
    <SearchBarContainer>
      <SectionTitle>filter & search</SectionTitle>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <FilterLabel>search</FilterLabel>
          <StyledInput
            placeholder="search by title or artist"
            prefix={<SearchOutlined />}
            value={filters.searchQuery}
            onChange={handleSearchChange}
            allowClear
          />
        </Col>
        
        <Col xs={24} md={12}>
          <FilterLabel>genre</FilterLabel>
          <StyledSelect
            style={{ width: '100%' }}
            placeholder="all genres"
            value={filters.selectedGenre || undefined}
            onChange={handleGenreChange}
            allowClear
          >
            {genres.map(genre => (
              <Select.Option key={genre} value={genre}>
                {genre}
              </Select.Option>
            ))}
          </StyledSelect>
        </Col>
        
        <Col xs={24} sm={8}>
          <FilterLabel>sort by</FilterLabel>
          <StyledSelect
            style={{ width: '100%' }}
            value={filters.sortBy}
            onChange={handleSortByChange}
          >
            <Select.Option value="title">title</Select.Option>
            <Select.Option value="artist">artist</Select.Option>
            <Select.Option value="score">score</Select.Option>
            <Select.Option value="genre">genre</Select.Option>
          </StyledSelect>
        </Col>
        
        <Col xs={24} sm={8}>
          <FilterLabel>order</FilterLabel>
          <StyledSelect
            style={{ width: '100%' }}
            value={filters.sortOrder}
            onChange={handleSortOrderChange}
          >
            <Select.Option value="asc">ascending</Select.Option>
            <Select.Option value="desc">descending</Select.Option>
          </StyledSelect>
        </Col>
        
        <Col xs={24} sm={8}>
          <FilterLabel>best new only</FilterLabel>
          <SwitchContainer>
            <Switch
              checked={filters.showBestNewOnly}
              onChange={handleBestNewToggle}
            />
            <Text style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', fontWeight: 300 }}>
              {filters.showBestNewOnly ? 'on' : 'off'}
            </Text>
          </SwitchContainer>
        </Col>
      </Row>
    </SearchBarContainer>
  );
};

export default SearchBar;
