export interface Album {
  title: string;
  artist: string;
  genre: string;
  score: string;
  best_new: boolean;
  image_url?: string;
  review_url?: string;
}

export interface AlbumFilters {
  searchQuery: string;
  selectedGenre: string;
  showBestNewOnly: boolean;
  sortBy: "title" | "artist" | "score" | "genre";
  sortOrder: "asc" | "desc";
}

export interface AlbumCardProps {
  album: Album;
  onClick?: (album: Album) => void;
}

export interface AlbumGridProps {
  albums: Album[];
  onAlbumClick?: (album: Album) => void;
}

export interface HeaderProps {
  onRefresh: () => void;
  loading: boolean;
  albums?: Album[];
}

export interface StatsProps {
  albums: Album[];
  loading: boolean;
}

export interface SearchBarProps {
  albums: Album[];
  filters: AlbumFilters;
  onFiltersChange: (filters: AlbumFilters) => void;
}

export interface AlbumDetailModalProps {
  album: Album | null;
  visible: boolean;
  onClose: () => void;
}
