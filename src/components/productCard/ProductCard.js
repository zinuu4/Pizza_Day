import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToOrder } from 'store/slices/userSlice';
import { modalToggleFunctional } from 'services/modalToggleFunctional';
import { useHttp } from 'hooks/http.hook';
import { setFavouriteProducts } from 'store/slices/userSlice';

import plusWhite from 'assets/plus/PlusWhite.svg';
import plusYellow from 'assets/plus/plusYellow.svg';
import close from 'assets/close/closeGrey.svg';

import './productCard.scss';

const ProductCard = ({img, name, weight, volume, price, descr, id, additives}) => {
  const {email, favouriteProducts} = useSelector(state => state.user);
  const [modal, setModal] = useState(false);
  const [isItFavProducts, setIsItFavProducts] = useState(false);
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const {postFavouriteProduct, deleteFavouriteProduct} = useHttp();
  const [choosenAdditives, setChoosenAdditives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(parseInt(price.replace(/[^\d]/g, "")));

  useEffect(() => {
    const isProductInFavourites = favouriteProducts.some((product) => product.name === name);
    setIsItFavProducts(isProductInFavourites);
  }, [favouriteProducts, name]);

  const plusCounter = () => {
    setCounter(counter => counter + 1)
  }

  const minusCounter = () => {
    setCounter(counter => counter - 1)
  }

  const handleClick = () => {
    if (!isItFavProducts) {
      const volumeOrWeight = volume || weight;
      const isDescr = descr || null;
      postFavouriteProduct('users', email, {img, name, volumeOrWeight, price, isDescr})
      setIsItFavProducts(true);
    } else if (isItFavProducts) {
      deleteFavouriteProduct('users', email, setFavouriteProducts, name)
      setIsItFavProducts(false);
    }
  };


  const {setScroll, handleWrapperClick} = modalToggleFunctional();
  setScroll(modal)

  const minusStrokeColor = counter == 1 ? '#f0f0f0' : '#faaf3f';

  const svgMinus = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

    <g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"/> <path d="M6 12H18" stroke={minusStrokeColor} strokeLinecap="round" strokeLinejoin="round"/> </g>

    </svg>
  );

  const heartFill = isItFavProducts ? '#faaf3f' : '#fff'

  const svgHeart = (
    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#faaf3f">

    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

    <g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill={heartFill}/> </g>

    </svg>
  )

  const renderAdditivesFunc = () => {
    if (additives) {
      return additives.map(({ title, price }) => {
        return (
          <li key={title} className='modal__productCard__orderModification-item'>
            <label className='modal__productCard__orderModification-item-label'>
              <input
                onClick={() =>
                  setChoosenAdditives(prevAdditives => {
                    if (prevAdditives.some(item => item.title === title)) {
                      setTotalPrice(prevPrice => prevPrice - parseInt(price));
                      return prevAdditives.filter(additive => additive.title !== title);
                    } else {
                      setTotalPrice(prevPrice => prevPrice + parseInt(price));
                      return [...prevAdditives, { title, price }];
                    }
                  })
                }
                type="checkbox"
                className='modal__productCard__orderModification-checkbox'
              />
              <span className='modal__productCard__orderModification-type'>{title}</span>
              <span className='modal__productCard__orderModification-price'>{price} ₴</span>
            </label>
          </li>
        );
      });
    } else {
      return null;
    }
  };  

  const renderAdditives = renderAdditivesFunc();

  return (
    <>
      <li onClick={() => setModal(true)} className='card'>

        <div className='card__image-wrapper'>
          <img onClick={() => console.log(choosenAdditives)}  className='card__image' src={img} alt={name} />
          <span className='card__grams'>{weight || volume}</span>
        </div>

        <div className='card__info'>

          <div className='card__title-wrapper'>
            <h5 className='card__title'>{name}</h5>
            <div className='card__favorite'>
              <span>{svgHeart}</span>
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
          <div 
            onClick={() => {
              handleClick();
            }} 
            className='card__favorite'
          >
            <span>{svgHeart}</span>
          </div>
        </div>
        <div className='modal__productCard__grams'>{weight || volume}</div>
        <div className='modal__productCard__price'>{price}</div>
        <div className='modal__productCard__descr'>{descr}</div>
        <div className='modal__productCard__orderModification-title'>Additives to {name}</div>
        <ul className='modal__productCard__orderModification-list'>
          {renderAdditives}
        </ul>
        <div className='modal__productCard__bottom'>
          <div className='counter__wrapper'>
            <button 
              onClick={() => {
                minusCounter()
              }} 
              disabled={counter == 1}
              style={{
                'borderColor': counter == 1 ? 'var(--input)' : 'var(--accent)'
              }}
              className='counter__btn'
            >
              <span className='counter__minus'>{svgMinus}</span>
            </button>
            <span className='counter'>{counter}</span>
            <button
              onClick={() => {
                plusCounter()
              }} 
              className='counter__btn'
              style={{
                'borderColor': 'var(--accent)'
              }}
            >
              <img src={plusYellow} alt="counter plus" />
            </button>
          </div>
          <button
          onClick={async () => {
            const items = [];
            for (let i = 0; i < counter; i++) {
              items.push({ img, name, weight, volume, price, descr, id, additives: choosenAdditives });
            }
            console.log(items);
            await dispatch(addItemToOrder(items))
            await setModal(false)
          }} 
          className='modal__productCard__add-btn'
          >
            <span className='modal__productCard__text'>Add:</span>
            <span style={{'fontWeight': '500'}}>{totalPrice * counter} ₴</span>
          </button>
        </div>
      </div>
    </div>

    </>
  )
}

export default ProductCard;