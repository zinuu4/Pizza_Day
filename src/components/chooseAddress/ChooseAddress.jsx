import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useHttp } from 'hooks/http.hook';
import { setCities, setCityRestaurants } from 'store/slices/dataBaseSlice';
import { setChosenCity, setChosenRestaurant } from 'store/slices/userSlice';

import Spinner from 'components/userAlerts/spinner/Spinner';
import ErrorMessage from 'components/userAlerts/errorMessage/ErrorMessage';

import './chooseAddress.scss';
import locationYellow from '../../assets/locationImages/locationYellow.svg';

const ChooseAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getData: getCities, getDataLoading: getCitiesLoading, getDataError: getCitiesError } = useHttp();
  const { getData: getCityRestaurants, getDataLoading: getCityRestaurantsLoading, getDataError: getCityRestaurantsError } = useHttp();

  const { cities, cityRestaurants } = useSelector(state => state.db);
  const { chosenCity, chosenRestaurant } = useSelector(state => state.user);

  useEffect(() => {
    getCities('cities', setCities);
  }, [])

  useEffect(() => {
    getCityRestaurants(`${chosenCity} restaurants`, setCityRestaurants);
  }, [chosenCity]);

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

  const restaurantsErrorMessage = getCityRestaurantsError ? (
    <ErrorMessage
      styles={{
        width: '100px', 
        height: '100px',
        display: 'block',
        margin: '0 auto'
      }}
    />
    ) : null;
    const restaurantsLoadingMessage = getCityRestaurantsLoading ? (
      <Spinner
        styles={{
          display: 'block',
          margin: '0 auto'
        }}
      />
    ) : null;
    const restaurantsContent = !(getCityRestaurantsError || getCityRestaurantsLoading) ? renderedRestaurants : null;

  const citiesErrorMessage = getCitiesError ? (
  <ErrorMessage
    styles={{
      width: '100px', 
      height: '100px',
      display: 'block',
      margin: '0 auto'
    }}
  />
  ) : null;
  const citiesLoadingMessage = getCitiesLoading ? (
    <Spinner
      styles={{
        display: 'block',
        margin: '0 auto'
      }}
    />
  ) : null;
  const citiesContent = !(getCitiesError || getCitiesLoading) ? (
    <>
      <select value={chosenCity} onChange={(e) => dispatch(setChosenCity(e.target.value))} className='choose__city'>
        {
          cities.map(({id}) => {
            return (
              <option key={id} className='choose__city-option'>{id}</option>
            )
          })
        }
      </select>

      {restaurantsLoadingMessage}
      {restaurantsErrorMessage}
      {restaurantsContent}
    </>
  ) : null;

  return (
    <section className="choose">

      <h3 className="choose__title">Order in Pizza Day</h3>

      <div className="choose__btn-wrapper">
        <button className="choose__btn">Take-out</button>
      </div>

      <div className="choose__location-wrapper">
        <div className="choose__location-text">Pickup with:</div>
        <div className="choose__location-map">
          <p className="choose__location-map-text">Select on the map</p>
          <p className="choose__location-map-icon-wrapper">
            <img src={locationYellow} alt="Location" className='choose__location-map-icon' />
          </p>
        </div>
      </div>

      {citiesLoadingMessage}
      {citiesErrorMessage}
      {citiesContent}

      <button className='choose__btn-confirm' onClick={() => {
        navigate('/')
      }} >Confirm the address</button>

    </section>
  )
}

export default ChooseAddress;