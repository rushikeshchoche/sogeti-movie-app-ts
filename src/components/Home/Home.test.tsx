import { describe, it, expect } from 'vitest';
import { act, fireEvent, render } from '@testing-library/react';
import * as useOmdbHooks from '../../provider/OmdbProvider/OmdbProvider';
import { Home } from './Home';
import { Movie, MovieSearchResults } from '../../type/Movie';

vi.mock('../Card/Card');
vi.mock('../Featured/Featured');

describe('Home', () => {
  const useOmdbSpy = vi.spyOn(useOmdbHooks, 'useOmdb');

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

  useOmdbSpy.mockReturnValue({
    searchMovies: vi.fn().mockResolvedValue(stubMovieSearchResults),
    featuredMovies: [stubFeaturedMovie],
    getMovieById: vi.fn().mockResolvedValue(stubFeaturedMovie),
    isError: undefined,
    isLoading: false,
  });

  it('should render the component', () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('home')).toBeVisible();
  });

  it('should display search button', () => {
    const { getByTestId } = render(<Home />);
    const searchInput = getByTestId('search-input');
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'states' } });
      expect(searchInput).toBeVisible();
      expect(getByTestId('search-icon')).toBeVisible();
    })
  });
})