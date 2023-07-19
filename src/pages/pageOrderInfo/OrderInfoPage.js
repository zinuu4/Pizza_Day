import { Helmet } from "react-helmet";
import AppFooter from "components/appFooter/AppFooter";
import AppHeader from "components/appHeader/AppHeader";
import OrderInfo from "components/orderInfo/OrderInfo";

const OrderInfoPage = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Order info page"
        />
        <title>Order info</title>
      </Helmet>
      <AppHeader/>
      <OrderInfo/>
      <AppFooter/>
    </>
  )
}

export default OrderInfoPage;