import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './FullLayout.scss';

export const FullLayout: React.FC = () => {
  return (
    <div className='fullLayout'>
      <div className='headerContainer'>
        <Header />
      </div>
      <div className='contentContainer'>
        <div className='content'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
