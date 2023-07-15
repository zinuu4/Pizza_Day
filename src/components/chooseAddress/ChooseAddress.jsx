import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAddress } from 'store/slices/userSlice';
import { useHttp } from 'hooks/http.hook';
import { setCities, setCityRestaurants, setChosenCity } from 'store/slices/dataBaseSlice';

import './chooseAddress.scss';

import locationYellow from '../../assets/locationImages/locationYellow.svg';
import locationGrey from '../../assets/locationImages/locationGrey.svg';

const ChooseAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = useHttp();

  const {cities} = useSelector(state => state.db);
  const {cityRestaurants} = useSelector(state => state.db);
  const {chosenCity} = useSelector(state => state.db);

  useEffect(() => {
    fetchData('cities', setCities)
    fetchData(`${chosenCity} restaurants`, setCityRestaurants)
  }, [chosenCity])

  return (
    <section className="choose">

      <h3 className="choose__title">Order in Pizza Day</h3>

      <div className="choose__btn-wrapper">
        <button className="choose__btn">With you</button>
        <button className="choose__btn">Delivery</button>
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
        cityRestaurants.map(({name, address, timeOpen}) => {
          return (
            <div className='choose__restaurant selected-restaurant'>
              <div className='choose__restaurant-address selected-restaurant-address'>{address}</div>
              <div className='choose__restaurant-clue'>{name}</div>
              <p className='choose__restaurant-work-time'>
                <span className='choose__restaurant-circle'/>
                {timeOpen}
              </p>
            </div>
          )
        })
      }

      <button className='choose__btn-confirm' onClick={() => {
        dispatch(setAddress('Dnipro'))
        navigate('/')
      }} >Confirm the address</button>

    </section>
  )
}

export default ChooseAddress;