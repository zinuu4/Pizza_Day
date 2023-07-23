import { useSelector } from 'react-redux';

import './orderInfo.scss';
import check from 'assets/orderInfo/check.svg';
import pencil from 'assets/orderInfo/pencilEdit.svg';
import dish from 'assets/orderInfo/dish.svg';
import bicycle from 'assets/orderInfo/bicycleMan.svg';
import checked from 'assets/orderInfo/checked.svg';

const OrderInfo = () => {
  const { doneOrderInfo } = useSelector(state => state.user);

  return (
    <section className="orderInfo">
      <h5 className="orderInfo__title">Order {doneOrderInfo.id.substring(0, 8)}... in processing!</h5>
      <div className="orderInfo__info">
        <div>{doneOrderInfo.date} at {doneOrderInfo.time}</div>
        <div>Sum {doneOrderInfo.orderPrice} ₴</div>
      </div>

      <div className="orderInfo__status">
        <div className="orderInfo__status__img-wrapper">
          <img className="orderInfo__status__img" src={check} alt="New order" />
        </div>
        <div className="orderInfo__status__text">
          <div style={{'color': 'var(--accent)'}} className="orderInfo__status__title">New</div>
          <div className="orderInfo__status__description">Order № {doneOrderInfo.id.substring(0, 8)}...</div>
        </div>
      </div>
      <p className='orderInfo__status__loading'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </p>

      <div className="orderInfo__status">
        <div className="orderInfo__status__img-wrapper">
          <img className="orderInfo__status__img" src={pencil} alt="Accepted" />
        </div>
        <div className="orderInfo__status__text">
          <div className="orderInfo__status__title">Accepted</div>
          <div className="orderInfo__status__description">Order № {doneOrderInfo.id.substring(0, 8)}...</div>
        </div>
      </div>
      <p className='orderInfo__status__loading'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </p>

      <div className="orderInfo__status">
        <div className="orderInfo__status__img-wrapper">
          <img className="orderInfo__status__img" src={dish} alt="Cooking" />
        </div>
        <div className="orderInfo__status__text">
          <div className="orderInfo__status__title">Cooking</div>
          <div className="orderInfo__status__description">Cooking in progress</div>
        </div>
      </div>
      <p className='orderInfo__status__loading'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </p>

      <div className="orderInfo__status">
        <div className="orderInfo__status__img-wrapper">
          <img className="orderInfo__status__img" src={bicycle} alt="Awaiting" />
        </div>
        <div className="orderInfo__status__text">
          <div className="orderInfo__status__title">Awaiting</div>
          <div className="orderInfo__status__description">You can pick up your order</div>
        </div>
      </div>
      <p className='orderInfo__status__loading'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </p>

      <div className="orderInfo__status">
        <div className="orderInfo__status__img-wrapper">
          <img className="orderInfo__status__img" src={checked} alt="Completed" />
        </div>
        <div className="orderInfo__status__text">
          <div className="orderInfo__status__title">Completed</div>
          <div className="orderInfo__status__description">You can pick up your order</div>
        </div>
      </div>

    </section>
  );
};

export default OrderInfo;