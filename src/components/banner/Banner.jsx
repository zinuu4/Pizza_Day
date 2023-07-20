import { useDispatch, useSelector } from 'react-redux';

import BannerInfoModal from 'components/modals/bannerInfoModal/BannerInfoModal';
import ReviewModal from 'components/modals/reviewModal/ReviewModal';

import { setBannerInfoModal, setReviewModal } from "store/slices/modalsSlice";

import './banner.scss';
import shoppingBasket from 'assets/banner/shoppingBasket.svg';
import restarauntPhoto from 'assets/banner/restarauntPhoto.jpeg';
import forkAndSpoon from 'assets/banner/forkAndSpoon.png';
import infoCircle from 'assets/banner/infoCircle.svg';
import review from 'assets/banner/review.svg';

const Banner = () => {
  const {chosenRestaurant} = useSelector(state => state.user);

  const dispatch = useDispatch();

  if (!chosenRestaurant) {
    return <div>Loading...</div>
  }

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
                <h4 className='banner__info-title'>{chosenRestaurant.name}</h4>
                <div className='banner__info-logo-wrapper'>
                  <img className='banner__info-logo' src={forkAndSpoon} alt="logo" />
                </div>
              </div>

              <a className="banner__info-phone" href="tel:+380730836710">+380 (73) 083 66 91</a>

              <button onClick={() => dispatch(setBannerInfoModal(true))} className='banner__info-about'>
                <div className='banner__info-about-text-wrapper'>
                  <p className='banner__info-about-text'>Information about the restaurant</p>
                  <div className='banner__info-about-time'>
                    <span className='circle'></span>
                    {chosenRestaurant.timeOpen}
                  </div>
                </div>
                <img src={infoCircle} alt="info" />
              </button>

              <div onClick={() => dispatch(setReviewModal(true))} className='banner__review'>
                <p className='banner__review-text'>
                  Leave a review about the work of the institution or your recent delivery.
                </p>
                <img src={review} alt="review" />
              </div>

            </div>
          </div>

        </div>
      </section>
      <BannerInfoModal/>
      <ReviewModal/>
    </>
  )
}

export default Banner;