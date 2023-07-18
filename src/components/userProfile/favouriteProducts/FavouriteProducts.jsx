import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import ProductCard from 'components/productCard/ProductCard';
import { useHttp } from 'hooks/http.hook';
import { setFavouriteProducts } from 'store/slices/userSlice';

import './favouriteProducts.scss';
import box from 'assets/userProfile/favouriteProducts/box.svg';

const FavouriteProducts = () => {
  const {favouriteProducts, email} = useSelector(state => state.user);
  const {getDocumentFieldItem} = useHttp();

  useEffect(() => {
    getDocumentFieldItem("users", setFavouriteProducts, email, 'favouriteProducts');
  }, [email])

  if (favouriteProducts.length >= 1) {
    return (
      <ul className='favouriteProducts'>
        {
        favouriteProducts.map(({img, name, volumeOrWeight, price, isDescr}) => {
          return (
            <ProductCard key={name} img={img} name={name} weight={volumeOrWeight} volume={volumeOrWeight} price={price} descr={isDescr}/>
          )
        })
      }
      </ul>
    )
  } else {
    return (
      <div className="emptyProfile">
        <img className="emptyProfile__img" src={box} alt="empty" />
        <div className="emptyProfile__title">No favourite products yet</div>
        <p className="emptyProfile__text">You can add your favorite item from the restaurant menu</p>
      </div>
    )
  }
}

export default FavouriteProducts