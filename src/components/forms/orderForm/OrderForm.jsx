import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import {
  setTotalOrderPrice,
  setOrder,
  setDoneOrderInfo,
} from "store/slices/userSlice";
import { setDeliveryModal } from "store/slices/modalsSlice";
import { useHttp } from "hooks/http.hook";
import { generateTimeOptions } from "utils/generateTimeOptions";
import orderFormIcons from "assets/orderForm/orderFormIcons";

import "./orderForm.scss";
import plus from "assets/plus/plusYellow.svg";
import infoCircle from "assets/infoCircle/infoCircle.svg";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.error && meta.touched;
  return (
    <>
      <label className="orderForm__label" htmlFor={props.name}>
        {label}
      </label>
      <input
        style={{
          border: showError ? "1px solid red" : "none",
        }}
        {...props}
        {...field}
      />
      {showError ? <div className="orderForm__error">{meta.error}</div> : null}
    </>
  );
};

const OrderForm = () => {
  const { email, name, mergedOrder, chosenRestaurant, totalOrderPrice } =
    useSelector((state) => state.user);

  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [selectedCheckbox, setSelectedCheckbox] = useState({
    name: "",
    value: false,
  });

  const { postOrder } = useHttp();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderedItems = mergedOrder.map(
    ({ name, weight, price, quantity, additives, uuid }) => {
      return (
        <div key={uuid} className="orderForm__submit__item">
          <div className="orderForm__submit__item-top">
            <div className="orderForm__submit__item-title">{name}</div>
            <div className="orderForm__submit__item-amount">x {quantity}</div>
          </div>
          <div className="orderForm__submit__item-bottom">
            <div className="orderForm__submit__item-weight">{weight}</div>
            <div className="orderForm__submit__item-price">{price} ₴</div>
          </div>
          {additives &&
            additives.map(({ title }) => <div key={title}>{title}</div>)}
        </div>
      );
    }
  );

  const { svgMinus } = orderFormIcons({ numberOfPersons });

  const timeOptions = generateTimeOptions();

  const handleCheckboxClick = (fieldName) => {
    setSelectedCheckbox({
      name: fieldName,
      value: !selectedCheckbox.value,
    });
  };

  const onSubmit = (
    {
      email,
      receivingMethod,
      time,
      cashPayment,
      cardPayment,
      numberOfPerson,
      comment,
    },
    { resetForm }
  ) => {
    const currentDate = new Date();
    const date = currentDate.toISOString().slice(0, 10);

    postOrder({
      collectionName: "orders",
      setFunc: setDoneOrderInfo,
      email,
      date,
      receivingMethod,
      time,
      cashPayment,
      cardPayment,
      numberOfPerson,
      comment,
      order: mergedOrder,
      id: uuidv4(),
      orderPrice: totalOrderPrice,
    });

    dispatch(setTotalOrderPrice(0));
    dispatch(setOrder([]));

    navigate("/order/8573");

    resetForm();
  };

  return (
    <section className="order">
      <div className="container">
        <Formik
          initialValues={{
            name: name || "",
            email: email || "",
            rulesAgreement: false,
            receivingMethod: chosenRestaurant.address,
            time:
              timeOptions[0]?.value || `We work ${chosenRestaurant.timeOpen}`,
            cashPayment: false,
            cardPayment: false,
            numberOfPerson: 1,
            comment: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("This field is required"),
            email: Yup.string()
              .email("Invalid email")
              .required("This field is required"),
            rulesAgreement: Yup.boolean()
              .required("Сonsent required")
              .oneOf([true], "Сonsent required"),
          })}
          onSubmit={onSubmit}
        >
          {({ isValid, setFieldValue, dirty, isSubmitting }) => (
            <Form className="orderForm">
              <div className="orderForm__data">
                <h4
                  onClick={() => console.log(timeOptions)}
                  className="orderForm__title"
                >
                  Contacts
                </h4>

                <MyTextInput
                  label="Your name*"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="orderForm__input-text"
                />

                <MyTextInput
                  label="Email*"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  className="orderForm__input-text"
                />

                <label className="orderForm__label-checkbox" htmlFor="checkbox">
                  <Field name="rulesAgreement" type="checkbox" />
                  <p>I agree with the rules</p>
                  <a
                    target="_blank"
                    href="https://www.eatery.club/privacy_policy.pdf"
                    rel="noreferrer"
                  >
                    for the processing of personal data
                  </a>
                </label>
                <ErrorMessage
                  className="orderForm__error"
                  name="rulesAgreement"
                  component="div"
                />
                <p className="orderForm__info">
                  Your number after ordering will be automatically entered into
                  our database.
                </p>

                <h4 className="orderForm__title">How to obtain</h4>
                <div onClick={() => dispatch(setDeliveryModal(true))}>
                  <label className="orderForm__label">Receiving method*</label>
                  <Field
                    id="receivingMethod"
                    name="receivingMethod"
                    type="text"
                    className="orderForm__input-text"
                    readOnly
                    value={chosenRestaurant?.address || ""}
                  />
                </div>

                <h4 className="orderForm__title">Delivery time</h4>
                <>
                  {timeOptions?.length >= 1 && (
                    <Field
                      id="time"
                      name="time"
                      as="select"
                      className="orderForm__select-time"
                    >
                      {timeOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </Field>
                  )}
                </>
                {timeOptions?.length < 1 && (
                  <div className="orderForm__restaurant-closed">
                    {chosenRestaurant.timeOpen}
                  </div>
                )}

                <h4 className="orderForm__title">Payment method</h4>
                <div className="orderForm__paymentMethod__wrapper">
                  <label className="orderForm__paymentMethod__label">
                    <Field
                      name="cashPayment"
                      type="checkbox"
                      checked={
                        selectedCheckbox.name === "cashPayment" &&
                        selectedCheckbox.value === true
                      }
                      onClick={() => handleCheckboxClick("cashPayment")}
                    />
                    <p>Cash</p>
                  </label>
                  <label className="orderForm__paymentMethod__label">
                    <Field
                      name="cardPayment"
                      type="checkbox"
                      checked={
                        selectedCheckbox.name === "cardPayment" &&
                        selectedCheckbox.value === true
                      }
                      onClick={() => handleCheckboxClick("cardPayment")}
                    />
                    <p>By card upon receipt</p>
                  </label>
                </div>

                <h4 className="orderForm__title">Number of persons</h4>
                <div className="counter__wrapper orderForm__counter-wrapper">
                  <button
                    disabled={numberOfPersons === 1}
                    onClick={() => {
                      setNumberOfPersons((prev) => prev - 1);
                    }}
                    className="counter__btn"
                    style={{
                      borderColor:
                        numberOfPersons === 1
                          ? "var(--input)"
                          : "var(--accent)",
                    }}
                    type="button"
                  >
                    <span>{svgMinus}</span>
                  </button>
                  <span className="counter">{numberOfPersons}</span>
                  <button
                    onClick={() => {
                      setNumberOfPersons((prev) => prev + 1);
                    }}
                    className="counter__btn"
                    style={{
                      borderColor: "var(--accent)",
                    }}
                    type="button"
                  >
                    <img src={plus} alt="counter plus" />
                  </button>
                </div>

                <h4 className="orderForm__subtitle">Comment to the order</h4>
                <Field
                  id="comment"
                  name="comment"
                  as="textarea"
                  placeholder="Comment"
                  className="orderForm__textarea-comment"
                />
              </div>

              <div className="orderForm__submit">
                <h4 className="orderForm__title">Your order</h4>
                {orderedItems}
                <div className="orderForm__submit__orderPrice">
                  <span>Order price:</span>
                  <span>{totalOrderPrice} ₴</span>
                </div>
                <div className="orderForm__submit__totalPayable">
                  <span>Total payable:</span>
                  <span>{totalOrderPrice} ₴</span>
                </div>
                <div
                  style={{
                    display:
                      !isValid || !dirty || isSubmitting ? "flex" : "none",
                  }}
                  className="orderForm__paymentError"
                >
                  <img src={infoCircle} alt="Fill in all required fields" />
                  <p>Fill in all required fields</p>
                </div>
                <button
                  disabled={!isValid || !dirty || isSubmitting}
                  style={{
                    backgroundColor:
                      !isValid || !dirty || isSubmitting
                        ? "var(--input)"
                        : "var(--accent)",
                    color:
                      !isValid || !dirty || isSubmitting
                        ? "var(--disabled)"
                        : "var(--accentContent)",
                  }}
                  className="orderForm__submit__btn"
                >
                  Pay {totalOrderPrice} ₴
                </button>
                <Link className="orderForm__link-back" to="/">
                  Back to menu
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default OrderForm;
