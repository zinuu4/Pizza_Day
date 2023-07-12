import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAddress } from 'store/slices/userSlice';

import './chooseAddress.scss';

import locationYellow from '../../assets/locationImages/locationYellow.svg';
import locationGrey from '../../assets/locationImages/locationGrey.svg';

const ChooseAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="choose">

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

      <select className='choose__city'>
        <option className='choose__city-option'>Dnipro</option>
        <option className='choose__city-option'>Kyiv</option>
        <option className='choose__city-option'>Kharkiv</option>
      </select>

      <div className='choose__restaurant selected-restaurant'>
        <div className='choose__restaurant-address selected-restaurant-address'>Pizza Day № 51,вул. Марії Лисиченко 21</div>
        <div className='choose__restaurant-clue'>ТК Березинський</div>
        <p className='choose__restaurant-work-time'>
          <span className='choose__restaurant-circle'/>
          Відкрито з 10:00 до 22:00
        </p>
      </div>

      <div className='choose__restaurant'>
        <div className='choose__restaurant-address'>Pizza Day № 51,вул. Марії Лисиченко 21</div>
        <div className='choose__restaurant-clue'>ТК Березинський</div>
        <p className='choose__restaurant-work-time'>
          <span className='choose__restaurant-circle'/>
          Відкрито з 10:00 до 22:00
        </p>
      </div>

      <button className='choose__btn-confirm' onClick={() => {
        dispatch(setAddress('Dnipro'))
        navigate('/')
      }} >Confirm the address</button>

    </div>
  )
}

export default ChooseAddress;