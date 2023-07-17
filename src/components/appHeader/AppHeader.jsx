import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Login from 'components/login/Login';
import SignUp from 'components/signUp/SignUp';

import { setLoginModal } from 'store/slices/modalsSlice';

import logo from '../../assets/logo/logo.jpeg';
import locationYellow from '../../assets/locationImages/locationYellow.svg';
import heart from 'assets/heart/heartBlack.svg';
import bell from 'assets/imgHeader/bell.svg';
import avatar from 'assets/userProfile/profile/profilePhoto.jpeg';

import './appHeader.scss';

const AppHeader = () => {
  const {email, chosenRestaurant} = useSelector(state => state.user);
  const [booleanDeliveryAddress, setBooleanDeliveryAddress] = useState(false);
  const [booleanEmail, setBooleanEmail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setBooleanDeliveryAddress(!!chosenRestaurant);
  }, [chosenRestaurant, navigate]);

  useEffect(() => {
    setBooleanEmail(!!email);
  }, [email, navigate]);

  const rightContentGenerator = () => {
    if (booleanEmail) {
      return (
        <div className='header__profile__wrapper'>
          <div className='header__profile__loyalty-wrapper'>
            <div className='header__profile__loyalty-points'>0 points</div>
            <div className='header__profile__loyalty-text'>Loyalty Program</div>
          </div>
          <img className='header__profile__icon' src={heart} alt="favourites products" />
          <img className='header__profile__icon' src={bell} alt="notifications" />
          <Link to='/profile'>
            <img className='header__profile__avatar' src={avatar} alt="profile" />
          </Link>
        </div>
      )
    } else {
      return (
        <div className="options">
          <select className="options__languages">
            <option value="English">English</option>
            <option value="Ukrainian">Українська</option>
            <option value="Russian">Русский</option>
          </select>
          <button onClick={() => dispatch(setLoginModal(true))} className="options__login">
            Login
          </button>
        </div>
      )
    }
  }

  const rightContent = rightContentGenerator();

  if (booleanDeliveryAddress) {
    return (
      <>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <Link to='/'>
                <img className='header__logo' src={logo} alt="Logo" />
              </Link>
              <div className="location">
                <img className='location__img' src={locationYellow} alt="Location" />
                <p className="location__adress">З собою, {chosenRestaurant}</p>
              </div>
              {rightContent}
            </div>
          </div>
        </header>
        <SignUp/>
        <Login/>
      </>
    )
  } else {
    return (
      <>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <Link to='/'>
                <img className='header__logo' src={logo} alt="Logo" />
              </Link>
              <div className="options">
                <select className="options__languages">
                  <option value="English">English</option>
                  <option value="Ukrainian">Українська</option>
                  <option value="Russian">Русский</option>
                </select>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}

export default AppHeader