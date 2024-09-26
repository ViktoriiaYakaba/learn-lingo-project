import React, {useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import style from './NotFoundPage.module.scss';

const NotFoundPage = () => {

  const nav = useNavigate();
  const time = 100000;

   useEffect(() => {
    const index = setTimeout(() => {
      nav('/');
    }, time);
    return () => clearTimeout(index);
  }, [nav]);


  return (
     <div className={style.containerError}>
      <p className={style.text}>The page you are looking for may have been moved, deleted, or possibly never existed</p>
      <p className={style.text}>You will be returned to the main page in {time / 1000} seconds</p>
      <p className={style.text}>Or just click</p>
      <Link to="/" className={style.link}>Back to main page</Link>
    </div>
  )
}

export default NotFoundPage;
