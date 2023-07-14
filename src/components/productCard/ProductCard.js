import pizza from 'assets/productCard/productCardPizza.jpeg';
import heart from 'assets/productCard/productCardHeart.svg';
import plusWhite from 'assets/productCard/productCardPlusWhite.svg';
import plusYellow from 'assets/productCard/plusYellow.svg';
import minus from 'assets/productCard/minus.svg';
import close from 'assets/productCard/close.svg';

import './productCard.scss';
import { useEffect, useState } from 'react';

const ProductCard = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <li onClick={() => setOpenModal(true)} className='card'>

        <div className='card__image-wrapper'>
          <img className='card__image' src={pizza} alt="Pizza" />
          <span className='card__grams'>430 g</span>
        </div>

        <div className='card__info'>

          <div className='card__title-wrapper'>
            <h5 className='card__title'>Pepperoni</h5>
            <div className='card__favorite'>
              <img className='card__favorite-img' src={heart} alt='favorite' />
            </div>
          </div>

          <div className='card__descr'>Pepperoni, Italian herbs, mozzarella...</div>

          <div className='card__price-wrapper'>
            <div className='card__price'>155 ₴</div>
            <button className='card__plus-btn'>
              <img className='card__plus-img' src={plusWhite} alt="Plus" />
            </button>
          </div>

        </div>
      </li>
      <ProductCardModal openModal={openModal}/>
    </>
  )
}

const ProductCardModal = ({openModal}) => {
  const [modal, setModal] = useState(null);
  useEffect(() => {
    setModal(openModal)
  }, [openModal])

  if (modal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return (
    <div
      style={{
        'display': modal ? 'flex' : 'none'
      }}
      className='modal__productCard__wrapper'
    >
      <div
        style={{
          'display': modal ? 'flex' : 'none'
        }}
        className='modal__productCard'
      >
        <img onClick={() => setModal(false)} className='card__close' src={close} alt='close' />
        <img className='modal__productCard__img' src={pizza} alt="pizza" />
        <div className='modal__productCard__title-wrapper'>
          <div className='modal__productCard__title'>Pepperoni</div>
          <div className='card__favorite'>
            <img className='card__favorite-img' src={heart} alt='favorite' />
          </div>
        </div>
        <div className='modal__productCard__grams'>430 g</div>
        <div className='modal__productCard__price'>155 ₴</div>
        <div className='modal__productCard__descr'>Pepperoni, Italian herbs, mozzarella, special sauce</div>
        <div className='modal__productCard__orderModification-title'>Персональне замовлення до Пепероні</div>
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
          <button className='modal__productCard__add-btn'>
            <span className='modal__productCard__text'>Add:</span>
            <span style={{'fontWeight': '500'}}>155 ₴</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;