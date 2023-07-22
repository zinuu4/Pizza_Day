import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

import { setReviewModal } from 'store/slices/modalsSlice';
import { useHttp } from 'hooks/http.hook';
import useModalToggle from 'hooks/modalToggleFunctionality';

import './reviewModal.scss';
import close from 'assets/close/closeYellow.svg';

const ReviewModal = () => {
  const { reviewModal } = useSelector(state => state.modals);
  const { name, email } = useSelector(state => state.user);
  
  const [gratitudeModal, setGratitudeModal] = useState(false);

  const { postReview } = useHttp();

  const dispatch = useDispatch();

  const {setScroll, handleWrapperClick, handleWrapperClickDispatch} = useModalToggle();
  setScroll(reviewModal);
  setScroll(gratitudeModal);

  const handleSubmit = ({name, email, review}, { resetForm }) => {
    postReview('reviews', name, email, review);
    dispatch(setReviewModal(false));
    setGratitudeModal(true);
    resetForm();
    setTimeout(() => setGratitudeModal(false), 5000);
  }

  const MemoizedReviewModal = React.memo(() => (
    <div className="modal__wrapper" onClick={(e) => handleWrapperClickDispatch(e, setReviewModal)}>
      <div className="modal reviewModal animate__animated animate__fadeInUp custom-animation">

        <div className="reviewModal__top">
          <div className="reviewModal__title">Give feedback</div>
          <img onClick={() => dispatch(setReviewModal(false))} className='reviewModal__close' src={close} alt="Close review modal" />
        </div>

        <div className='reviewModal__content'>
          <div className='reviewModal__address'>Pizza Day near Most-City, Lamana street, 2A</div>

          <Formik
            initialValues={{
              name: name || '',
              email: email || '',
              review: '',
              rulesAgreement: false,
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .required('This field is required'),
              email: Yup.string()
                .email('Invalid email')
                .required('This field is required'),
              review: Yup.string()
                .required('This field is required'),
              rulesAgreement: Yup.boolean()
                .oneOf([true], 'Consent required'),
            })}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty }) => (
              <Form className='reviewModal__form'>

                <label className='reviewModal__input-label' htmlFor="name">Your name*</label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="reviewModal__input"
                />
                <ErrorMessage className='form__error' name='name' component='div'/>

                <label className='reviewModal__input-label' htmlFor="email">Your email*</label>
                <Field
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  className="reviewModal__input"
                />
                <ErrorMessage className='form__error' name='email' component='div'/>

                <div className='reviewModal__textarea-divider'></div>
                <Field
                  id="review"
                  name="review"
                  as="textarea"
                  placeholder="Enter your review"
                  className="reviewModal__textarea"
                />
                <ErrorMessage className='form__error' name='review' component='div'/>

                <div className="reviewModal__checkbox-wrapper">
                  <Field
                    id="rulesAgreement"
                    name="rulesAgreement"
                    type="checkbox"
                  />
                  <div> I agree with the rules <a href="https://www.eatery.club/privacy_policy.pdf">for the processing of personal data</a></div>
                </div>
                <ErrorMessage className='form__error' name='rulesAgreement' component='div'/>

                <button
                  disabled={!isValid || !dirty}
                  style={{
                    backgroundColor: !isValid || !dirty ? 'var(--input)' : 'var(--accent)',
                    color: !isValid || !dirty ? 'var(--disabled)' : 'var(--accentContent)',
                  }}
                  className='reviewModal__btn'
                  type='submit'
                >
                  Post a review
                </button>
              </Form>
            )}
          </Formik>

        </div>

      </div>
    </div>
  ))

  const MemoizedGratitudeModal = React.memo(() => (
    <div onClick={(e) => handleWrapperClick(e, setGratitudeModal)} style={{'display': gratitudeModal ? 'flex' : 'none'}} className='modal__wrapper'>
      <div style={{'display': gratitudeModal ? 'flex' : 'none'}} className='modal gratitudeModal'>
        <img onClick={() => setGratitudeModal(false)} className='gratitudeModal__close' src={close} alt="close modal" />
        <div className='gratitudeModal__status'>Successfully sent</div>
        <div className='gratitudeModal__gratitude'>Thanks for your review!</div>
      </div>
    </div>
  ))

  return (
    <>
      {reviewModal && <MemoizedReviewModal />}
      {gratitudeModal && <MemoizedGratitudeModal />}
    </>
  )
}

export default ReviewModal;