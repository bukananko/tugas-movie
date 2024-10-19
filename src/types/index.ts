export type Movies = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieDetail[];
  total_pages: number;
  total_results: number;
};

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type OutletContextProps = {
  isFavMoviesLoading: boolean;
  favMovies: MovieDetail[];
  sessionId: string | null;
};
