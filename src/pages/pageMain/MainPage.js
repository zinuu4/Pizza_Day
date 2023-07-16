import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    const boolValue = !!chosenRestaurant;
    if (!boolValue) {
      navigate('/address');
    }
  }, [chosenRestaurant, navigate]);

  return (
    <>
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