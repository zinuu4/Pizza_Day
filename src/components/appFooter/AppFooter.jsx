import { Link } from 'react-router-dom';

import pageUp from '../../assets/imgFooter/footerPageUp.svg';
import logo from '../../assets/logo/logo.jpeg';
import masterCard from '../../assets/imgFooter/footerMasterCard.png';
import visa from '../../assets/imgFooter/footerVisa.png';
import facebook from '../../assets/imgFooter/footerFacebook.svg';
import instagram from '../../assets/imgFooter/footerInstagram.svg';
import tiktok from '../../assets/imgFooter/footerTikTok.svg';

import './appFooter.scss';

const AppFooter = () => {
  const handlePageUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  return (
    <footer className='footer'>
      <div className='container'>

        <div className='top'>
          <Link to='/'>
            <img className='top__logo' src={logo} alt="logo" />
          </Link>
          <button onClick={handlePageUp} className='top__btn' >
            <span className='top__btn-span' >Back to top</span>
            <img src={pageUp} alt="pageup" />
          </button>
        </div>

        <div className='main__wrapper'>
          <div className='left-block__wrapper'>

            <div className='pizza'>
              <h5 className='pizza__title'>Pizza Day</h5>
              <nav className='pizza__nav'>
                <a className='pizza__nav-link' href="#">Work</a>
                <a className='pizza__nav-link' href="#">Suppliers</a>
                <a className='pizza__nav-link' href="tel:+380961781818">Hotline +380 (96) 178 18 18</a>
                <a className='pizza__nav-link' href="#">manager@pizzaday.com.ua</a>
              </nav>
            </div>

            <div className='pickup'>
              <h5 className='pickup__title'>Pickup</h5>
              <div className='pickup__info-wrapper'>
                <div className='pickup__time'>
                  <span className='circle'/>
                  Opened from 10:00 to 22:00
                </div>
                <a href='tel:+380730836710' className='pickup__phone'>+380 (73) 083 67 10</a>
              </div>
              <div className='pickup__payments'>
                <img className='pickup__payments-mastercard' src={masterCard} alt="MasterCard" />
                <img className='pickup__payments-visa' src={visa} alt="Visa" />
              </div>
            </div>

          </div>

          <div className='social'>
            <a className='social__link'>
              <img className='social__icon' src={facebook} alt="Facebook" />
            </a>
            <a className='social__link'>
              <img className='social__icon' src={instagram} alt="Instagram" />
            </a>
            <a className='social__link'>
              <img className='social__icon' src={tiktok} alt="Tiktok" />
            </a>
          </div>

        </div>

        <div className='divider'></div>

        <div className='privacy'>
          <p className='privacy__copyright'>
            © 2023 Pizza Day
          </p>
          <a className='privacy__policy' href="https://www.eatery.club/privacy_policy.pdf" target="_blank">Privacy policies and processing of personal data</a>
        </div>

      </div>
    </footer>
  )
}

export default AppFooter