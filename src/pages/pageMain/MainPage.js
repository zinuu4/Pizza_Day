import { Helmet } from "react-helmet";

import AppHeader from "components/appHeader/AppHeader";
import AppFooter from "components/appFooter/AppFooter";
import Menu from "components/menu/Menu";
import Banner from "components/banner/Banner";
import MainSlider from "components/mainSlider/MainSlider";
import OrderCart from "components/orderCart/OrderCart";

const MainPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Pizza Day" />
        <title>Pizza Day</title>
      </Helmet>
      <AppHeader />
      <Banner />
      <MainSlider />
      <Menu />
      <OrderCart />
      <AppFooter />
    </>
  );
};

export default MainPage;
