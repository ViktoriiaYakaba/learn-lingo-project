import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import { Toaster } from "react-hot-toast";
import PrivateRoute from './PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage'));
const TeachersPage = lazy(() => import('../pages/TeacherPage'));
const FavouritePage = lazy(() => import('../pages/FavouritPage'));
const NotFoundPage = lazy(() => import('../pages/notFoundPage/NotFoundPage'));

const App = () => {
 

  return (
   <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route
                path="/favorites"
                element={
                  <PrivateRoute redirectTo="/" component={<FavouritePage />} />
                }
              />
          <Route path="*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
      <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 4000,
              style: {
                background: "#fff",
                color: "#363636",
              },
            }}
          />
   </>
  )
}

export default App;
