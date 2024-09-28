import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import { setLanguageFilter, setPriceFilter, setLevelFilter } from '../../redux/filters/slice'; 
import style from './TeachersFilter.module.scss';

const TeachersFilter = () => {
  const dispatch = useDispatch();

  const [isLangSelectOpen, setIsLangSelectOpen] = useState(false);
  const [isPriceSelectOpen, setIsPriceSelectOpen] = useState(false);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("All languages");
  const [selectedPrice, setSelectedPrice] = useState("All price");
  const [selectedLevel, setSelectedLevel] = useState("All level");

  const languagesData = ["English", "Spanish", "Ukrainian", "French", "German", "Italian"];
  const priceOptions = ['10', '15', '20', '25', '30', '35', '40', '45', '50']; 
  const levelsData = ['A1 Beginner', 'A2 Elementary', 'B1 Intermediate', 'B2 Upper-Intermediate', 'C1 Advanced', 'C2 Proficient'];

  const handleOpenLanguageSelect = () => {
    setIsLangSelectOpen(prev => !prev);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    dispatch(setLanguageFilter(language));
    setIsLangSelectOpen(false);
  };

  const handleClearLanguageSelection = () => {
    setSelectedLanguage("All languages");
    dispatch(setLanguageFilter(''));
    setIsLangSelectOpen(false);
  };


  const handleOpenPriceSelect = () => {
    setIsPriceSelectOpen(prev => !prev);
  };

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
    const priceNum = Number(price);
    const range = 5; 
    dispatch(setPriceFilter([priceNum - range, priceNum + range])); 
    setIsPriceSelectOpen(false);
  };

  const handleClearPriceSelection = () => {
    setSelectedPrice("All price");
    dispatch(setPriceFilter([0, 100])); 
    setIsPriceSelectOpen(false);
  };


  const handleOpenLevelSelect = () => {
    setIsLevelSelectOpen(prev => !prev);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    dispatch(setLevelFilter(level)); 
    setIsLevelSelectOpen(false);
  };

  const handleClearLevelSelection = () => {
    setSelectedLevel("All level");
    dispatch(setLevelFilter('')); 
    setIsLevelSelectOpen(false);
  };

  return (
    <div className={style.filterWrapper}>
      <div className={style.filterBox}>
        <div className={style.filterPlaceholder}>Languages</div>
        <div className={style.inputBoxStyled} onClick={handleOpenLanguageSelect}>
          {selectedLanguage}
          <button type="button" className={style.openSelectBtn}>
            {!isLangSelectOpen ? <FiChevronDown size={20} /> : <FiChevronUp size={20} />}
          </button>
          <ul className={isLangSelectOpen ? style.dropdownListActive : style.dropdownListHidden}>
            <li onClick={handleClearLanguageSelection} style={{ cursor: "pointer" }}>Clear</li>
            {languagesData.map(language => (
              <li key={nanoid()} onClick={() => handleLanguageSelect(language)} style={{ cursor: "pointer" }}>
                {language}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={style.filterBox}>
        <div className={style.filterPlaceholder}>Level</div>
        <div className={style.inputBoxStyled} onClick={handleOpenLevelSelect}>
          {selectedLevel}
          <button type="button" className={style.openSelectBtn}>
            {!isLevelSelectOpen ? <FiChevronDown size={20} /> : <FiChevronUp size={20} />}
          </button>
          <ul className={isLevelSelectOpen ? style.dropdownListActive : style.dropdownListHidden}>
            <li onClick={handleClearLevelSelection} style={{ cursor: "pointer" }}>Clear</li>
            {levelsData.map(level => (
              <li key={nanoid()} onClick={() => handleLevelSelect(level)} style={{ cursor: "pointer" }}>
                {level}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={style.filterBox}>
        <div className={style.filterPlaceholder}>Price</div>
        <div className={style.inputBoxStyled} onClick={handleOpenPriceSelect}>
          {selectedPrice} $
          <button type="button" className={style.openSelectBtn}>
            {!isPriceSelectOpen ? <FiChevronDown size={20} /> : <FiChevronUp size={20} />}
          </button>
          <ul className={isPriceSelectOpen ? style.dropdownListActive : style.dropdownListHidden}>
            <li onClick={handleClearPriceSelection} style={{ cursor: "pointer" }}>Clear</li>
            {priceOptions.map(price => (
              <li key={nanoid()} onClick={() => handlePriceSelect(price)} style={{ cursor: "pointer" }}>
                {price}$
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeachersFilter;
