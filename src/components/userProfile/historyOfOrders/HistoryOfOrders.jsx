import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { setHistoryOfOrders } from 'store/slices/userSlice';
import { useHttp } from 'hooks/http.hook';

import './historyOfOrders.scss';
import box from 'assets/userProfile/favouriteProducts/box.svg';

const HistoryOfOrders = () => {
  const { email, historyOfOrders } = useSelector(state => state.user);
  const { getDataByDocument } = useHttp();

  useEffect(() => {
    getDataByDocument("orders", setHistoryOfOrders, email);
  }, [email])

  const renderContentFunc = () => {
    if (historyOfOrders) {
      return (
        <>
          {
            historyOfOrders.orders.map((order) => {
              return (
                <div onClick={() => console.log(order)}>fwefwe</div>
              )
            })
          }
        </>
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

  const renderContent = renderContentFunc();

  return (
    <ul className='ordersHistory'>
      {renderContent}
    </ul>
  )
}

export default HistoryOfOrders;