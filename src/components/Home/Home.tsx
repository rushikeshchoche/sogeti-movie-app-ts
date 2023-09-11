import React, { useState } from 'react';
import { useOmdb } from '../../provider/OmdbProvider/OmdbProvider';
import { MovieSearchResults } from '../../type/Movie';
import './Home.scss';
import { StateHandler } from '../StateHandler/StateHandler';
import { Card } from '../Card/Card';
import { Featured } from '../Featured/Featured';
import { BiSearch, BiLoader } from 'react-icons/bi';

export const Home: React.FC = () => {
  const { searchMovies, isLoading, isError } = useOmdb();
  const [searchTitle, setSearchTitle] = useState('');
  const [displaySearchTitle, setDisplaySearchTitle] = useState('');
  const [movieSearhResult, setMovieSearchResult] = useState<MovieSearchResults>();

  const handleSearch = async () => {
    if(!searchTitle) {
      return;
    }
    const movies = await searchMovies(searchTitle);
    setDisplaySearchTitle(searchTitle);
    setMovieSearchResult(movies);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTitle) {
      handleSearch();
    }
  };

  return (
    <div className='home-container' data-testid='home'>
      <div className='search-wrapper'>
        <label>Search your favourite movies</label>
         <div className='search-bar'>
            <input type='text' placeholder='Search movie title...'
              onChange={(e) => setSearchTitle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              data-testid='search-input'
            />
            <button onClick={handleSearch} type='button'>
               {searchTitle && isLoading
                ? <BiLoader className='icon loader-icon' data-testid='loader-icon' />
                : <BiSearch className='icon' data-testid='search-icon' />
               }
            </button>
         </div>
      </div>
      
      <StateHandler loading={isLoading} error={isError}>
        {movieSearhResult && movieSearhResult.Response &&
          <div className='card-container'>
            <strong>Search results for '{ displaySearchTitle }'</strong>
            <div className='card-wrapper'>
              {movieSearhResult.Search.map((movie) => (
                <Card
                  key={movie.imdbID}
                  title={movie.Title}
                  imdbID={movie.imdbID}
                  type={movie.Type}
                  year={movie.Year}
                  poster={movie.Poster}
                ></Card>
              ))}
            </div>
          </div>
        }
      </StateHandler>
      
      <Featured />
    </div>
  );
}
