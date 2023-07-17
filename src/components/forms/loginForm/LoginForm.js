import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { setLoginModal, setSignUpModal } from 'store/slices/modalsSlice';
import close from 'assets/close/closeYellow.svg';

const LoginForm = ({handleClick}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = ({email, password}) => {
    dispatch(setLoginModal(false));
    handleClick(email, password);
  }

  return (
    <Formik
      initialValues = {{
        email: '',
        password: '',
      }}
      validationSchema={
        Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Minimum 8 symbols')
            .required('Required'),
        })
      }
      onSubmit={ handleSubmit }
    >
      {({isValid, dirty, isSubmitting}) => (
      <Form>
        <h5 className='login__title'>Sign in</h5>
        <img onClick={() => dispatch(setLoginModal(false))} className='signUp__close' src={close} alt="close modal" />
        <div className='signUp__descr'>Give a birthday present, save the shipping address and talk about promotions</div>

        <label className='login__label'>Email*</label>
        <Field
          id="email"
          name="email"
          type="email"
          placeholder="email"
          className="login__input"
        />
        <ErrorMessage className='login__error' name="email" component="div" />

        <label className='login__label'>Password*</label>
        <Field
          id="password"
          name="password"
          type="text"
          placeholder="password"
          className="login__input"
        />
        <ErrorMessage className='login__error' name="password" component="div" />

        <button  
          className='login__btn' 
          type='submit'
          disabled={!isValid || !dirty || isSubmitting} 
          style={{
            'backgroundColor': (!isValid || !dirty || isSubmitting) ? 'var(--input)' : 'var(--accent)',
            'color': (!isValid || !dirty || isSubmitting) ? 'var(--disabled)' : 'var(--accentContent)',
          }}
        >Sign in</button>

        <button 
        onClick={() => {
          dispatch(setLoginModal(false))
          dispatch(setSignUpModal(true))
        }} 
        className='login__btn login__btn-or'
        >Or Sign up</button>

      </Form>
      )}
    </Formik>
  )
}

export default LoginForm;