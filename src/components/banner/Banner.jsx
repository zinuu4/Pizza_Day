import { useState } from 'react';
import { useSelector } from 'react-redux';

import { modalToggleFunctional } from 'services/modalToggleFunctional';

import './banner.scss';
import shoppingBasket from 'assets/banner/shoppingBasket.svg';
import restarauntPhoto from 'assets/banner/restarauntPhoto.jpeg';
import forkAndSpoon from 'assets/banner/forkAndSpoon.png';
import infoCircle from 'assets/banner/infoCircle.svg';
import review from 'assets/banner/review.svg';
import close from 'assets/close/closeYellow.svg';

const Banner = () => {
  const [modal, setModal] = useState(false);
  const {chosenRestaurant} = useSelector(state => state.user);

  const {setScroll, handleWrapperClick} = modalToggleFunctional();
  setScroll(modal)

  return (
    <>
      <section className='banner'>
        <div className='container'>

          <div className='banner__wrapper'>
            <ul className="banner__delivery-type">
              <li className='banner__delivery-type-text'>
                <img className='banner__delivery-type-icon' src={shoppingBasket} alt="delivery type" />
                Take-out
              </li>
            </ul>

            <div className='banner__img-wrapper'>
              <img src={restarauntPhoto} alt="restaraunt photo" className='banner__img' />
            </div>

            <div className='banner__info'>

              <div className='banner__info-title-wrapper'>
                <h4 className='banner__info-title'>{chosenRestaurant}</h4>
                <div className='banner__info-logo-wrapper'>
                  <img className='banner__info-logo' src={forkAndSpoon} alt="logo" />
                </div>
              </div>

              <a className="banner__info-phone" href="tel:+380730836710">+380 (73) 083 66 91</a>

              <button onClick={() => setModal(true)} className='banner__info-about'>
                <div className='banner__info-about-text-wrapper'>
                  <p className='banner__info-about-text'>Information about the restaurant</p>
                  <div className='banner__info-about-time'>
                    <span className='circle'></span>
                    Opened from 10:00 to 22:00
                  </div>
                </div>
                <img src={infoCircle} alt="info" />
              </button>

              <div className='banner__review'>
                <p className='banner__review-text'>
                  Leave a review about the work of the institution or your recent delivery.
                </p>
                <img src={review} alt="review" />
              </div>

            </div>
          </div>

        </div>
      </section>

      <div 
        style={{
        'display': modal ? 'flex' : 'none'
        }}
        className='modal__restaraunt-info-wrapper'
        onClick={(e) => handleWrapperClick(e, setModal)}
      >
      <div  
        style={{
          'display': modal ? 'flex' : 'none'
        }}
        className='modal__restaraunt-info'
      >
        <div className='modal__restaraunt-info-top'>
          <h4 className='modal__restaraunt-info-title'>Information about the restaurant</h4>
          <img 
            onClick={() => setModal(false)}  className='modal__restaraunt-info-close' 
            src={close} 
            alt="close" 
          />
        </div>

        <div className='modal__restaraunt-info-info'>

          <div>
            <p className='modal__restaraunt-info-info-subtitle'>Business hours</p>
            <div className='modal__restaraunt-info-info-time'>
              <span className='circle'></span>
              Opened from 10:00 to 22:00
            </div>
            <a className="modal__restaraunt-info-info-phone" href="tel:+380730836710">+380 (73) 083 67 10</a>
          </div>

          <div>
            <p className='modal__restaraunt-info-info-subtitle'>Address</p>
            <p>Inzhenerna street, 1</p>
          </div>

        </div>

        <div className='modal__restaraunt-info-map'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84752.39421572493!2d34.85921984335938!3d48.4083079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d959a9396d398b%3A0x628d8953834e1b43!2sPizza%20Day!5e0!3m2!1sen!2sua!4v1689234885480!5m2!1sen!2sua" width="100%" height="100%" style={{'border': '0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

      </div>
    </div>
    </>
  )
}

export default Banner;