import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import ProductCard from 'components/productCard/ProductCard';
import { useHttp } from 'hooks/http.hook';
import { setFavouriteProducts } from 'store/slices/userSlice';

import Spinner from 'components/userAlerts/spinner/Spinner';
import ErrorMessage from 'components/userAlerts/errorMessage/ErrorMessage';

import './favouriteProducts.scss';
import box from 'assets/userProfile/favouriteProducts/box.svg';

const FavouriteProducts = () => {
  const { favouriteProducts, email } = useSelector(state => state.user);
  const { getDocumentFieldItem, getDocumentFieldItemLoading, getDocumentFieldItemError } = useHttp();

  useEffect(() => {
    getDocumentFieldItem('users', setFavouriteProducts, email, 'favouriteProducts');
  }, [email]);

  const renderContentFunc = useMemo(() => {
    if (favouriteProducts.length >= 1) {
      return (
        <ul className='favouriteProducts'>
          {favouriteProducts.map(({ img, name, volumeOrWeight, price, isDescr }) => (
            <ProductCard
              key={name}
              img={img}
              name={name}
              weight={volumeOrWeight}
              volume={volumeOrWeight}
              price={price}
              descr={isDescr}
            />
          ))}
        </ul>
      );
    } else {
      return (
        <div className="emptyProfile">
          <img className="emptyProfile__img" src={box} alt="empty" />
          <div className="emptyProfile__title">No favourite products yet</div>
          <p className="emptyProfile__text">You can add your favorite item from the restaurant menu</p>
        </div>
      );
    }
  }, [favouriteProducts]);

  const errorMessage = getDocumentFieldItemError ? (
    <ErrorMessage
      styles={{
        width: '250px', 
        height: '250px',
        margin: 'auto auto'
      }}
    />
  ) : null;
  const loadingMessage = getDocumentFieldItemLoading ? (
    <Spinner
      styles={{
        margin: 'auto auto'
      }}
    />
  ) : null;
  const content = !(getDocumentFieldItemError || getDocumentFieldItemLoading) ? renderContentFunc : null;

  return (
    <>
      {loadingMessage}
      {errorMessage}
      {content}
    </>
  );

};

export default FavouriteProducts;