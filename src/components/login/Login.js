import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuthData, setBasicUserData } from 'store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

import { useHttp } from "hooks/http.hook";
import LoginForm from '../forms/loginForm/LoginForm';
import './login.scss';

const Login = () => {
  const {loginModal} = useSelector(state => state.modals);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {getDataByDocument} = useHttp();

  const handleLogin = async (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        console.log(user);
        dispatch(setUserAuthData({
          email: user.email,
          id: user.uid,
          token: user.accessToken
        }))
        getDataByDocument('users', setBasicUserData, user.email)
      })
      .catch((error) => alert(error));
  }

  return (
    <div
    style={{
      'display': loginModal ? 'flex' : 'none'
    }}
    className="loginModal__wrapper"
    >
      <div
      style={{
        'display': loginModal ? 'flex' : 'none'
      }}
      className="loginModal"
      >
        <LoginForm
          handleClick={handleLogin}
        />
      </div>
    </div>
  )
}

export default Login;