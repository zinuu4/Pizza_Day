import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo/logo.jpeg';
import locationYellow from '../../assets/locationImages/locationYellow.svg';

import './appHeader.scss';

const AppHeader = () => {
  const {chosenCity} = useSelector(state => state.db);
  const navigate = useNavigate();

  const [booleanDeliveryAddress, setBooleanDeliveryAddress] = useState(false);

  useEffect(() => {
    setBooleanDeliveryAddress(!!chosenCity);
  }, [chosenCity, navigate]);

  if (chosenCity) {
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
                <p className="location__adress">З собою, {chosenCity}</p>
              </div>
              <div className="options">
                <select className="options__languages">
                  <option value="English">English</option>
                  <option value="Ukrainian">Українська</option>
                  <option value="Russian">Русский</option>
                </select>
                <button className="options__login">
                  <Link to='/register'>
                    Login
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </header>
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