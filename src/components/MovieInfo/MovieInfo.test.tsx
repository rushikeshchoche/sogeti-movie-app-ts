import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as useOmdbHooks from '../../provider/OmdbProvider/OmdbProvider';
import { Movie } from '../../type/Movie';
import { MovieInfoComponent } from './MovieInfo';

vi.mock('../StateHandler/StateHandler');

describe('MovieInfoComponent', () => {
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

  useOmdbSpy.mockReturnValue({
    searchMovies: vi.fn().mockResolvedValue(undefined),
    featuredMovies: undefined,
    getMovieById: vi.fn().mockResolvedValue(stubFeaturedMovie),
    isError: undefined,
    isLoading: false,
  });

  it('should render the component', () => {
    const { getByTestId } = render(<MovieInfoComponent />);
    expect(getByTestId('movie-info')).toBeVisible();
  });
})