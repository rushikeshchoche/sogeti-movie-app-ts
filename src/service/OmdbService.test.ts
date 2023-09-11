import { afterEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import { Movie, MovieSearchResults } from '../type/Movie';
import { ServerError } from '../type/ServerError';
import { searchMovieById, searchMoviesByTitle } from './OmdbService';

vi.mock('axios');

describe('OmdbService', () => {
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

  const stubMovie: Movie = {
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

  const stubError: ServerError = {
    errorMessage: 'Bad request',
  };

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  describe('searchMoviesByTitle()', () => {
    it('should return search results', async () => {
      vi.mocked(axios, true).get.mockResolvedValueOnce({
        data: stubMovieSearchResults,
      });
      const data = await searchMoviesByTitle('Bridge');
      expect(axios.get).toHaveBeenCalled();
      expect(data).toEqual(stubMovieSearchResults);
    });

    it('should return error', async () => {
      vi.mocked(axios, true).get.mockResolvedValueOnce({
        data: stubError,
      });
      const data = await searchMoviesByTitle('Bridge');
      expect(axios.get).toHaveBeenCalled();
      expect(data).toEqual(stubError);
    });
  });

  describe('searchMovieById()', () => {
    it('should return movie', async () => {
      vi.mocked(axios, true).get.mockResolvedValueOnce({
        data: stubMovie,
      });
      const data = await searchMovieById('tt3896198');
      expect(axios.get).toHaveBeenCalled();
      expect(data).toEqual(stubMovie);
    });

    it('should return error', async () => {
      vi.mocked(axios, true).get.mockResolvedValueOnce({
        data: stubError,
      });
      const data = await searchMovieById('tt3896198');
      expect(axios.get).toHaveBeenCalled();
      expect(data).toEqual(stubError);
    });
  });
});
