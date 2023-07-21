import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuthData, setBasicUserData } from 'store/slices/userSlice';

import { useHttp } from "hooks/http.hook";
import LoginForm from '../../forms/loginForm/LoginForm';
import useModalToggle from 'hooks/modalToggleFunctionality';
import { setLoginModal } from "store/slices/modalsSlice";
import './loginModal.scss';

const LoginModal = () => {
  const {loginModal} = useSelector(state => state.modals);
  const dispatch = useDispatch();
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

  const {setScroll, handleWrapperClickDispatch} = useModalToggle();
  setScroll(loginModal)

  return (
    <div
    style={{
      'display': loginModal ? 'flex' : 'none'
    }}
    className="modal__wrapper loginModal__wrapper"
    onClick={(e) => handleWrapperClickDispatch(e, setLoginModal)}
    >
      <div
      style={{
        'display': loginModal ? 'flex' : 'none'
      }}
      className="modal loginModal"
      >
        <LoginForm
          handleClick={handleLogin}
        />
      </div>
    </div>
  )
}

export default LoginModal;