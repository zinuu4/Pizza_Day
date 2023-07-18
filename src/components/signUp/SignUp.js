import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuthData } from 'store/slices/userSlice';

import { Authentication, RegisterForm } from "../forms/signUpForm/SignUpForm";
import { useHttp } from "hooks/http.hook";
import './signUp.scss';

const SignUp = () => {
  const {signUpModal} = useSelector(state => state.modals);
  const [authentication, setAuthentication] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const dispatch = useDispatch();
  const {postUserData} = useHttp();

  const handleAuthentication = (email, password) => {
    const auth = getAuth();
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUserAuthData({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        setAuthentication(true);
        setSubmitError(null);
      })
      .catch((error) => setSubmitError('User already exists'));
  };
  
  if (!authentication) {
    return (
      <div
      style={{
        'display': signUpModal ? 'flex' : 'none'
      }}
      className="signUpModal__wrapper"
      >
        <div
        style={{
          'display': signUpModal ? 'flex' : 'none'
        }}
        className="signUpModal"
        >
          <Authentication
            handleClick={handleAuthentication}
            error={submitError}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div
      style={{
        'display': signUpModal ? 'flex' : 'none'
      }}
      className="signUpModal__wrapper"
      >
        <div
        style={{
          'display': signUpModal ? 'flex' : 'none'
        }}
        className="signUpModal"
        >
          <RegisterForm
            handleClick={postUserData}
          />
        </div>
      </div>
    )
  }
}

export default SignUp;