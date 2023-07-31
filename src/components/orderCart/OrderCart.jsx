import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import {
  setTotalOrderPrice,
  deleteItemFromOrder,
  setMergedOrder,
  deleteItemsFromOrder,
  addItemToOrder,
} from "store/slices/userSlice";
import useModalToggle from "hooks/modalToggleFunctionality";

import "./orderCart.scss";
import closeYellow from "assets/close/closeYellow.svg";
import closeGrey from "assets/close/closeGrey.svg";
import plus from "assets/plus/plusYellow.svg";
import orderCartIcons from "assets/orderCart/orderCartIcons";

const OrderCart = () => {
  const { order, mergedOrder } = useSelector((state) => state.user);

  const [modal, setModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const mergeDuplicateItems = () => {
      const mergedOrder = {};
      order.forEach((item) => {
        const { name } = item;
        const key = name;
        if (key in mergedOrder) {
          mergedOrder[key].quantity += 1;
        } else {
          mergedOrder[key] = { ...item, quantity: 1 };
        }
      });
      dispatch(setMergedOrder(Object.values(mergedOrder)));
    };
    mergeDuplicateItems();
  }, [order]);

  const { setScroll, handleWrapperClick } = useModalToggle();
  useEffect(() => {
    setScroll(modal);
  }, [modal]);

  useEffect(() => {
    const setTotalPriceFunc = () => {
      setTotalPrice(
        order.reduce(
          (total, { price }) => total + parseInt(price.replace(/\D/g, "")),
          0
        )
      );
    };
    setTotalPriceFunc();
  }, [order]);

  const orderItems = mergedOrder.map(
    (
      { img, name, price, weight, descr, volume, id, quantity, additives },
      index
    ) => {
      const { svgMinus } = orderCartIcons({ quantity });
      return (
        <div key={index} className="cart__content-item">
          <img className="cart__content-item-img" src={img} alt={name} />
          <div className="cart__content-item-rightBlock">
            <div className="cart__content-item-top">
              <div className="cart__content-item-title">{name}</div>
              <img
                onClick={() => dispatch(deleteItemsFromOrder(name))}
                className="cart__content-item-delete"
                src={closeGrey}
                alt="delete"
              />
            </div>
            {additives &&
              additives.map(({ title }) => <div key={title}>{title}</div>)}
            <div className="cart__content-item-bottom">
              <div className="cart__content-item-price">{price} ₴</div>
              <div className="cart__content-item-counter-wrapper">
                <button
                  disabled={quantity === 1}
                  onClick={() => {
                    dispatch(deleteItemFromOrder(order[quantity - 1].uuid));
                  }}
                  className="cart__content-item-counter-btn"
                  style={{
                    borderColor:
                      quantity === 1 ? "var(--input)" : "var(--accent)",
                  }}
                >
                  <span>{svgMinus}</span>
                </button>
                <span className="cart__content-item-counter">{quantity}</span>
                <button
                  onClick={() => {
                    dispatch(
                      addItemToOrder({
                        img,
                        name,
                        price,
                        weight,
                        descr,
                        volume,
                        id,
                        additives,
                        uuid: uuidv4(),
                      })
                    );
                  }}
                  className="cart__content-item-counter-btn"
                >
                  <img
                    className="cart__content-item-counter-img"
                    src={plus}
                    alt="counter plus"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );

  return (
    <>
      <div
        style={{
          display: order.length !== 0 ? "flex" : "none",
        }}
        className="cart__button-wrapper"
      >
        <button
          style={{
            display: order.length !== 0 ? "flex" : "none",
          }}
          onClick={() => setModal(true)}
          className="cart__button animate__animated animate__fadeInRight custom-animation"
        >
          <span>Place and order for:</span>
          <span>{totalPrice} ₴</span>
        </button>
      </div>

      {modal === true && order.length !== 0 && (
        <div
          onClick={(e) => handleWrapperClick(e, setModal)}
          className="rightSideModal__wrapper"
        >
          <section className="rightSideModal cart animate__animated animate__fadeInRight custom-animation">
            <div className="cart__top">
              <h5 className="cart__title">Cart</h5>
              <button onClick={() => setModal(false)} className="btn-close">
                <img className="icon-close" src={closeYellow} alt="close" />
              </button>
            </div>
            <div className="cart__content">{orderItems}</div>
            <div className="cart__order">
              <div className="cart__order-price">
                <span className="cart__order-price-text">Order price:</span>
                <span className="cart__order-price-text">{totalPrice} ₴</span>
              </div>
              <div className="cart__order-payable">
                <span className="cart__order-payable-text">Total payable:</span>
                <span className="cart__order-payable-text">{totalPrice} ₴</span>
              </div>
              <button
                onClick={() => {
                  dispatch(setTotalOrderPrice(totalPrice));
                  setModal(false);
                  navigate("/order");
                }}
                className="cart__order-btn"
              >
                Order
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default OrderCart;
