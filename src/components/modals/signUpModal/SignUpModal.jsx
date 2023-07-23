import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuthData } from 'store/slices/userSlice';

import { Authentication, RegisterForm } from '../../forms/signUpForm/SignUpForm';
import { setSignUpModal } from 'store/slices/modalsSlice';
import { useHttp } from 'hooks/http.hook';
import useModalToggle from 'hooks/modalToggleFunctionality';

import './signUpModal.scss';

const SignUpModal = () => {
  const { signUpModal } = useSelector(state => state.modals);

  const [authentication, setAuthentication] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const dispatch = useDispatch();
  
  const { postUserData } = useHttp();

  const handleAuthentication = (email, password) => {
    const auth = getAuth();
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
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

  const {setScroll, handleWrapperClickDispatch} = useModalToggle();
  setScroll(signUpModal);
  
  if (!authentication) {
    return (
      <>
        {signUpModal && (
          <div className="modal__wrapper" onClick={(e) => handleWrapperClickDispatch(e, setSignUpModal)}>
            <div className="modal signUpModal">
              <Authentication
                handleClick={handleAuthentication}
                error={submitError}
              />
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {signUpModal && (
          <div className="modal__wrapper">
            <div className="modal signUpModal">
              <RegisterForm
                handleClick={postUserData}/>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default SignUpModal;