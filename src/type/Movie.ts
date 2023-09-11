export type MovieMainInfo = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type MovieExtraInfo = {
  Rated: string;
  Released: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Awards: string;
};

export type Movie = MovieMainInfo & MovieExtraInfo;

export type MovieSearchResults = {
  Search: MovieMainInfo[];
  totalResults: string;
  Response: string;
  Error?: string;
};

export type Plot = 'short' | 'full';
