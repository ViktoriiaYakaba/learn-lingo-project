import React, {useEffect, useState} from 'react';
import imageYellow from '../../assets/img/block.jpg';
import imageGreen from '../../assets/img/block-2.jpg';
import imageBlue from '../../assets/img/block-3.jpg';
import imageOrange from '../../assets/img/block-4.jpg';
import imageRose from '../../assets/img/block-5.jpg';
import style from './HeroHome.module.scss';
import { useNavigate } from 'react-router-dom';

const HeroHome = () => {
    const [image, setImage] = useState('');
    const [buttonColor, setButtonColor] = useState('');
    const [spanColor, setSpanColor] = useState('');
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    const options = [
    {
      image: imageYellow,
      buttonColor: '#F4C550', 
      spanColor: '#FBE9BA', 
    },
    {
      image: imageGreen,
      buttonColor: '#9FBAAE', 
      spanColor: '#CBDED3', 
    },
    {
      image: imageBlue,
      buttonColor: '#9FB7CE', 
      spanColor: '#BFD6EA', 
    },
    {
      image: imageOrange,
      buttonColor: '#F0AA8D', 
      spanColor: '#F4C8BA', 
    },
    {
      image: imageRose,
      buttonColor: '#E0A39A', 
      spanColor: '#F2C0BD', 
    },
    ];
    
     const handleStartedClick = () => {
    navigate('/teachers');
     };
    
    useEffect(() => {
    const randomOption = options[Math.floor(Math.random() * options.length)];
    setImage(randomOption.image);
    setButtonColor(randomOption.buttonColor);
    setSpanColor(randomOption.spanColor);
    }, []);
    


  return (
    <div className={style.container}>
    <div className={style.containerStarted}>
          <h1 className={style.title}>
          Unlock your potential with the best <span className={style.spanTitle} style={{ backgroundColor: spanColor }}>language</span> tutors
        </h1>
        <p className={style.text}>
          Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.
        </p>
        
              <button 
                type='button'
                  onClick={handleStartedClick}
          className={style.btn} 
          style={{ backgroundColor: hovered ? spanColor : buttonColor }} 
          onMouseEnter={() => setHovered(true)} 
          onMouseLeave={() => setHovered(false)}
        > Get started
        </button>     
          </div>
          <div className={style.containerImg}>
        <img src={image} alt="emogi" className={style.img} />
          </div>
          <div className={style.containerRew}>
        <ul className={style.list}>
          <li className={style.listItem}>
            <p className={style.content}> 32,000 +
              <span className={style.stanCont}>Experienced tutors</span>
            </p>
          </li>
          <li className={style.listItem}>
            <p className={style.content}>300,000 +
              <span className={style.stanCont}>5-star tutor reviews</span>
            </p>
          </li>
          <li className={style.listItem}>
            <p className={style.content}>120 +
              <span className={style.stanCont}>Subjects taught</span>
            </p>
          </li> <li className={style.listItem}>
            <p className={style.content}>200 +
              <span className={style.stanCont}>Tutor nationalities</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HeroHome;
