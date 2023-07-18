import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { setNewsAndPromotions } from 'store/slices/dataBaseSlice';
import { useHttp } from 'hooks/http.hook';
import { modalToggleFunctional } from 'services/modalToggleFunctional';

import './mainSlider.scss';
import close from 'assets/close/closeGrey.svg';

const MainSlider = () => {
  const [transform, setTransform] = useState('0');
  const [offset, setOffset] = useState(0);
  const [prevdisabled, setPrevDisabled] = useState(false);
  const [nextdisabled, setNextDisabled] = useState(false);

  const [modal, setModal] = useState(false);

  const {setScroll, handleWrapperClick} = modalToggleFunctional();
  setScroll(modal)

  const {newsAndPromotions} = useSelector(state => state.db);;

  const { getData } = useHttp();

  useEffect(() => {
    getData("news and promotions", setNewsAndPromotions);
  }, []);

  const plusSlide = () => {
    const maxOffset = 380 * (3);
  
    if (offset === maxOffset) {
      setNextDisabled(true);
      setPrevDisabled(false);
    } else {
      setOffset(prevOffset => {
        const newOffset = prevOffset + 380;
        setPrevDisabled(false);
        setNextDisabled(newOffset === maxOffset);
        return newOffset;
      });
    }
  };
  
  const minusSlide = () => {
    if (offset === 0) {
      setPrevDisabled(true);
      setNextDisabled(false);
    } else {
      setOffset(prevOffset => {
        const newOffset = prevOffset - 380;
        setPrevDisabled(newOffset === 0);
        setNextDisabled(false);
        return newOffset;
      });
    }
  };

  const slides = newsAndPromotions.map(({img, id, descr}) => {
    return (
      <div onClick={() => setModal(id)} key={descr} className="slider__slide">
        <img className='slider__slide-img' src={img} alt={id} />
      </div>
    )
  })
  const modals = newsAndPromotions.map(({img, id, time, title, descr}) => {
    return (
      <div 
      style={{
        'display': modal === id ? 'flex' : 'none'
      }}
      onClick={(e) => handleWrapperClick(e, setModal)}
      className='SliderModal__wrapper'
      key={title}
    >
      <div 
        style={{
          'display': modal === id ? 'flex' : 'none'
        }}
        className='SliderModal'
      >
        <div className='SliderModal__time'>{time}</div>
        <div onClick={() => setModal(null)} className='SliderModal__close'>
          <img className='SliderModal__close-img' src={close} alt="close" />
        </div>
        <div className='SliderModal__img-wrapper'>
          <img className='SliderModal__img' src={img} alt="" />
        </div>
        <div className='SliderModal__descr-wrapper'>
          <h5 className='SliderModal__title'>{title}</h5>
          <p className='SliderModal__text'>{descr}</p>
        </div>
      </div>
    </div>
    )
  })

  useEffect(() => {
    setTransform(`translateX(-${offset}px)`);
  }, [offset]);

  const svgCode = (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
      <g id="SVGRepo_iconCarrier">
        <path
        className="svg-image"
        d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" 
        fill="#faaf3f"/>
      </g>
    </svg>
  );
  
  return (
    <>
      <section className="slider">
        <div className="container">
          <h1 className="slider__title">News and promotions</h1>
          <div className="slider__wrapper">
            <div
              style={{
                width: `${(100 * newsAndPromotions.length) / 3}%`,
                transform: transform
              }}
              className="slider__inner"
            >
              {slides}
            </div>
            <div className="slider__counter">
              <button
                disabled={prevdisabled}
                onClick={minusSlide}
                className="slider__counter-btn"
              >
                <span className='fix-display'>{svgCode}</span>
              </button>
              <button
                disabled={nextdisabled}
                onClick={plusSlide}
                className="slider__counter-btn"
              >
                <span className="slider__counter-next-img">{svgCode}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {modals}
    </>
  );  
}

export default MainSlider