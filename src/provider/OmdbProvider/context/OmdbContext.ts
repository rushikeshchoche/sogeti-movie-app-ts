import React from 'react';
import { Movie, MovieSearchResults } from '../../../type/Movie';
import { ServerError } from '../../../type/ServerError';

export type OmdbContextType = {
  featuredMovies: Movie[] | undefined;
  getMovieById: (id: string) => Promise<Movie | undefined>;
  searchMovies: (title: string) => Promise<MovieSearchResults | undefined>;
  isLoading: boolean;
  isError: ServerError | undefined;
};

export const OmdbContext = React.createContext<OmdbContextType>({
  featuredMovies: undefined,
  getMovieById: () => {
    return Promise.resolve(undefined);
  },
  searchMovies: () => {
    return Promise.resolve(undefined);
  },
  isLoading: false,
  isError: undefined,
});
