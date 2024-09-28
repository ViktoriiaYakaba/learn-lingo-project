import React, { useState } from 'react';
import SvgIcon from '../../icon/SvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { addFavorite, removeFavorite } from '../../redux/favorites/slice';
import { selectFavorites } from '../../redux/favorites/selectors';
import style from './TeachersCard.module.scss';

const TeachersCard = ({ teachers }) => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites) || [];
  const isAuth = useSelector((state) => state.auth.isAuth);

  const isFavorite = favorites.includes(teachers.id);

  const handleFavoriteToggle = async () => {
    if (!isAuth) {
      toast.error('You must log in to add favorites.', {
        icon: '❗',
      });
      return;
    }

    try {
      if (isFavorite) {
        await dispatch(removeFavorite(teachers.id));
        toast.success(`${teachers.name} ${teachers.surname} removed from favorites`);
      } else {
        await dispatch(addFavorite(teachers.id));
        toast.success(`${teachers.name} ${teachers.surname} added to favorites`);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error('Something went wrong, please try again.');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.containerImage}>
        <img 
          src={teachers.avatar_url} 
          alt={`${teachers.name} ${teachers.surname}`} 
          className={style.img} 
        />
      </div>
      <div className={style.containerLang}>
        <div className={style.containerLangItem}>
          <div className={style.langTitle}>
            <p className={style.textLang}>Languages</p>
            <h3 className={style.titleLang}>{teachers.name} {teachers.surname}</h3>
          </div>
          <ul className={style.listLang}>
            <li className={style.listLangItem}>
              <SvgIcon width="16" height="16" icon="book-open" />
              <span className={style.langSpan}>Lessons online</span>
            </li>
            <li className={style.listLangItem}>
              <span className={style.langSpan}>Lessons done: </span>{teachers.lessons_done}
            </li>
            <li className={style.listLangItem}>
              <SvgIcon width="16" height="16" icon="star" className={style.icon} />
              <span className={style.langSpan}>Rating:</span> {teachers.rating}
            </li>
            <li className={style.listLangItem}>
              <span className={style.langSpan}>Price / 1 hour: </span>{teachers.price_per_hour}$
            </li>
          </ul>

          <button
            type="button"
            className={style.heardButton}
            onClick={handleFavoriteToggle}
          >
            <SvgIcon
              width="26"
              height="26"
              icon={isAuth && isFavorite ? 'online' : 'heard'}
              className={isAuth && isFavorite ? style.svgOnline : style.svgHeard} 
            />
          </button>
        </div>

        <div className={style.containerInfo}>
          <ul className={style.listInfo}>
            <li className={style.listInfoItemSpan}>
              Speaks: <span>{teachers.languages.join(', ')}</span>
            </li>
            <li className={style.listInfoItem}>
              <span>Lesson Info: </span>{teachers.lesson_info}
            </li>
            <li className={style.listInfoItem}>
              <span>Conditions: </span>{teachers.conditions.join(', ')}
            </li>
          </ul>
          {showMore && <p className={style.experience}>{teachers.experience}</p>}
        </div>

        <button 
          className={style.readMoreButton} 
          onClick={() => setShowMore(prev => !prev)}
        >
          {showMore ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

export default TeachersCard;
