import React from 'react';
import style from './Button.module.scss';

const Button = ({onClick}) => {
  return (
    <>
      <button className={style.button} onClick={onClick}>Load more</button>
    </>
  )
}

export default Button;
