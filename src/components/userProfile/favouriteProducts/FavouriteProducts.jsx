import './favouriteProducts.scss';
import box from 'assets/userProfile/favouriteProducts/box.svg';

const FavouriteProducts = () => {
  return (
    <div className="emptyProfile">
      <img className="emptyProfile__img" src={box} alt="empty" />
      <div className="emptyProfile__title">No favourite products yet</div>
      <p className="emptyProfile__text">You can add your favorite item from the restaurant menu</p>
    </div>
  )
}

export default FavouriteProducts