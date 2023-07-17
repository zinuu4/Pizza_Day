import box from 'assets/userProfile/favouriteProducts/box.svg';

const HistoryOfOrders = () => {
  return (
    <div className="emptyProfile">
      <img className="emptyProfile__img" src={box} alt="empty" />
      <div className="emptyProfile__title">While it's empty here</div>
      <p className="emptyProfile__text">Go to the menu to place your first order.</p>
    </div>
  )
}

export default HistoryOfOrders