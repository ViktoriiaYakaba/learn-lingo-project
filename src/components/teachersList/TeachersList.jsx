import React from 'react';
import TeachersFilter from '../teachersFilter/TeaachersFilter';
import style from './TeachersList.module.scss';

const TeachersList = () => {
  return (
    <div className={style.container} >
      <TeachersFilter />
      
    </div>
  )
}

export default TeachersList;
