import React, { PropsWithChildren, useState } from 'react';
import './ReadMore.scss';

export type Props = {
  chars?: number;
}

export const ReadMore: React.FC<PropsWithChildren<Props>> = ({
  chars = 200,
  children,
}) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const childIsString = typeof children === 'string';
  
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  if (!childIsString || (childIsString && children === 'N/A') || (childIsString && children.length <= 200)) {
    return children;
  }

  return (
    <p className='text' data-testid='read-more'>
      {isReadMore ? children.slice(0, chars) : children}
      <span onClick={toggleReadMore} className='read-or-hide' data-testid='read-toggle'>
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </p>
  );
}
