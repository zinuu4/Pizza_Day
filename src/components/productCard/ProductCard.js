import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addItemToOrder } from 'store/slices/userSlice';
import { modalToggleFunctional } from 'services/modalToggleFunctional';

import heart from 'assets/productCard/productCardHeart.svg';
import plusWhite from 'assets/plus/PlusWhite.svg';
import plusYellow from 'assets/plus/plusYellow.svg';
import minus from 'assets/minus/minusYellow.svg';
import close from 'assets/close/closeGrey.svg';

import './productCard.scss';

const ProductCard = ({img, name, weight, volume, price, descr, id}) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const {setScroll, handleWrapperClick} = modalToggleFunctional();
  setScroll(modal)

  return (
    <>
      <li onClick={() => setModal(true)} className='card'>

        <div className='card__image-wrapper'>
          <img className='card__image' src={img} alt={name} />
          <span className='card__grams'>{weight || volume}</span>
        </div>

        <div className='card__info'>

          <div className='card__title-wrapper'>
            <h5 className='card__title'>{name}</h5>
            <div className='card__favorite'>
              <img className='card__favorite-img' src={heart} alt='favorite' />
            </div>
          </div>

          <div className='card__descr'>{descr}</div>

          <div className='card__price-wrapper'>
            <div className='card__price'>{price}</div>
            <button className='card__plus-btn'>
              <img className='card__plus-img' src={plusWhite} alt="Plus" />
            </button>
          </div>

        </div>
      </li>

      <div
      style={{
        'display': modal ? 'flex' : 'none'
      }}
      onClick={(e) => handleWrapperClick(e, setModal)}
      className='modal__productCard__wrapper'
    >
      <div
        style={{
          'display': modal ? 'flex' : 'none'
        }}
        className='modal__productCard'
      >
        <img onClick={() => setModal(false)} className='card__close' src={close} alt='close' />
        <img className='modal__productCard__img' src={img} alt={name} />
        <div className='modal__productCard__title-wrapper'>
          <div className='modal__productCard__title'>{name}</div>
          <div className='card__favorite'>
            <img className='card__favorite-img' src={heart} alt='favorite' />
          </div>
        </div>
        <div className='modal__productCard__grams'>{weight || volume}</div>
        <div className='modal__productCard__price'>{price}</div>
        <div className='modal__productCard__descr'>{descr}</div>
        <div className='modal__productCard__orderModification-title'>Personal order for {name}</div>
        <ul className='modal__productCard__orderModification-list'>
          <li className='modal__productCard__orderModification-item'>
            <label className='modal__productCard__orderModification-item-label'>
              <input type="checkbox" className='modal__productCard__orderModification-checkbox' />
              <span className='modal__productCard__orderModification-type'>Без італійських трав</span>
            </label>
          </li>
        </ul>
        <div className='modal__productCard__bottom'>
          <div className='modal__productCard__counter-wrapper'>
            <button className='modal__productCard__counter-btn'>
              <img src={minus} alt="counter minus" />
            </button>
            <span className='modal__productCard__counter'>1</span>
            <button className='modal__productCard__counter-btn'>
              <img src={plusYellow} alt="counter plus" />
            </button>
          </div>
          <button
          onClick={async () => {
            await dispatch(addItemToOrder({img, name, weight, volume, price, descr, id}))
            await setModal(false)
          }} 
          className='modal__productCard__add-btn'
          >
            <span className='modal__productCard__text'>Add:</span>
            <span style={{'fontWeight': '500'}}>{price}</span>
          </button>
        </div>
      </div>
    </div>

    </>
  )
}

export default ProductCard;