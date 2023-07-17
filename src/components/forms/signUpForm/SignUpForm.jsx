import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

import { setBasicUserData } from 'store/slices/userSlice';
import { setSignUpModal, setLoginModal } from 'store/slices/modalsSlice';

import './signUpForm.scss';
import close from 'assets/close/closeYellow.svg';

const Authentication = ({error, handleClick}) => {
  const dispatch = useDispatch();

  const handleSubmit = ({email, password}) => {
    handleClick(email, password)
  }

  const renderErrorFunc = () => {
    if ((!!error)) {
      return (
        <div className='signUp__error'>{error}</div>
      )
    }
  }

  const renderError = renderErrorFunc();

  return (
    <Formik
      initialValues = {{
        email: '',
        password: '',
      }}
      validationSchema = {
        Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Minimum 8 symbols')
            .required('Required'),
        })
      }      
      onSubmit = {handleSubmit}
    >
      {({isValid, dirty, isSubmitting}) => (
        <Form className='signUp__fields'>
          <h5 className='signUp__title'>Authentication</h5>
          <img onClick={() => dispatch(setSignUpModal(false))} className='signUp__close' src={close} alt="close modal" />
          <div className='signUp__descr'>Give a birthday present, save the shipping address and talk about promotions</div>

          <label className='signUp__label'>Email*</label>
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="email"
            className="signUp__input"
          />
          <ErrorMessage className='signUp__error' name="email" component="div" />

          <label className='signUp__label'>Password*</label>
          <Field
            id="password"
            name="password"
            type="text"
            placeholder="password"
            className="signUp__input"
          />
          <ErrorMessage className='signUp__error' name="password" component="div" />
          {renderError}

          <button 
            className="signUp__btn" 
            type='submit'
            disabled={!isValid || !dirty || isSubmitting} 
            style={{
              'backgroundColor': (!isValid || !dirty || isSubmitting) ? 'var(--input)' : 'var(--accent)',
              'color': (!isValid || !dirty || isSubmitting) ? 'var(--disabled)' : 'var(--accentContent)',
            }}
          >Authentication</button>
          <button onClick={() => {
            dispatch(setLoginModal(true))
            dispatch(setSignUpModal(false))
          }} className='signUp__btn signUp__btn-or'>Or Sign in</button>

        </Form>
      )}
    </Formik>
  )
}

const RegisterForm = ({handleClick}) => {
  const {email} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues = {{
        name: '',
        surname: '',
        birthday: '',
        gender: ''
      }}
      validationSchema = {
        Yup.object({
          name: Yup.string()
            .required('Required'),
          surname: Yup.string()
            .required('Required'),
          birthday: Yup.string()
            .required('Required'),
          gender: Yup.string()
            .required('Required')
        })
      }      
      onSubmit = { ({name, surname, birthday, gender}) => handleClick('users', setBasicUserData, name, surname, birthday, gender, email) }
    >
      <Form className='signUp__fields'>
        <h5 className='signUp__title'>Registration</h5>
        <img onClick={() => dispatch(setSignUpModal(false))} className='signUp__close' src={close} alt="close modal" />
        <div className='signUp__descr'>Give a birthday present, save the shipping address and talk about promotions</div>

        <label className='signUp__label'>Name*</label>
        <Field
          id="name"
          name="name"
          type="text"
          placeholder="name"
          className="signUp__input"
        />
        <ErrorMessage className='signUp__error' name="name" component="div" />

        <label className='signUp__label'>Surname*</label>
        <Field
          id="surname"
          name="surname"
          type="text"
          placeholder="surname"
          className="signUp__input"
        />
        <ErrorMessage className='signUp__error' name="surname" component="div" />

        <label className='signUp__label'>Birthday*</label>
        <Field
          id="birthday"
          name="birthday"
          type="text"
          placeholder="birthday"
          className="signUp__input"
        />
        <ErrorMessage className='signUp__error' name="birthday" component="div" />

        <label className='signUp__label'>Gender*</label>
        <Field
          id="gender"
          name="gender"
          as="select"
          className="signUp__input"
        >
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Not specified'>Not specified</option>
        </Field>
        <ErrorMessage className='signUp__error' name="gender" component="div" />

        <button className="signUp__btn" onClick={() => {
          navigate('/profile');
          dispatch(setSignUpModal(false));
          }} type='submit'>Register</button>

      </Form>
    </Formik>
  )
}

export { Authentication, RegisterForm};