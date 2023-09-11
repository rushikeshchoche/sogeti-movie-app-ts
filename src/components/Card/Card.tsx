import React from 'react';
import './Card.scss';
import { Path } from '../../type/Path';
import { Link } from 'react-router-dom';
import { DEFAULT_POSTER } from '../../utils/constants';

export type Props = {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
}

export const Card: React.FC<Props> = ({
  title,
  year,
  imdbID,
  type,
  poster,
}) => {
  return (
    <div className='card' data-testid='card'>
      <Link to={Path.movieInfo.replace(':id', imdbID)}>
        <img
          src={
            poster !== 'N/A'
              ? poster
              : DEFAULT_POSTER
          }
          alt={title}
        />
        <div className='card-footer'>
          <h3>{ title }</h3>
          <small>{ year + ' | ' + type }</small>
        </div>
      </Link>
  </div>
  );
}