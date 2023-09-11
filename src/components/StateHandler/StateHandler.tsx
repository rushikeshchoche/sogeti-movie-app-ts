import React, { PropsWithChildren } from 'react';
import { ServerError } from '../../type/ServerError';
import { BiLoader } from 'react-icons/bi';
import './StateHandler.scss';

export type Props = {
  loading: boolean;
  error: ServerError | undefined;
}

export const StateHandler: React.FC<PropsWithChildren<Props>> = ({
  loading,
  error,
  children,
}) => {
  if (loading) {
    return (
      <div className='loader-container'>
        <BiLoader className='loader' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='error'>
        <span>{error.errorMessage}</span>
      </div>
    );
  }
  
  return children;
}
