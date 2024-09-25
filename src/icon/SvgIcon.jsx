import React from 'react';
import sprite from '../assets/icon/sprite.svg';


const SvgIcon = ({ width, height, icon }) => {
  return (
    <svg width={width} height={height}>
      <use href={`${sprite}#${icon}`}></use>
    </svg>
  );
};

export default SvgIcon;
