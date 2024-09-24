import React from 'react';
import styled from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styled.loaderContainer}>
    <div className={styled.loader}></div> 
    </div>
  )
}

export default Loader;
