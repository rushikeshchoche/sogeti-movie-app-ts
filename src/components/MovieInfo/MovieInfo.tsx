import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOmdb } from '../../provider/OmdbProvider/OmdbProvider';
import { Movie } from '../../type/Movie';
import { StateHandler } from '../StateHandler/StateHandler';
import './MovieInfo.scss';
import { ReadMore } from '../ReadMore/ReadMore';
import { DEFAULT_POSTER } from '../../utils/constants';

export const MovieInfoComponent: React.FC = () => {
  const { id } = useParams();
  const { getMovieById, isLoading, isError } = useOmdb();
  const [movie, setMovie] = useState<Movie>()

  useEffect(() => {
    const getMovie = async (id: string) => {
      const movie = await getMovieById(id);
      setMovie(movie);
    }
    if (!id) {
      return;
    } 
    getMovie(id);
  }, [getMovieById, id]);

  return (
    <div className='movie-info' data-testid='movie-info'>
      <StateHandler loading={isLoading} error={isError}>
        {movie &&
          <>
            <div className='main-info-wrapper'>
              <strong>{ movie.Title } (Released: { movie.Released })</strong>
              <p className='main-info'>{ movie.Year } • { movie.Type } • { movie.Rated }</p>
            </div>
            <div className='extra-info-wrapper'>
              <img src={
                  movie.Poster !== 'N/A'
                  ? movie.Poster
                  : DEFAULT_POSTER
                } alt={movie.Title} />
              <div className='extra-info'>
                <div className='genre'>
                  {movie.Genre.split(',').map((item) => (
                    <span className='genre-item' key={item}>{item}</span>
                  ))}
                </div>
                <p>
                  <ReadMore>{ movie.Plot }</ReadMore>
                </p>
                <p> Director : {  movie.Director }</p>
                <div className='actors-info'>
                  <div> Actors : </div>
                  <div className='actor-details'>
                    {movie.Actors.split(',').map((actor) => (
                      <div className='actor' key={actor}>{actor}</div>
                    ))}
                  </div>
                </div>
                <p>
                  Awards : { movie.Awards}
                </p>
              </div>
            </div>
          </>
        }
      </StateHandler>
    </div>
  );
}
