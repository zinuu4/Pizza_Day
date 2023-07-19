import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { setTotalOrderPrice, setOrder } from 'store/slices/userSlice';

import './orderForm.scss';
import plus from 'assets/plus/plusYellow.svg';

const MyTextInput = ({label, value, ...props}) => {
  const [field, meta] = useField(props);
  return (
      <>
          <label className='form__label' htmlFor={props.name}>{label}</label>
          <input readOnly={label === 'Receiving method*'} style={{
            'border': meta.error && meta.error ? '1px solid red' : 'none'
          }} {...props} {...field}/>
          {meta.error && meta.error ? (
              <div className='form__error'>{meta.error}</div>
          ) : null}
      </>
  )
};

const OrderForm = () => {
  const {mergedOrder, chosenRestaurant, totalOrderPrice} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [numberOfPersons, setNumberOfPersons] = useState(1);

  const orderedItems = mergedOrder.map(({name, weight, price, quantity, additives}, index) => {
    const renderAdditivesFunc = () => {
      if (additives) {
        return (
          additives.map(({title, price}) => {
            return (
              <div>{title}</div>
            )
          })
        )
      } else {
        return null;
      }
    }
    const renderAdditives = renderAdditivesFunc();
    return (
      <div key={index} className='form__submit__item'>
        <div className='form__submit__item-top'>
          <div className='form__submit__item-title'>{name}</div>
          <div className='form__submit__item-amount'>x {quantity}</div>
        </div>
        <div className='form__submit__item-bottom'>
          <div className='form__submit__item-weight'>{weight}</div>
          <div className='form__submit__item-price'>{price}</div>
        </div>
        {renderAdditives}
      </div>
    )
  })

  const onSubmit = (values, { resetForm }) => {
    console.log(JSON.stringify(values, null, 2), `numberOfPersons: ${numberOfPersons}`);

    dispatch(setTotalOrderPrice(0));
    dispatch(setOrder([]));

    navigate('/order/8573')

    resetForm();
  };

  const minusStrokeColor = numberOfPersons == 1 ? '#f0f0f0' : '#faaf3f';

  const svgMinus = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

    <g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"/> <path d="M6 12H18" stroke={minusStrokeColor} strokeLinecap="round" strokeLinejoin="round"/> </g>

    </svg>
  );

  return (
    <section className='order'>
      <div className='container'>
        <Formik
          initialValues = {{
            name: '',
            phone: '',
            rulesAgreement: false,
            receivingMethod: chosenRestaurant,
            time: '',
            cashPayment: true,
            cardPayment: false,
            numberOfPerson: null,
            comment: ''
          }}
          validationSchema={
            Yup.object({
              name: Yup.string()
                .required('This field is required'),
              phone: Yup.string()
                .matches(/^\+(?:[0-9]?[\(\)\-\s]?){6,14}[0-9]$/, 'Invalid phone number')
                .required('This field is required'),
              rulesAgreement: Yup.boolean()
                .required('Сonsent required')
                .oneOf([true], 'Сonsent required')
            })
          }
          onSubmit={onSubmit}
        >
          {({ isValid, dirty, isSubmitting }) => (
          <Form className='form'>

            <div className='form__data'>
              <h4 className='form__title'>Contacts</h4>

              <MyTextInput
                label='Your name*'
                id="name"
                name="name"
                type="text"  
                placeholder="Enter your name"
                className="form__input-text"
              />

              <MyTextInput
                label='Phone*'
                id="phone"
                name="phone"
                type="text"  
                placeholder="Enter your phone" 
                className="form__input-text"
              />

              <label className='form__label-checkbox' htmlFor="checkbox">
                <Field
                  name="rulesAgreement" 
                  type="checkbox"
                />
                <p>I agree with the rules</p><a target='_blank' href='https://www.eatery.club/privacy_policy.pdf'>for the processing of personal data</a>
              </label>
              <ErrorMessage className='form__error' name='rulesAgreement' component='div'/>
              <p className='form__info'>Your number after ordering will be automatically entered into our database.</p>

              <h4 className='form__title'>How to obtain</h4>
              <MyTextInput
                label='Receiving method*'
                id="receivingMethod"
                name="receivingMethod"
                type="text"
                className="form__input-text"
              />

              <h4 className='form__title'>Delivery time</h4>
              <Field
                id="time"
                name="time"
                as="select"
                className="form__select-time"
              >
                    <option value="17:00">17:00 - 17:15</option>
                    <option value="17:15">17:15 - 17:30</option>
              </Field>

            <h4 className='form__title'>Payment method</h4>
            <div className='form__paymentMethod__wrapper'>
              <label className='form__paymentMethod__label'>
                  <Field 
                      name="cashPayment" 
                      type="checkbox"
                  />
                  <p>Cash</p>
              </label>
              <label className='form__paymentMethod__label'>
                  <Field 
                      name="cardPayment" 
                      type="checkbox"
                  />
                  <p>By card upon receipt</p>
              </label>
            </div>

            <h4 className='form__title'>Number of persons</h4>
            <div className='counter__wrapper'>
              <button
              disabled={numberOfPersons == 1}
              onClick={() => {
                setNumberOfPersons(prev => prev - 1);
              }} 
              className='counter__btn'
              style={{
                'borderColor': numberOfPersons == 1 ? 'var(--input)' : 'var(--accent)'
              }}
              type='button'
              >
                <span>{svgMinus}</span>
              </button>
              <span className='counter'>{numberOfPersons}</span>
              <button
              onClick={() => {
                setNumberOfPersons(prev => prev + 1);
              }} 
              className='counter__btn'
              style={{
                'borderColor': 'var(--accent)'
              }}
              type='button'
              >
                <img src={plus} alt="counter plus" />
              </button>
            </div>

            <h4 className='form__subtitle'>Comment to the order</h4>
            <Field 
                id="comment"
                name="comment"
                as="textarea"
                placeholder="Comment"
                className="form__textarea-comment"
            />
            </div>
            <div className='form__submit'>
              <h4 className='form__title'>Your order</h4>
              {orderedItems}
              <div className='form__submit__orderPrice'>
                <span>Order price:</span>
                <span>{totalOrderPrice} ₴</span>
              </div>
              <div className='form__submit__totalPayable'>
                <span>Total payable:</span>
                <span>{totalOrderPrice} ₴</span>
              </div>
              <button 
              disabled={!isValid || !dirty || isSubmitting} 
              style={{
                'backgroundColor': (!isValid || !dirty || isSubmitting) ? 'var(--input)' : 'var(--accent)',
                'color': (!isValid || !dirty || isSubmitting) ? 'var(--disabled)' : 'var(--accentContent)',
              }}
              className='form__submit__btn'
              >Pay {totalOrderPrice} ₴</button>
              <Link className='form__link-back' to='/'>
                Back to menu
              </Link>
            </div>

          </Form>
          )}

        </Formik>
      </div>
    </section>
  )
}

export default OrderForm