import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { setHistoryOfOrders } from 'store/slices/userSlice';
import { useHttp } from 'hooks/http.hook';

import './historyOfOrders.scss';
import box from 'assets/userProfile/favouriteProducts/box.svg';
import order from 'assets/userProfile/sideMenu/check.svg';

import Spinner from 'components/userAlerts/spinner/Spinner';
import ErrorMessage from 'components/userAlerts/errorMessage/ErrorMessage';

const HistoryOfOrders = () => {
  const { email, historyOfOrders } = useSelector(state => state.user);
  const { getDataByDocument, getDataByDocumentLoading, getDataByDocumentError } = useHttp();

  useEffect(() => {
    getDataByDocument("orders", setHistoryOfOrders, email);
  }, [email])

  const renderContentFunc = () => {
    if (historyOfOrders.orders?.length >= 1) {
      return (
        <ul className='ordersHistory'>
          {
            historyOfOrders.orders.map(({date, id, orderPrice, receivingMethod, time}) => {
              return (
                <div className='ordersHistory__order' key={id}>
  
                  <img src={order} alt="order" />
  
                  <div className='ordersHistory__info'>
                    <div className='ordersHistory__fields-wrapper'>
  
                      <div className='ordersHistory__id-wrapper'>
                      <span className='circle ordersHistory__circle'></span>
                      <div className='ordersHistory__info ordersHistory__id'>Order №: {id.substring(0, 12)}...</div>
                      </div>
  
                      <div className='ordersHistory__info ordersHistory__date'>Date {date} at {time}</div>
                    </div>
  
                    <div className='ordersHistory__fields-wrapper'>
                      <div className='ordersHistory__info ordersHistory__price'>Order price: {orderPrice} ₴</div>
                      <div className='ordersHistory__info ordersHistory__receiving'>Receiving: {receivingMethod}</div>
                    </div>
                  </div>
  
  
                </div>
              )
            })
          }
        </ul>
      )
    } else {
      return (
        <div className="emptyProfile">
          <img className="emptyProfile__img" src={box} alt="empty" />
          <div className="emptyProfile__title">While it's empty here</div>
          <p className="emptyProfile__text">Go to the menu to place your first order.</p>
        </div>
      )
    }
  }

  const renderedContent = renderContentFunc();

  const errorMessage = getDataByDocumentError ? (
    <ErrorMessage
      styles={{
        width: '250px', 
        height: '250px',
        margin: 'auto auto'
      }}
    />
    ) : null;
  const loadingMessage = getDataByDocumentLoading ? (
    <Spinner
      styles={{
        margin: 'auto auto'
      }}
    />
  ) : null;
  const content = !(getDataByDocumentError || getDataByDocumentLoading) ? renderedContent : null;

  return (
    <>
      {loadingMessage}
      {errorMessage}
      {content}
    </>
  )
}

export default HistoryOfOrders;