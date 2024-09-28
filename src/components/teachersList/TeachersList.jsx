import React, {useState, useEffect} from 'react';
import TeachersFilter from '../teachersFilter/TeaachersFilter';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '../../redux/teachers/operations';
import { selectFilteredTeachers } from '../../redux/filters/selectors';
import { clearFilters } from '../../redux/filters/slice';
import { selectSelectedLevel } from '../../redux/filters/selectors';
import TeachersCard from '../teachersCard/TeachersCard';
import Loader from '../loader/Loader';
import Button from '../button/Button';
import style from './TeachersList.module.scss';


const TeachersList = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectFilteredTeachers) || [];
  const selectedLevel = useSelector(selectSelectedLevel);
  const [visibleCount, setVisibleCount] = useState(4);

  const isLoading = useSelector((state) => state.teachers.isLoading);

  useEffect(() => {
        dispatch(getAllTeachers()); 
        dispatch(clearFilters());
  }, [dispatch]);
  
  const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 4); 
  };
  
  return (
        <div className={style.container}>
            <TeachersFilter />
            <div>
                {isLoading ? ( 
                    <Loader />
                ) : items.length > 0 ? (
                    items.slice(0, visibleCount).map((teacher, index) => ( 
                        <TeachersCard 
                            key={index}
                            teachers={teacher} 
                            selectedFilterLevel={selectedLevel} 
                        />
                    ))
                ) : (
                    <p className={style.text}>No teachers found.</p>
                )}
            </div>
            {items.length > visibleCount && (
                <Button onClick={handleLoadMore} className={style.loadMoreButton}>
                    Load more
                </Button>
            )}
        </div>
    );
}

export default TeachersList;
