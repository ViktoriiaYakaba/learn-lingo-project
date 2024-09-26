import React, { useState, useEffect } from 'react';
import styled from './Header.module.scss';
import SvgIcon from '../../icon/SvgIcon';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import SingUp from '../singUpModal/SingUp';
import LogIn from '../logInModal/LogIn';
import { logOut } from '../../redux/auth/operations';
import { useDispatch, useSelector } from "react-redux";
import { ImExit } from "react-icons/im";
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(styled.navLink, { [styled.active]: isActive });
};

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [value, setValue] = useState(getInitialValue(location.pathname));
    const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
    const [isRegModalOpened, setIsRegModalOpened] = useState(false);
    const isAuth = useSelector((state) => state.auth.isAuth);

    function getInitialValue(pathname) {
    switch (pathname) {
      case "/teachers":
        return 1;
      case "/favorites":
        return 2;
      case "/":
        return 0;
      default:
        return null;
    }
    };

    useEffect(() => {
    if (location.pathname.startsWith("/teachers")) {
      setValue(1);
    } else if (location.pathname.startsWith("/favorites")) {
      setValue(2);
    }
    }, [location.pathname]);
    
    const logOutHandle = () => {
    dispatch(logOut());
    navigate("/"); 
    };


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
            
                {isAuth && (
          <NavLink to="/favorites" className={buildLinkClass}>
            Favorites
          </NavLink>
        )}
            </nav>
          {!isAuth ? (
  <div className={styled.containerBtn}>
    <button className={styled.btnLogIn} type="button" onClick={openLoginModal}>
      <SvgIcon width="20" height="20" icon="log-in" className={styled.icon} />
      <span>Log In</span>
    </button>
    <button className={styled.btnRegister} type="button" onClick={openRegisterModal}>
      Registration
    </button>
  </div>
) : (
  <div className={styled.containerBtn}>
        <button className={styled.btnLogIn} type="button" onClick={logOutHandle}>
        <ImExit size={18} />
      <span>Log Out</span>
    </button>
  </div>
)}
            <LogIn isOpen={isLoginModalOpened} onClose={() => setIsLoginModalOpened(false)} />
            <SingUp isOpen={isRegModalOpened} onClose={() => setIsRegModalOpened(false)} />
        </header>
    )
};

export default Header;
