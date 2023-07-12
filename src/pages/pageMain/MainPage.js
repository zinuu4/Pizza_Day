import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppHeader from 'components/appHeader/AppHeader';
import AppFooter from 'components/appFooter/AppFooter';
import Menu from 'components/menu/Menu';

const MainPage = () => {
  const {deliveryAddress} = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const boolValue = !!deliveryAddress;
    console.log(deliveryAddress);
    console.log(boolValue);
    if (!boolValue) {
      navigate('/address');
    }
  }, [deliveryAddress, navigate]);

  return (
    <>
      <AppHeader/>
      <Menu/>
      <AppFooter/>
    </>
  );
};

export default MainPage;