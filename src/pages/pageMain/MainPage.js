import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';

import AppHeader from 'components/appHeader/AppHeader';
import AppFooter from 'components/appFooter/AppFooter';

import useAuth from 'hooks/use-auth';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, email } = useAuth();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate('/login');
  //   }
  // }, [isAuth, navigate]);

  return (
    <>
      <AppHeader/>
      {/* <button onClick={() => dispatch(removeUser())}>Log out from {email}</button> */}
      <AppFooter/>
    </>
  );
};

export default MainPage;