import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import AppHeader from 'components/appHeader/AppHeader';
import AppFooter from 'components/appFooter/AppFooter';
import Menu from 'components/menu/Menu';
import Banner from 'components/banner/Banner';
import MainSlider from 'components/mainSlider/MainSlider';
import OrderCart from 'components/orderCart/OrderCart';

const MainPage = () => {
  const {chosenRestaurant} = useSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    const boolValue = !!chosenRestaurant.name;
    if (!boolValue) {
      navigate('/address');
    }
  }, [chosenRestaurant, navigate]);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Pizza Day"
        />
        <title>Pizza Day</title>
      </Helmet>
      <AppHeader/>
      <Banner/>
      <MainSlider/>
      <Menu/>
      <OrderCart/>
      <AppFooter/>
    </>
  );
};

export default MainPage;