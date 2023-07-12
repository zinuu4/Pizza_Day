import { Link } from 'react-router-dom';

import headerLogo from '../../assets/imgHeader/headerLogo.jpeg';
import headerLocation from '../../assets/imgHeader/headerLocation.svg';

import './appHeader.scss';

const AppHeader = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link to='/'>
            <img className='header__logo' src={headerLogo} alt="Logo" />
          </Link>
          <div className="location">
            <img className='location__img' src={headerLocation} alt="Location" />
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
    </div>
  )
}

export default AppHeader