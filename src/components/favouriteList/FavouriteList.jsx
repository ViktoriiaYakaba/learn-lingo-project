import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TeachersCard from '../teachersCard/TeachersCard';
import Button from '../button/Button';
import { getAllTeachers } from '../../redux/teachers/operations';
import Loader from '../loader/Loader';
import style from './FavouriteList.module.scss';

const FavouriteList = () => {
    const dispatch = useDispatch();
    const isLoadingTeachers = useSelector(state => state.teachers.isLoading);
    const teachers = useSelector(state => state.teachers.teachers);
    const favoriteList = useSelector(state => state.favorites.favorites); 
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        if (teachers.length === 0) {
            dispatch(getAllTeachers());
        }
    }, [dispatch, teachers]);


    const favoriteTeachers = teachers.filter(teacher => favoriteList.includes(teacher.id));

  
    const noFavoriteTeachers = !isLoadingTeachers && favoriteTeachers.length === 0;

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    if (isLoadingTeachers) {
        return <Loader />; 
    }

    return (
        <div className={style.container}>
            <div className={style.teachersList}>
                {noFavoriteTeachers ? (
                    <p className={style.text}>🌟 You haven't added any teachers to your favorites yet. </p>
                ) : (
                    favoriteTeachers.slice(0, visibleCount).map(teacher => (
                        <TeachersCard 
                            key={teacher.id} 
                            teachers={teacher} 
                        />
                    ))
                )}
            </div>
            {favoriteTeachers.length > visibleCount && (
                <Button onClick={handleLoadMore}>Load More</Button>
            )}
        </div>
    );
}

export default FavouriteList;
