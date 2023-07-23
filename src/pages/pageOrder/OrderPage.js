import { Helmet } from 'react-helmet';

import AppHeader from 'components/appHeader/AppHeader';
import AppFooter from 'components/appFooter/AppFooter';
import OrderForm from 'components/forms/orderForm/OrderForm';

const OrderPage = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Order page"
        />
        <title>Order</title>
      </Helmet>
      <AppHeader/>
      <OrderForm/>
      <AppFooter/>
    </>
  );
};

export default OrderPage;