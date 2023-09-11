import React from 'react';
import { useOmdb } from '../../provider/OmdbProvider/OmdbProvider';
import './Featured.scss'
import { ReadMore } from '../ReadMore/ReadMore';
import { Card } from '../Card/Card';

export const Featured: React.FC = () => {
  const { featuredMovies } = useOmdb();
  return (
    <div className='featured-container'>
      <h3>Featured today : </h3>
      <div className='card-wrapper'>
        {featuredMovies && featuredMovies.map((movie) => (
          <div className='movie-item'
            key={movie.imdbID}>
            <Card
              title={movie.Title}
              imdbID={movie.imdbID}
              type={movie.Type}
              year={movie.Year}
              poster={movie.Poster}
            ></Card>
            <div className='movie-details'>
              <ReadMore>{ movie.Plot }</ReadMore>
              <p>Awards : { movie.Awards}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
