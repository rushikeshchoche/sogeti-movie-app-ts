import React, { useCallback, useContext, useState, useEffect } from 'react';
import { DEFAULT_MOVIE_IDS } from '../../utils/constants';
import { searchMovieById, searchMoviesByTitle } from '../../service/OmdbService';
import { Movie } from '../../type/Movie';
import { isServerError, ServerError } from '../../type/ServerError';
import { OmdbContext } from './context/OmdbContext';

type Props = {
  children: React.ReactNode;
};

export const OmdbProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState<ServerError>();
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>();

  const getFeaturedMovies = useCallback(async () => {
    setError(undefined);
    setLoading(true);
    Promise.all(
      DEFAULT_MOVIE_IDS.map((id) => searchMovieById(id))
    ).then(([...movies]) => {
      setLoading(false);
      movies.forEach((movie) => {
        if (isServerError(movie)) {
          setError(movie);
          return;
        }
        setFeaturedMovies((featuredMovies) => {
          if (!featuredMovies || !featuredMovies.length) return [movie];
          const exists = featuredMovies.find(({imdbID}) => imdbID === movie.imdbID)
          if (exists) return featuredMovies;
          return [...featuredMovies, movie];
        });
      });
    });
  }, []);

  const getMovieById = useCallback(async (id: string) => {
    setError(undefined);
    setLoading(true);
    const searchResponse = await searchMovieById(id);
    setLoading(false);
    if (isServerError(searchResponse)) {
      setError(() => searchResponse);
      return;
    }
    return searchResponse;
  }, []);

  const searchMovies = useCallback(async (
    title: string) => {
      setError(undefined);
      setLoading(true);
      const searchResponse = await searchMoviesByTitle(title);
      setLoading(false);
      if (isServerError(searchResponse)) {
        setError(searchResponse);
        return;
      }
      return searchResponse;
    }, []);

  /**
   * init featured movies
   */
  useEffect(() => {
    getFeaturedMovies();
  }, [getFeaturedMovies]);

  const omdbContext = React.useMemo(
    () => ({
      featuredMovies,
      getMovieById,
      searchMovies,
      isLoading,
      isError
    }),
    [featuredMovies, getMovieById, searchMovies, isLoading, isError]
  );

  return (
    <OmdbContext.Provider value={omdbContext}>
      {children}
    </OmdbContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOmdb = () => useContext(OmdbContext);
