interface Poster {
  optimized: {
    preview: string;
    src: string;
    thumbnail: string;
  };
  preview: string;
  src: string;
  thumbnail: string;
}

interface Genre {
  id: number;
  image: {
    optimized: {
      preview: string;
      thumbnail: string;
    };
    preview: string;
    thumbnail: string;
  };
  name: string;
  total_releases: number;
}

export interface Episode {
  id: string;
  name: string;
  ordinal: number;
  ending: {
    start: number;
    end: number;
  };
  opening: {
    start: number;
    end: number;
  };
  preview: {
    preview: string;
    thumbnail: string;
    optimized: {
      preview: string;
      thumbnail: string;
      src: string;
    };
  };
  hls_480: string;
  hls_720: string;
  hls_1080: string;
  duration: number;
  rutube_id: string;
  youtube_id: string;
  updated_at: string;
  sort_order: number;
  release_id: number;
  name_english: string;
}

interface AgeRating {
  description: string;
  is_adult: boolean;
  label: string;
  value: string;
}

interface Season {
  value: string;
  description: string;
}

interface TypeInfo {
  description: string;
  value: string;
}

export interface TitleItem {
  id: number;
  name: {
    english: string;
    main: string;
  };
  poster: Poster;
  description: string;
  genres: Genre[];
  episodes_total: number;
  age_rating: AgeRating;
  season: Season;
  type: TypeInfo;
  year: number;
  episodes: Episode[];
}

export interface TitleT {
  data: TitleItem[];
  status?: {
    loading: boolean;
  };
}

export interface TitleDetailT {
  data: TitleItem | null;
  status?: {
    loading: boolean;
  };
}

export interface FracnhisesT {
  first_year: number;
  last_year: number;
  franchise_releases: [
    {
      franchise_id: string;
      id: string;
      release: TitleItem;
      release_id: number;
      sort_order: number;
    }
  ];
  image: {
    preview: string;
    thumbnail: string;
    optimized: {
      preview: string;
      thumbnail: string;
    };
  };
  name: string;
  name_english: string;
  total_duration: string;
  total_duration_in_seconds: number;
  total_episodes: number;
  total_releases: number;
}

export interface SearchT {
  list: TitleItem[];
  status?: {
    loading: boolean;
  };
  filters: {
    query: string;
  };
}
