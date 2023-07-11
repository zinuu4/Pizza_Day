import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';

import useAuth from 'hooks/use-auth';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, email } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  if (isAuth) {
    return (
      <>
        <h1>Welcome</h1>
        <button onClick={() => dispatch(removeUser())}>Log out from {email}</button>
      </>
    );
  }

  return null;
};

export default MainPage;