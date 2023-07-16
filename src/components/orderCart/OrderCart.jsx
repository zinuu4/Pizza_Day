import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setTotalOrderPrice, deleteItemFromOrder } from 'store/slices/userSlice';
import { modalToggleFunctional } from 'services/modalToggleFunctional';

import './orderCart.scss';
import closeYellow from 'assets/close/closeYellow.svg';
import closeGrey from 'assets/close/closeGrey.svg';
import minus from 'assets/minus/minusYellow.svg';
import plus from 'assets/plus/plusYellow.svg';

const OrderCart = () => {
  const [modal, setModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {order} = useSelector(state => state.user);

  const {setScroll, handleWrapperClick} = modalToggleFunctional();
  useEffect(() => {
    setScroll(modal)
  }, [modal])

  useEffect(() => {
    const setTotalPriceFunc = async () => {
      await setTotalPrice(order.reduce((total, { price }) => total + parseInt(price.replace(/\D/g, "")), 0))
    }
    setTotalPriceFunc();
  }, [order]);

  const orderItems = order.map(({img, name, price, weight, descr, volume, id}, index) => {
    return (
      <div key={index} className='cart__content-item'>
        <img className='cart__content-item-img' src={img} alt={name} />
        <div className='cart__content-item-rightBlock'>
          <div className='cart__content-item-top'>
            <div className='cart__content-item-title'>{name}</div>
            <img onClick={() => dispatch(deleteItemFromOrder(name))} className='cart__content-item-delete' src={closeGrey} alt="delete" />
          </div>
          <div className='cart__content-item-bottom'>
            <div className='cart__content-item-price'>{price}</div>
            <div className='cart__content-item-counter-wrapper'>
              <button className='cart__content-item-counter-btn'>
                <img className='cart__content-item-counter-img' src={minus} alt="counter minus" />
              </button>
              <span className='cart__content-item-counter'>1</span>
              <button className='cart__content-item-counter-btn'>
                <img className='cart__content-item-counter-img' src={plus} alt="counter plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <>
      <div
        style={{
          'display': order.length !== 0 ? 'flex' : 'none'
        }}
        className='cart__button-wrapper'
      >
        <button
          style={{
            'display': order.length !== 0 ? 'flex' : 'none'
          }}
          onClick={() => setModal(true)} 
          className='cart__button'>
          <span>Place and order for:</span>
          <span>{totalPrice} ₴</span>
        </button>
      </div>

      <div 
        style={{
          'display': modal && order.length !== 0 ? 'flex' : 'none'
        }}
        onClick={(e) => handleWrapperClick(e, setModal)}
        className='cart__wrapper'
      >

        <section
          style={{
            'display': modal && order.length !== 0 ? 'flex' : 'none'
          }}
          className='cart'
        >
          <div className='cart__top'>
            <h5 className='cart__title'>Cart</h5>
            <img onClick={() => setModal(false)} className='cart__close' src={closeYellow} alt="close" />
          </div>
          <div className='cart__content'>
            {orderItems}
          </div>
          <div className='cart__order'>
            <div className='cart__order-price'>
              <span className='cart__order-price-text'>Order price:</span>
              <span className='cart__order-price-text'>{totalPrice} ₴</span>
            </div>
            <div className='cart__order-payable'>
              <span className='cart__order-payable-text'>Total payable:</span>
              <span className='cart__order-payable-text'>{totalPrice} ₴</span>
            </div>
            <button onClick={async () => {
              await dispatch(setTotalOrderPrice(totalPrice));
              await setModal(false);
              navigate('/order')
            }} className='cart__order-btn'>Order</button>
          </div>
        </section>
      </div>
    </>
  )
}

export default OrderCart;