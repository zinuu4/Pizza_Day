import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Map from 'components/googleMap/GoogleMap';

import { setCityRestaurants } from 'store/slices/dataBaseSlice';
import { setDeliveryModal } from "store/slices/modalsSlice";
import { setChosenCity, setChosenRestaurant } from 'store/slices/userSlice';
import { useHttp } from "hooks/http.hook";
import useModalToggle from "hooks/modalToggleFunctionality";

import Spinner from 'components/userAlerts/spinner/Spinner';
import ErrorMessage from 'components/userAlerts/errorMessage/ErrorMessage';

import close from 'assets/close/closeYellow.svg';
import './deliveryModal.scss';

const DeliveryModal = () => {
  const {chosenRestaurant, chosenCity} = useSelector(state => state.user);
  const {deliveryModal} = useSelector(state => state.modals);
  const {cities, cityRestaurants} = useSelector(state => state.db);

  const {getData, getDataLoading, getDataError} = useHttp();

  const dispatch = useDispatch();

  useEffect(() => {
    getData(`${chosenCity} restaurants`, setCityRestaurants)
  }, [chosenCity])

  const {setScroll, handleWrapperClickDispatch} = useModalToggle();
  setScroll(deliveryModal)

  const renderedRestaurants = cityRestaurants.map(({name, img, id, address, timeOpen, lat, lng}) => {
    const restaurantClass = name === chosenRestaurant.name ? 'choose__restaurant selected-restaurant' : 'choose__restaurant';
    const addressClass = name === chosenRestaurant.name ? 'choose__restaurant-address selected-restaurant-address' : 'choose__restaurant-address';
    return (
      <div onClick={() => dispatch(setChosenRestaurant({name, img, id, address, timeOpen, lat, lng}))} key={id} className={restaurantClass}>
        <div className={addressClass}>{address}</div>
        <div className='choose__restaurant-clue'>{name}</div>
        <p className='choose__restaurant-work-time'>
          <span className='choose__restaurant-circle'/>
          {timeOpen}
        </p>
      </div>
    )
  })

  const errorMessage = getDataError ? (
    <ErrorMessage
      styles={{
        width: '100px', 
        height: '100px',
        display: 'block',
        margin: '0 auto'
      }}
    />
    ) : null;
    const loadingMessage = getDataLoading ? (
      <Spinner
        styles={{
          display: 'block',
          margin: '0 auto'
        }}
      />
    ) : null;
    const content = !(getDataError || getDataLoading) ? renderedRestaurants : null;

  return (
    <div
      style={{
        'display': deliveryModal ? 'flex' : 'none'
      }}
      className='modal__wrapper'
      onClick={(e) => handleWrapperClickDispatch(e, setDeliveryModal)}
    >
      <div
      style={{
        'display': deliveryModal ? 'flex' : 'none'
      }}
      className='modal deliveryModal'
      >

        <div className='deliveryModal__top'>
          <div className='deliveryModal__title'>How to receive an order</div>
          <img onClick={() => dispatch(setDeliveryModal(false))} className='deliveryModal__close' src={close} alt="close modal" />
        </div>

        <div className='deliveryModal__content'>

          <div className='deliveryModal__content__left'>
            <div className='deliveryModal__choose__btns'>
              <button className='deliveryModal__choose__btn'>Take-out</button>
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

          {loadingMessage}
          {errorMessage}
          {content}

          <button type='button' onClick={() => dispatch(setDeliveryModal(false))} className='choose__btn-confirm'>Confirm address</button>
          </div>

          <div className='deliveryModal__content__right'>
            <div className='deliveryModal__map__wrapper'>
              <Map lat={chosenRestaurant.lat} lng={chosenRestaurant.lng} />
            </div>
            <p className='deliveryModal__info'>Pin your exact location to help the courier find your address</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DeliveryModal