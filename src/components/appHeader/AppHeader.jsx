import { useEffect, useState } from 'react';
import { useHref, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Login from 'components/login/Login';
import SignUp from 'components/signUp/SignUp';

import { setLoginModal } from 'store/slices/modalsSlice';
import { setChoosenMenuItem } from 'store/slices/profileSlice';
import { modalToggleFunctional } from 'services/modalToggleFunctional';
import { setChosenCity, setChosenRestaurant } from 'store/slices/userSlice';
import { setCityRestaurants } from 'store/slices/dataBaseSlice';
import { useHttp } from 'hooks/http.hook';

import logo from '../../assets/logo/logo.jpeg';
import locationYellow from '../../assets/locationImages/locationYellow.svg';
import heart from 'assets/heart/heartBlack.svg';
import bell from 'assets/imgHeader/bell.svg';
import close from 'assets/close/closeYellow.svg';
import mail from 'assets/imgHeader/mail.svg';

import './appHeader.scss';

const AppHeader = () => {
  const {email, avatar, chosenRestaurant, chosenCity} = useSelector(state => state.user);
  const [booleanDeliveryAddress, setBooleanDeliveryAddress] = useState(false);
  const [booleanEmail, setBooleanEmail] = useState(false);
  const [notificationsModal, setNotificationsModal] = useState(false);
  const [deliveryModal, setDeliveryModal] = useState(false);
  const {cities, cityRestaurants} = useSelector(state => state.db);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {getData} = useHttp();

  useEffect(() => {
    setBooleanDeliveryAddress(!!chosenRestaurant);
  }, [chosenRestaurant, navigate]);

  useEffect(() => {
    setBooleanEmail(!!email);
  }, [email, navigate]);

  useEffect(() => {
    getData(`${chosenCity} restaurants`, setCityRestaurants)
  }, [chosenCity])

  const {setScroll, handleWrapperClick} = modalToggleFunctional();
  setScroll(notificationsModal)
  setScroll(deliveryModal)

  const rightContentGenerator = () => {
    if (booleanEmail) {
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
            <img className='header__profile__icon' onClick={() => {
              navigate('/profile')
              dispatch(setChoosenMenuItem('Favourite products'))
            }} src={heart} alt="favourites products" />
            <img onClick={() => setNotificationsModal(true)} className='header__profile__icon' src={bell} alt="notifications" />
            <Link to='/profile'>
              <img className='header__profile__avatar' src={avatar} alt="profile" />
            </Link>
          </div>

          <div
          style={{
            'display': notificationsModal ? 'flex' : 'none'
          }}
          className='notifications__modal__wrapper'
          onClick={(e) => handleWrapperClick(e, setNotificationsModal)}
          >
            <div
            style={{
              'display': notificationsModal ? 'flex' : 'none'
            }}
            className='notifications__modal'
            >
              <div className='notifications__modal__top'>
                <div className='notifications__modal__title'>Personal notifications</div>
                <img onClick={() => setNotificationsModal(false)} className='notifications__modal__close' src={close} alt="close notifications modal" />
              </div>
              <div className='notifications__modal__content-empty'>
                <img src={mail} alt="no notifications" />
                <div className='notifications__modal__subtitle'>You have no notifications</div>
                <div className='notifications__modal__text'>Our admin is already printing a sensation, why not mark it with an order in our institution?</div>
              </div>
            </div>
          </div>
        </>
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
              <div onClick={() => setDeliveryModal(true)} className="location">
                <img className='location__img' src={locationYellow} alt="Location" />
                <p className="location__adress">З собою, {chosenRestaurant}</p>
              </div>
              {rightContent}
            </div>
          </div>
        </header>

        <div
        style={{
          'display': deliveryModal ? 'flex' : 'none'
        }}
        className='deliveryModal__wrapper'
        onClick={(e) => handleWrapperClick(e, setDeliveryModal)}
        >
          <div
          style={{
            'display': deliveryModal ? 'flex' : 'none'
          }}
          className='deliveryModal'
          >

            <div className='deliveryModal__top'>
              <div className='deliveryModal__title'>How to receive an order</div>
              <img onClick={() => setDeliveryModal(false)} className='deliveryModal__close' src={close} alt="close modal" />
            </div>

            <div className='deliveryModal__content'>

              <div className='deliveryModal__content__left'>
                <div className='deliveryModal__choose__btns'>
                  <button className='deliveryModal__choose__btn'>Take-out</button>
                  <button className='deliveryModal__choose__btn'>Delivery</button>
                </div>

                <select value={chosenCity} onChange={(e) => dispatch(setChosenCity(e.target.value))} className='choose__city'>
                {
                  cities.map(({id}) => {
                    return (
                      <option key={id} className='choose__city-option'>{id}</option>
                    )
                  })
                }
              </select>

              {
                cityRestaurants.map(({name, id, address, timeOpen}) => {
                  const restaurantClass = name === chosenRestaurant ? 'choose__restaurant selected-restaurant' : 'choose__restaurant';
                  const addressClass = name === chosenRestaurant ? 'choose__restaurant-address selected-restaurant-address' : 'choose__restaurant-address';
                  return (
                    <div onClick={() => dispatch(setChosenRestaurant(name))} key={id} className={restaurantClass}>
                      <div className={addressClass}>{address}</div>
                      <div className='choose__restaurant-clue'>{name}</div>
                      <p className='choose__restaurant-work-time'>
                        <span className='choose__restaurant-circle'/>
                        {timeOpen}
                      </p>
                    </div>
                  )
                })
              }
              <button onClick={() => setDeliveryModal(false)} className='choose__btn-confirm'>Confirm address</button>
              </div>

              <div className='deliveryModal__content__right'>
                <div className='deliveryModal__map__wrapper'>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84752.39421572493!2d34.85921984335938!3d48.4083079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d959a9396d398b%3A0x628d8953834e1b43!2sPizza%20Day!5e0!3m2!1sen!2sua!4v1689234885480!5m2!1sen!2sua" width="100%" height="100%" style={{'border': '0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <p className='deliveryModal__info'>Pin your exact location to help the courier find your address</p>
              </div>

            </div>
          </div>
        </div>
        
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