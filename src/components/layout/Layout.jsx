import React, { Suspense } from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router-dom';
import Loader from '../loader/Loader';
import styled from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styled.container}>
          <Header />
          <Suspense fallback={<Loader/> }>
              <Outlet />
          </Suspense>
    </div>
  )
}

export default Layout;
