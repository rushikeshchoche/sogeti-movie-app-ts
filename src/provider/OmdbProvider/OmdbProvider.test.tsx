import { afterEach, describe, expect, it, vi } from 'vitest';
import { OmdbProvider, useOmdb } from './OmdbProvider';
import * as OmdbService from '../../service/OmdbService';
import * as Error  from '../../type/ServerError';
import { Movie, MovieSearchResults } from '../../type/Movie';
import { act, renderHook, waitFor } from '@testing-library/react';

vi.mock('../../service/OmdbService');
vi.mock('../../type/ServerError');

describe('OmdbProvider', () => {
  const stubFeaturedMovie: Movie = {
    Title: 'Guardians of the Galaxy Vol. 2',
    Year: '2017',
    Rated: 'PG-13',
    Released: '05 May 2017',
    Genre: 'Action, Adventure, Comedy',
    Director: 'James Gunn',
    Actors: 'Chris Pratt, Zoe Saldana, Dave Bautista',
    Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
    Awards: 'Nominated for 1 Oscar. 15 wins & 60 nominations total',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg',
    imdbID: 'tt3896198',
    Type: 'movie',
  };

  const stubMovieSearchResults: MovieSearchResults = {
    Search: [
      {
        Title: 'Bridge of Spies',
        Year: '2015',
        imdbID: 'tt3682448',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMjIxOTI0MjU5NV5BMl5BanBnXkFtZTgwNzM4OTk4NTE@._V1_SX300.jpg',
      },
      {
        Title: 'The Bridge on the River Kwai',
        Year: '1957',
        imdbID: 'tt0050212',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BOGY5NmNlMmQtYzRlYy00NGQ5LWFkYjYtNzExZmQyMTg0ZDA0XkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg',
      },
    ],
    totalResults: '2',
    Response: 'True',
  };

  const stubError: Error.ServerError = {
    errorMessage: 'Bad request',
  };

  const render = () => {
    const { result, rerender } = renderHook(() => useOmdb(), {
      wrapper: ({ children }) => <OmdbProvider>{children}</OmdbProvider>,
    });

    return {
      result,
      rerender,
    }
  }

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  describe('init', () => {
    it('should load featured movies', async () => {
      // setup
      const mockSearchMovieById = vi.mocked(OmdbService, true).searchMovieById.mockResolvedValue(stubFeaturedMovie);
      const { result, rerender } = render();
  
      // test
      expect(result.current.featuredMovies).toBeUndefined();
      rerender();
      await waitFor(() => {
        expect(mockSearchMovieById).toBeCalledTimes(2);
        expect(result.current.featuredMovies).toEqual([stubFeaturedMovie]);
        expect(result.current.isError).toBeUndefined();
     });
    });

    it('should set error for featured movies', async () => {
      // setup
      const mockSearchMovieById = vi.mocked(OmdbService, true).searchMovieById.mockResolvedValue(stubError);
      const { result, rerender } = render();
      vi.spyOn(Error, 'isServerError').mockReturnValue(true);

      // test
      expect(result.current.featuredMovies).toBeUndefined();
      rerender();
      await waitFor(() => {
        expect(mockSearchMovieById).toBeCalledTimes(2);
        expect(result.current.isError).toEqual(stubError);
     });
    });
  });

  describe('searchMoviesByTitle', () => {
    it('should return search response', async () => {
      // setup
      vi.mocked(OmdbService, true).searchMovieById.mockResolvedValue(stubFeaturedMovie);
      const mockSearchMoviesByTitle = vi.mocked(OmdbService, true).searchMoviesByTitle.mockResolvedValue(stubMovieSearchResults);
      const { result, rerender } = render();
  
      // test
      rerender();
      await act(async () => {
        const response = await result.current.searchMovies('bridge');
        await waitFor(() => {
          expect(mockSearchMoviesByTitle).toBeCalledTimes(1);
          expect(response).toEqual(stubMovieSearchResults);
          expect(result.current.isError).toBeUndefined();
       });
      });
    });

    it('should return undefined', async () => {
      // setup
      vi.mocked(OmdbService, true).searchMovieById.mockResolvedValue(stubError);
      const mockSearchMoviesByTitle = vi.mocked(OmdbService, true).searchMoviesByTitle.mockResolvedValue(stubError);
      const { result, rerender } = render();
      vi.spyOn(Error, 'isServerError').mockReturnValue(true);
  
      // test
      rerender();
      await act(async () => {
        const response = await result.current.searchMovies('bridge');
        expect(mockSearchMoviesByTitle).toBeCalledTimes(1);
        expect(response).toBeUndefined();
      });
    });
  });

  describe('getMovieById', () => {
    it('should return movie', async () => {
      vi.mocked(OmdbService, true).searchMovieById.mockResolvedValue(stubFeaturedMovie);
      const { result, rerender } = render();

      rerender();
      await act(async () => {
        const response = await result.current.getMovieById('tt3682448');
        expect(response).toEqual(stubFeaturedMovie);
        expect(result.current.isError).toBeUndefined();
      })
    });

    it('should return undefined', async () => {
      vi.mocked(OmdbService, true).searchMovieById.mockResolvedValue(stubError);
      vi.spyOn(Error, 'isServerError').mockReturnValue(true);
      const { result, rerender } = render();

      rerender();
      await act(async () => {
        const response = await result.current.getMovieById('tt3682448');
        expect(response).toBeUndefined();
      })
    });
  });
});
