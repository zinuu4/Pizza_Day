import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginModal from 'components/modals/loginModal/LoginModal';
import SignUpModal from 'components/modals/signUpModal/SignUpModal';
import NotificationsModal from 'components/modals/notificationsModal/NotificationsModal';
import DeliveryModal from 'components/modals/deliveryModal/DeliveryModal';

import { setLoginModal, setDeliveryModal, setNotificationsModal } from 'store/slices/modalsSlice';
import { setChoosenMenuItem } from 'store/slices/profileSlice';

import './appHeader.scss';
import logo from '../../assets/logo/logo.jpeg';
import locationYellow from '../../assets/locationImages/locationYellow.svg';
import heart from 'assets/heart/heartBlack.svg';
import bell from 'assets/imgHeader/bell.svg';


const AppHeader = () => {
  const { name, avatar, chosenRestaurant } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const booleanDeliveryAddress = useMemo(() => !!chosenRestaurant.name, [chosenRestaurant]);
  const booleanName = useMemo(() => !!name, [name]);

  const handleProfileClick = () => {
    navigate('/profile');
    dispatch(setChoosenMenuItem('Favourite products'));
  };

  const rightContent = useMemo(() => {
    if (booleanName) {
      return (
        <>
          <div className='header__profile__wrapper'>
            <div className='header__profile__loyalty-wrapper'>
              <div className='header__profile__loyalty-points'>0 points</div>
              <div className='header__profile__loyalty-text'>Loyalty Program
                <div className='loyalty__info'>
                  <div className='loyalty__info__title'>Як це працює?</div>
                  <div className='loyalty__info__text'>
                📈 Бонуси нараховуються в розмірі 1% від кожної покупки зареєстрованого клієнта
                    <br/><br/>
                💰 Бонусами можна оплатити не більше 50% від суми замовлення
                    <br/><br/>
                💳 Бонусний рахунок доступний з наступного замовлення
                    <br/><br/>
                📆 Термін дії бонусів - 395 днів з моменту покупки
                  </div>
                </div>
              </div>
            </div>
            <img className='header__profile__icon' onClick={handleProfileClick} src={heart} alt="favourites products" />
            <img 
              onClick={() => dispatch(setNotificationsModal(true))} 
              className='header__profile__icon' 
              src={bell} 
              alt="notifications" />
            <Link to='/profile'>
              <img className='header__profile__avatar' src={avatar} alt="profile" />
            </Link>
          </div>
          <NotificationsModal/>
        </>
      );
    } else {
      return (
        <div className="options">
          <select className="options__languages">
            <option value="English">English</option>
          </select>
          <button onClick={() => dispatch(setLoginModal(true))} className="options__login">
            Login
          </button>
        </div>
      );
    }
  }, [booleanName]);

  
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Link to='/'>
              <img className='header__logo' src={logo} alt="Logo" />
            </Link>
            {booleanDeliveryAddress && (
              <div onClick={() => dispatch(setDeliveryModal(true))} className="location">
                <img className='location__img' src={locationYellow} alt="Location" />
                <p className="location__adress">З собою, {chosenRestaurant.name}</p>
              </div>
            )}
            {rightContent}
          </div>
        </div>
      </header>
      {booleanDeliveryAddress && (
        <>
          <DeliveryModal />
          <SignUpModal />
          <LoginModal />
        </>
      )}
    </>
  );
};

export default AppHeader;