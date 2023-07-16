import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppHeader from "components/appHeader/AppHeader"
import AppFooter from "components/appFooter/AppFooter"
import OrderForm from "components/forms/orderForm/OrderForm"

const OrderPage = () => {
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
      <OrderForm/>
      <AppFooter/>
    </>
  )
}

export default OrderPage