import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './orderCart.scss';
import closeYellow from 'assets/close/closeYellow.svg';
import closeGrey from 'assets/close/closeGrey.svg';
import pizza from 'assets/productCard/productCardPizza.jpeg';
import minus from 'assets/minus/minusYellow.svg';
import plus from 'assets/plus/plusYellow.svg';

const OrderCart = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  if (modal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return (
    <>
      <div className='cart__button-wrapper'>
        <button onClick={() => setModal(true)} className='cart__button'>
          <span>Place and order for:</span>
          <span>373 ₴</span>
        </button>
      </div>

      <div 
        style={{
          'display': modal ? 'flex' : 'none'
        }}
        className='cart__wrapper'
      >

        <section
          style={{
            'display': modal ? 'flex' : 'none'
          }}
          className='cart'
        >
          <div className='cart__top'>
            <h5 className='cart__title'>Cart</h5>
            <img onClick={() => setModal(false)} className='cart__close' src={closeYellow} alt="close" />
          </div>
          <div className='cart__content'>
            <div className='cart__content-item'>
              <img className='cart__content-item-img' src={pizza} alt="pizza" />
              <div className='cart__content-item-rightBlock'>
                <div className='cart__content-item-top'>
                  <div className='cart__content-item-title'>Шинка з Грибами</div>
                  <img className='cart__content-item-delete' src={closeGrey} alt="delete" />
                </div>
                <div className='cart__content-item-bottom'>
                  <div className='cart__content-item-price'>129 ₴</div>
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
              <div></div>
            </div>
          </div>
          <div className='cart__order'>
            <div className='cart__order-price'>
              <span className='cart__order-price-text'>Order price:</span>
              <span className='cart__order-price-text'>373 ₴</span>
            </div>
            <div className='cart__order-payable'>
              <span className='cart__order-payable-text'>Total payable:</span>
              <span className='cart__order-payable-text'>373 ₴</span>
            </div>
            <button onClick={() => {
              navigate('/order')
              setModal(false);
            }} className='cart__order-btn'>Order</button>
          </div>
        </section>
      </div>
    </>
  )
}

export default OrderCart;