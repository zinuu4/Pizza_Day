import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../forms/loginForm/LoginForm';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        console.log(user);
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken
        }))
        navigate('/');
      })
      .catch((error) => alert('Invalid user!'));
  }

  return (
    <div>
      <LoginForm
        title="Sign in"
        handleClick={handleLogin}
      />
    </div>
  )
}

export default Login;