import React, { useState } from 'react';
import styled from './Header.module.scss';
import SvgIcon from '../../icon/SvgIcon';
import { NavLink } from 'react-router-dom';
import SingUp from '../singUpModal/SingUp';
import LogIn from '../logInModal/LogIn';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(styled.navLink, { [styled.active]: isActive });
};

const Header = () => {

    const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
    const [isRegModalOpened, setIsRegModalOpened] = useState(false);

    const openRegisterModal = () => {
        setIsRegModalOpened(true);
    };


    const openLoginModal = () => {
        setIsLoginModalOpened(true);
    };

    return (
        <header className={styled.container}>
            <NavLink to="/" className={styled.containerLogo}>
                <SvgIcon width="28" height="28" icon="ukraine" className={styled.icon} />
                <p className={styled.logo}>LearnLingo</p>
            </NavLink>
            <nav className={styled.navigation}>
                <NavLink to="/" className={buildLinkClass} >
                    Home
                </NavLink>
                <NavLink to="/teachers" className={buildLinkClass} >
                    Teachers
                </NavLink>
            
                <NavLink to="/favorites" className={buildLinkClass} >
                    Favorites
                </NavLink>
            </nav>
            <div className={styled.containerBtn}>
                <button className={styled.btnLogIn} type="button" onClick={openLoginModal}>
                    <SvgIcon width="20" height="20" icon="log-in" className={styled.icon} />
                    <span>Log In</span>
                </button>
                <button className={styled.btnRegister} type="button" onClick={openRegisterModal}>
                    Registration
                </button>
            </div>
            <LogIn isOpen={isLoginModalOpened} onClose={() => setIsLoginModalOpened(false)} />
            <SingUp isOpen={isRegModalOpened} onClose={() => setIsRegModalOpened(false)} />
        </header>
    )
};

export default Header;
