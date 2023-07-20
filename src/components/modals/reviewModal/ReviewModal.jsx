import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

import { setReviewModal } from 'store/slices/modalsSlice';

import './reviewModal.scss';
import close from 'assets/close/closeYellow.svg';

const ReviewModal = () => {
  const {reviewModal} = useSelector(state => state.modals);

  const dispatch = useDispatch();

  return (
    <div 
    style={{
      'display': reviewModal ? 'flex' : 'none'
    }}
    className="modal__wrapper">
      <div 
      style={{
        'display': reviewModal ? 'flex' : 'none'
      }}
      className="modal reviewModal">

        <div className="reviewModal__top">
          <div className="reviewModal__title">Give feedback</div>
          <img onClick={() => dispatch(setReviewModal(false))} className='reviewModal__close' src={close} alt="Close review modal" />
        </div>

        <div className='reviewModal__content'>
          <div className='reviewModal__address'>Pizza Day near Most-City, Lamana street, 2A</div>

          <Formik
            initialValues={{
              name: '',
              phone: '',
              review: '',
              rulesAgreement: false,
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .required('This field is required'),
              phone: Yup.string()
                .matches(/^\+(?:[0-9]?[\(\)\-\s]?){6,14}[0-9]$/, 'Invalid phone number')
                .required('This field is required'),
              review: Yup.string()
                .required('This field is required'),
              rulesAgreement: Yup.boolean()
                .oneOf([true], 'Consent required'),
            })}
            onSubmit={(values) => {
              console.log(values)
              dispatch(setReviewModal(false))
            }}
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

                <label className='reviewModal__input-label' htmlFor="phone">Your phone*</label>
                <Field
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Enter your phone"
                  className="reviewModal__input"
                />
                <ErrorMessage className='form__error' name='phone' component='div'/>

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
  )
}

export default ReviewModal;