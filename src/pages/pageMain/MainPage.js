import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppHeader from 'components/appHeader/AppHeader';
import AppFooter from 'components/appFooter/AppFooter';
import { ProductCard } from 'components/productCard/ProductCard';

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
      <AppFooter/>
      <ProductCard/>
    </>
  );
};

export default MainPage;