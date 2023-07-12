import pizza from '../../assets/productCard/productCardPizza.jpeg';
import heart from '../../assets/productCard/productCardHeart.svg';
import plus from '../../assets/productCard/productCardPlus.svg';

import './productCard.scss';

const ProductCard = () => {
  return (
    <li className='card'>

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
            <img className='card__plus-img' src={plus} alt="Plus" />
          </button>
        </div>

      </div>

    </li>
  )
}

const ProductCardFull = () => {

}

export {ProductCard, ProductCardFull};