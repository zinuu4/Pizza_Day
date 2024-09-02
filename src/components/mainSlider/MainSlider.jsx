import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { setNewsAndPromotions } from 'store/slices/dataBaseSlice';
import { useHttp } from 'hooks/http.hook';
import useModalToggle from 'hooks/modalToggleFunctionality';

import Spinner from 'components/userAlerts/spinner/Spinner';
import ErrorMessage from 'components/userAlerts/errorMessage/ErrorMessage';

import './mainSlider.scss';
import close from 'assets/close/closeGrey.svg';
import { nextSvgCode } from 'assets/mainSlider/nextSvgCode';

const MainSlider = () => {
  const { newsAndPromotions } = useSelector((state) => state.db);

  const [modal, setModal] = useState(false);
  const [transform, setTransform] = useState('0');
  const [offset, setOffset] = useState(0);
  const [prevdisabled, setPrevDisabled] = useState(false);
  const [nextdisabled, setNextDisabled] = useState(false);

  const { getData, getDataLoading, getDataError } = useHttp();

  useEffect(() => {
    setTransform(`translateX(-${offset}px)`);
  }, [offset]);

  const { setScroll, handleWrapperClick } = useModalToggle();
  setScroll(modal);

  useEffect(() => {
    getData('news and promotions', setNewsAndPromotions);
  }, []);

  const handleSlide = (increment) => {
    const maxOffset = 380 * (newsAndPromotions.length - 3);
    const newOffset = offset + 380 * increment;

    setOffset(newOffset);
    setPrevDisabled(newOffset === 0);
    setNextDisabled(newOffset === maxOffset);
  };

  const slides = newsAndPromotions.map(({ img, id }) => {
    return (
      <SwiperSlide
        onClick={() => setModal(id)}
        key={id}
        className="slider__slide"
      >
        <img className="slider__slide-img" src={img} alt={id} />
      </SwiperSlide>
    );
  });
  const modals = newsAndPromotions.map(({ img, id, time, title, descr }) => {
    return (
      <div key={title}>
        {modal === id && (
          <div
            onClick={(e) => handleWrapperClick(e, setModal)}
            className="modal__wrapper"
          >
            <div className="modal SliderModal animate__animated animate__fadeInUp custom-animation">
              <div className="SliderModal__time">{time}</div>
              <button
                onClick={() => setModal(null)}
                className="SliderModal__close"
              >
                <img
                  className="SliderModal__close-img"
                  src={close}
                  alt="close"
                />
              </button>
              <div className="SliderModal__img-wrapper">
                <img className="SliderModal__img" src={img} alt="" />
              </div>
              <div className="SliderModal__descr-wrapper">
                <h5 className="SliderModal__title">{title}</h5>
                <p className="SliderModal__text">{descr}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  });

  const errorMessage = getDataError ? (
    <ErrorMessage
      styles={{
        width: '250px',
        height: '250px',
        display: 'block',
        margin: '0 auto',
      }}
    />
  ) : null;
  const loadingMessage = getDataLoading ? (
    <Spinner
      styles={{
        display: 'block',
        margin: '0 auto',
      }}
    />
  ) : null;
  const slidesContent = !(getDataError || getDataLoading) ? (
    <>
      <div
        style={{
          width: `${(100 * newsAndPromotions.length) / 3}%`,
          transform: transform,
        }}
        className="slider__inner"
      >
        {slides}
      </div>
      <div className="slider__counter">
        <button
          disabled={prevdisabled}
          onClick={() => handleSlide(-1)}
          className="slider__counter-btn"
        >
          <span className="fix-display">{nextSvgCode}</span>
        </button>
        <button
          disabled={nextdisabled}
          onClick={() => handleSlide(1)}
          className="slider__counter-btn"
        >
          <span className="slider__counter-next-img">{nextSvgCode}</span>
        </button>
      </div>
    </>
  ) : null;
  const modalsContent = !(getDataError || getDataLoading) ? modals : null;

  return (
    // <>
    //   <section className="slider">
    //     <div className="container">
    //       <h1 className="slider__title">News and promotions</h1>
    //       <div className="slider__wrapper">
    //         {loadingMessage}
    //         {errorMessage}
    //         {slidesContent}
    //       </div>
    //     </div>
    //   </section>
    //   {modalsContent}
    // </>
    <section className="container">
      <h1 className="slider__title">News and promotions</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        direction="vertical"
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {slides}
      </Swiper>
      {loadingMessage}
      {errorMessage}
      {modalsContent}
    </section>
  );
};

export default MainSlider;
