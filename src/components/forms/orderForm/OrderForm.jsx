import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import { setTotalOrderPrice, setOrder } from 'store/slices/userSlice';
import { setDeliveryModal } from 'store/slices/modalsSlice';
import { useHttp } from 'hooks/http.hook';

import './orderForm.scss';
import plus from 'assets/plus/plusYellow.svg';
import infoCircle from 'assets/infoCircle/infoCircle.svg';

const MyTextInput = ({label, value, ...props}) => {
  const [field, meta] = useField(props);
  return (
      <>
          <label className='orderForm__label' htmlFor={props.name}>{label}</label>
          <input readOnly={label === 'Receiving method*'} style={{
            'border': meta.error && meta.error ? '1px solid red' : 'none'
          }} {...props} {...field}/>
          {meta.error && meta.error ? (
              <div className='orderForm__error'>{meta.error}</div>
          ) : null}
      </>
  )
};

const OrderForm = () => {
  const {email, name, mergedOrder, chosenRestaurant, totalOrderPrice} = useSelector(state => state.user);

  const [numberOfPersons, setNumberOfPersons] = useState(1);

  const { postOrder } = useHttp();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(!!chosenRestaurant.address)) {
      navigate('/address')
    }
  }, [chosenRestaurant.address])

  const orderedItems = mergedOrder.map(({name, weight, price, quantity, additives}, index) => {
    const renderAdditivesFunc = () => {
      if (additives) {
        return (
          additives.map(({title}) => {
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
      <div key={index} className='orderForm__submit__item'>
        <div className='orderForm__submit__item-top'>
          <div className='orderForm__submit__item-title'>{name}</div>
          <div className='orderForm__submit__item-amount'>x {quantity}</div>
        </div>
        <div className='orderForm__submit__item-bottom'>
          <div className='orderForm__submit__item-weight'>{weight}</div>
          <div className='orderForm__submit__item-price'>{price}</div>
        </div>
        {renderAdditives}
      </div>
    )
  })

  const minusStrokeColor = numberOfPersons == 1 ? '#f0f0f0' : '#faaf3f';

  const svgMinus = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

    <g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"/> <path d="M6 12H18" stroke={minusStrokeColor} strokeLinecap="round" strokeLinejoin="round"/> </g>

    </svg>
  );

  const [timeOptions, setTimeOptions] = useState(generateTimeOptions());

  function generateTimeOptions() {
    const interval = 15;
    const startTime = new Date();
    startTime.setMinutes(Math.ceil(startTime.getMinutes() / interval) * interval);
    const endTime = new Date(startTime);
    endTime.setHours(21, 59, 59, 999);

    const options = [];
    while (startTime <= endTime) {
      const formattedTime = startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const nextTime = new Date(startTime);
      nextTime.setTime(nextTime.getTime() + interval * 60000);
      const formattedNextTime = nextTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      options.push({ value: `${formattedTime} - ${formattedNextTime}`, label: `${formattedTime} - ${formattedNextTime}` });
      startTime.setTime(startTime.getTime() + interval * 60000);
    }

    return options;
  }

  const onSubmit = ({email, receivingMethod, time, cashPayment, cardPayment, numberOfPerson, comment}, { resetForm }) => {
    const currentDate = new Date();
    const date = currentDate.toISOString().slice(0, 10);

    postOrder({collectionName: 'orders', email, date, receivingMethod, time, cashPayment, cardPayment, numberOfPerson, comment, order: mergedOrder, id: uuidv4(), orderPrice: totalOrderPrice});

    dispatch(setTotalOrderPrice(0));
    dispatch(setOrder([]));

    navigate('/order/8573')

    resetForm();
  };

  return (
    <section className='order'>
      <div className='container'>
        <Formik
          initialValues = {{
            name: name || '',
            email: email || '',
            rulesAgreement: false,
            receivingMethod: chosenRestaurant.address,
            time: "",
            cashPayment: true,
            cardPayment: false,
            numberOfPerson: 1,
            comment: ""
          }}
          validationSchema={
            Yup.object({
              name: Yup.string()
                .required('This field is required'),
              email: Yup.string()
                .email('Invalid email')
                .required('This field is required'),
              rulesAgreement: Yup.boolean()
                .required('Сonsent required')
                .oneOf([true], 'Сonsent required')
            })
          }
          onSubmit={onSubmit}
        >
          {({ isValid, setFieldValue, dirty, isSubmitting }) => (
          <Form className='orderForm'>

            <div className='orderForm__data'>
              <h4 onClick={() => console.log(mergedOrder)} className='orderForm__title'>Contacts</h4>

              <MyTextInput
                label='Your name*'
                id="name"
                name="name"
                type="text"  
                placeholder="Enter your name"
                className="orderForm__input-text"
              />

              <MyTextInput
                label='Email*'
                id="email"
                name="email"
                type="text"  
                placeholder="Enter your email" 
                className="orderForm__input-text"
              />

              <label className='orderForm__label-checkbox' htmlFor="checkbox">
                <Field
                  name="rulesAgreement" 
                  type="checkbox"
                />
                <p>I agree with the rules</p><a target='_blank' href='https://www.eatery.club/privacy_policy.pdf'>for the processing of personal data</a>
              </label>
              <ErrorMessage className='orderForm__error' name='rulesAgreement' component='div'/>
              <p className='orderForm__info'>Your number after ordering will be automatically entered into our database.</p>

              <h4 className='orderForm__title'>How to obtain</h4>
              <div onClick={() => dispatch(setDeliveryModal(true))}>
              <label className='orderForm__label'>Receiving method*</label>
                <Field
                  id="receivingMethod"
                  name="receivingMethod"
                  type="text"
                  className="orderForm__input-text"
                  value={chosenRestaurant?.address || ""}
                />
              </div>

              <h4 className='orderForm__title'>Delivery time</h4>
              <Field
                id="time"
                name="time"
                as="select"
                className="orderForm__select-time"
              >
                {timeOptions.map(({value, label}) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
              </Field>

            <h4 className='orderForm__title'>Payment method</h4>
            <div className='orderForm__paymentMethod__wrapper'>
              <label className='orderForm__paymentMethod__label'>
                  <Field 
                      name="cashPayment" 
                      type="checkbox"
                  />
                  <p>Cash</p>
              </label>
              <label className='orderForm__paymentMethod__label'>
                  <Field 
                      name="cardPayment" 
                      type="checkbox"
                  />
                  <p>By card upon receipt</p>
              </label>
            </div>

            <h4 className='orderForm__title'>Number of persons</h4>
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

            <h4 className='orderForm__subtitle'>Comment to the order</h4>
            <Field 
                id="comment"
                name="comment"
                as="textarea"
                placeholder="Comment"
                className="orderForm__textarea-comment"
            />
            </div>

            <div className='orderForm__submit'>
              <h4 className='orderForm__title'>Your order</h4>
              {orderedItems}
              <div className='orderForm__submit__orderPrice'>
                <span>Order price:</span>
                <span>{totalOrderPrice} ₴</span>
              </div>
              <div className='orderForm__submit__totalPayable'>
                <span>Total payable:</span>
                <span>{totalOrderPrice} ₴</span>
              </div>
              <div 
              style={{
                'display': (!isValid || !dirty || isSubmitting) ? 'flex' : 'none',
              }}
              className='orderForm__paymentError'>
                <img src={infoCircle} alt="Fill in all required fields" />
                <p>Fill in all required fields</p>
              </div>
              <button 
              disabled={!isValid || !dirty || isSubmitting} 
              style={{
                'backgroundColor': (!isValid || !dirty || isSubmitting) ? 'var(--input)' : 'var(--accent)',
                'color': (!isValid || !dirty || isSubmitting) ? 'var(--disabled)' : 'var(--accentContent)',
              }}
              className='orderForm__submit__btn'
              >Pay {totalOrderPrice} ₴</button>
              <Link className='orderForm__link-back' to='/'>
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