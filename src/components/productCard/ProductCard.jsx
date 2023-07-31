import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addItemToOrder } from "store/slices/userSlice";
import useModalToggle from "hooks/modalToggleFunctionality";
import { useHttp } from "hooks/http.hook";
import { setFavouriteProducts } from "store/slices/userSlice";
import { setLoginModal } from "store/slices/modalsSlice";

import plusWhite from "assets/plus/PlusWhite.svg";
import plusYellow from "assets/plus/plusYellow.svg";
import close from "assets/close/closeGrey.svg";
import productCardImages from "assets/productCard/productCardIcons";

import "./productCard.scss";

const ProductCard = ({
  img,
  name,
  weight,
  volume,
  price,
  descr,
  id,
  additives,
}) => {
  const { email, favouriteProducts } = useSelector((state) => state.user);

  const [totalPrice, setTotalPrice] = useState(
    parseInt(price.replace(/[^\d]/g, ""))
  );
  const [choosenAdditives, setChoosenAdditives] = useState([]);
  const [counter, setCounter] = useState(1);
  const [modal, setModal] = useState(false);
  const [isItFavProducts, setIsItFavProducts] = useState(false);

  const dispatch = useDispatch();

  const { postFavouriteProduct, deleteFavouriteProduct } = useHttp();

  const { svgMinus, svgHeart } = productCardImages({
    counter,
    isItFavProducts,
  });

  useEffect(() => {
    const isProductInFavourites = favouriteProducts.some(
      (product) => product.name === name
    );
    setIsItFavProducts(isProductInFavourites);
  }, [favouriteProducts, email]);

  const handleFavouriteClick = () => {
    if (!!email) {
      if (!isItFavProducts) {
        const volumeOrWeight = volume || weight;
        const isDescr = descr || null;
        postFavouriteProduct("users", email, {
          img,
          name,
          volumeOrWeight,
          price,
          isDescr,
        });
        setIsItFavProducts(true);
      } else if (isItFavProducts) {
        deleteFavouriteProduct("users", email, setFavouriteProducts, name);
        setIsItFavProducts(false);
      }
    } else {
      dispatch(setLoginModal(true));
    }
  };

  const { setScroll, handleWrapperClick } = useModalToggle();
  setScroll(modal);

  const renderAdditivesFunc = () => {
    if (additives) {
      return additives.map(({ title, price }) => {
        return (
          <li
            key={title}
            className="modal__productCard__orderModification-item"
          >
            <label className="modal__productCard__orderModification-item-label">
              <input
                onClick={() =>
                  setChoosenAdditives((prevAdditives) => {
                    if (prevAdditives.some((item) => item.title === title)) {
                      setTotalPrice((prevPrice) => prevPrice - parseInt(price));
                      return prevAdditives.filter(
                        (additive) => additive.title !== title
                      );
                    } else {
                      setTotalPrice((prevPrice) => prevPrice + parseInt(price));
                      return [...prevAdditives, { title, price }];
                    }
                  })
                }
                type="checkbox"
                className="modal__productCard__orderModification-checkbox"
              />
              <span className="modal__productCard__orderModification-type">
                {title}
              </span>
              <span className="modal__productCard__orderModification-price">
                {price} ₴
              </span>
            </label>
          </li>
        );
      });
    } else {
      return null;
    }
  };

  const renderAdditives = renderAdditivesFunc();
  const checkAdditivesFunc = () => {
    if (additives) {
      return (
        <>
          <div className="modal__productCard__orderModification-title">
            Additives to {name}
          </div>
          <di className="modal__productCard__orderModification">
            <ul className="modal__productCard__orderModification-list">
              {renderAdditives}
            </ul>
          </di>
        </>
      );
    } else {
      return null;
    }
  };
  const checkAdditives = checkAdditivesFunc();

  return (
    <>
      <li onClick={() => setModal(true)} className="card">
        <div className="card__image-wrapper">
          <img className="card__image" src={img} alt={name} />
          <span className="card__grams">{weight || volume}</span>
        </div>

        <div className="card__info">
          <div className="card__title-wrapper">
            <h5 className="card__title">{name}</h5>
            <div className="card__favorite">
              <span>{svgHeart}</span>
            </div>
          </div>

          <div className="card__descr">{descr}</div>

          <div className="card__price-wrapper">
            <div className="card__price">{price}</div>
            <button className="card__plus-btn">
              <img className="card__plus-img" src={plusWhite} alt="Plus" />
            </button>
          </div>
        </div>
      </li>

      {modal && (
        <div
          onClick={(e) => handleWrapperClick(e, setModal)}
          className="modal__wrapper"
        >
          <div className="modal modal__productCard animate__animated animate__fadeInUp custom-animation">
            <button className="btn-close" onClick={() => setModal(false)}>
              <img className="icon-close" src={close} alt="close" />
            </button>
            <img className="modal__productCard__img" src={img} alt={name} />
            <div className="modal__productCard__title-wrapper">
              <div className="modal__productCard__title">{name}</div>
              <div
                onClick={() => {
                  handleFavouriteClick();
                }}
                className="card__favorite"
              >
                <span>{svgHeart}</span>
              </div>
            </div>
            <div className="modal__productCard__grams">{weight || volume}</div>
            <div className="modal__productCard__price">{price}</div>
            <div className="modal__productCard__descr">{descr}</div>
            {checkAdditives}
            <div className="modal__productCard__bottom">
              <div className="counter__wrapper">
                <button
                  onClick={() => setCounter((prev) => prev - 1)}
                  disabled={counter === 1}
                  style={{
                    borderColor:
                      counter === 1 ? "var(--input)" : "var(--accent)",
                  }}
                  className="counter__btn"
                >
                  <span className="counter__minus">{svgMinus}</span>
                </button>
                <span className="counter">{counter}</span>
                <button
                  onClick={() => setCounter((prev) => prev + 1)}
                  className="counter__btn"
                  style={{
                    borderColor: "var(--accent)",
                  }}
                >
                  <img src={plusYellow} alt="counter plus" />
                </button>
              </div>
              <button
                onClick={() => {
                  const items = [];
                  for (let i = 0; i < counter; i++) {
                    items.push({
                      img,
                      name,
                      weight,
                      volume,
                      price: `${totalPrice}`,
                      descr,
                      id,
                      additives: choosenAdditives,
                      uuid: uuidv4(),
                    });
                  }
                  dispatch(addItemToOrder(items));
                  setModal(false);
                }}
                className="modal__productCard__add-btn"
              >
                <span className="modal__productCard__text">Add:</span>
                <span style={{ fontWeight: "500" }}>
                  {totalPrice * counter} ₴
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
