import { useDispatch, useSelector } from 'react-redux';

import useModalToggle from 'hooks/modalToggleFunctionality';
import Map from 'components/googleMap/GoogleMap';

import { setBannerInfoModal } from 'store/slices/modalsSlice';

import './bannerInfoModal.scss';
import close from 'assets/close/closeYellow.svg';

const BannerInfoModal = () => {
  const { bannerInfoModal } = useSelector(state => state.modals);
  const { chosenRestaurant } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const { setScroll, handleWrapperClickDispatch } = useModalToggle();
  setScroll(bannerInfoModal);

  return (
    <>
      {bannerInfoModal && (
        <div className='modal__wrapper' onClick={(e) => handleWrapperClickDispatch(e, setBannerInfoModal)}>
          <div className='modal modal__restaraunt-info animate__animated animate__fadeInUp custom-animation'>
            <div className='modal__restaraunt-info-top'>
              <h4 className='modal__restaraunt-info-title'>Information about the restaurant</h4>
              <button className='btn-close' onClick={() => dispatch(setBannerInfoModal(false))}>
                <img 
                  className='icon-close'
                  src={close} 
                  alt="close" 
                />
              </button>
            </div>
  
            <div className='modal__restaraunt-info-info'>
  
              <div>
                <p className='modal__restaraunt-info-info-subtitle'>Business hours</p>
                <div className='modal__restaraunt-info-info-time'>
                  <span className='circle'></span>
                  {chosenRestaurant.timeOpen}
                </div>
                <a className="modal__restaraunt-info-info-phone" href="tel:+380730836710">+380 (73) 083 67 10</a>
              </div>
  
              <div>
                <p className='modal__restaraunt-info-info-subtitle'>Address</p>
                <p>{chosenRestaurant.address}</p>
              </div>
  
            </div>
  
            <div className='modal__restaraunt-info-map'>
              <Map lat={chosenRestaurant.lat} lng={chosenRestaurant.lng} />
            </div>
  
          </div>
        </div>
      )}
    </>
  );
};

export default BannerInfoModal;