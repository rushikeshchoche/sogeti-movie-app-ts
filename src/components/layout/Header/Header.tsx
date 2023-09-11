import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { Path } from '../../../type/Path';

export const Header: React.FC = () => {
  return (
    <div className='header'>
      <nav>
        <Link to={Path.default} className='link'>
          Home
        </Link>
      </nav>
    </div>
  );
}
