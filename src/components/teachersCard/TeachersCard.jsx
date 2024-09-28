import React, { useState } from 'react';
import SvgIcon from '../../icon/SvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { addFavorite, removeFavorite } from '../../redux/favorites/slice';
import { selectFavorites } from '../../redux/favorites/selectors';
import style from './TeachersCard.module.scss';

const TeachersCard = ({ teachers, selectedFilterLevel }) => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites) || [];
  const isAuth = useSelector((state) => state.auth.isAuth);

  const isFavorite = favorites.includes(teachers.id);

  const handleFavoriteToggle = async () => {
    if (!isAuth) {
      toast.error('You must be registered to add to favorites.', {
        icon: '❗',
      });
      return;
    }

    console.log(`Current favorites: ${JSON.stringify(favorites)}`);
    
    try {
      if (isFavorite) {
        console.log(`Removing favorite: ${teachers.id}`);
        await dispatch(removeFavorite(teachers.id));
        toast.success(`${teachers.name} ${teachers.surname} removed from favorites`);
      } else {
        console.log(`Adding favorite: ${teachers.id}`);
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
            onClick={isAuth ? handleFavoriteToggle : () => toast.error('You must be registered to add to favorites.',{
        icon: '❗',
      } )} 
          >
            <SvgIcon
              width="26"
              height="26"
              icon={isAuth && isFavorite ? 'online' : 'heard'} 
              className={isAuth ? (isFavorite ? style.svgOnline : style.svgHeard) : style.svgOnline} 
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
          {showMore && (
            <>
              <p className={style.experience}>{teachers.experience}</p>
              <div className={style.containerReview}>
                <ul className={style.listReviews}>
                  {teachers.reviews.map((review, index) => (
                    <li key={index} className={style.listReviewsItem}>
                      <div className={style.reviewWrap}>
                        <div className={style.initialCircle}>
                          {review.reviewer_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong className={style.reviewName}>{review.reviewer_name}</strong> 
                          <p className={style.reviewRating}>
                            <SvgIcon width="16" height="16" icon="star" className={style.icon} />
                            {review.reviewer_rating}.0
                          </p>
                        </div>
                      </div>
                      <p className={style.reviewComment}>{review.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <button 
          className={style.readMoreButton} 
          onClick={() => setShowMore(prev => !prev)}
        >
          {showMore ? 'Read Less' : 'Read More'}
        </button>
        <div className={style.containerLevels}>
          <ul className={style.levelList}>
            {teachers.levels.map((level, index) => (
              <li 
                key={index} 
                className={`${style.levelListItem} ${selectedFilterLevel === level ? style.selectedLevel : ''}`}
              >
                #{level}
              </li>
            ))}
          </ul>
          {showMore && (
            <button className={style.bookTrialButton} type='button'>
              Book Trial Lesson
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default TeachersCard;
