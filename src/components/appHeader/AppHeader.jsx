import { Link } from 'react-router-dom';

import logo from '../../assets/logo/logo.jpeg';
import locationYellow from '../../assets/locationImages/locationYellow.svg';

import './appHeader.scss';

const AppHeader = () => {
  const isLocationChosen = false;

  if (isLocationChosen) {
    return (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Link to='/'>
              <img className='header__logo' src={logo} alt="Logo" />
            </Link>
            <div className="location">
              <img className='location__img' src={locationYellow} alt="Location" />
              <p className="location__adress">З собою, Pizza Day - Berezinska</p>
            </div>
            <div className="options">
              <select className="options__languages">
                <option value="English">English</option>
                <option value="Ukrainian">Українська</option>
                <option value="Russian">Русский</option>
              </select>
              <button className="options__login">Login</button>
            </div>
          </div>
        </div>
      </header>
    )
  } else {
    return (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Link to='/'>
              <img className='header__logo' src={logo} alt="Logo" />
            </Link>
            {/* <div className="location">
              <img className='location__img' src={locationYellow} alt="Location" />
              <p className="location__adress">З собою, Pizza Day - Berezinska</p>
            </div> */}
            <div className="options">
              <select className="options__languages">
                <option value="English">English</option>
                <option value="Ukrainian">Українська</option>
                <option value="Russian">Русский</option>
              </select>
              {/* <button className="options__login">Login</button> */}
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default AppHeader