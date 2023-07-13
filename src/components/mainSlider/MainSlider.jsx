import { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import './mainSlider.scss';

import slide1 from 'assets/mainSlider/slide-1.jpeg';
import slide2 from 'assets/mainSlider/slide-2.png';
import slide3 from 'assets/mainSlider/slide-3.png';
import slide4 from 'assets/mainSlider/slide-4.png';
import slide5 from 'assets/mainSlider/slide-5.jpeg';
import slide6 from 'assets/mainSlider/slide-6.jpeg';

const MainSlider = () => {
  const [transform, setTransform] = useState('0');
  const [offset, setOffset] = useState(0);
  const [prevdisabled, setPrevDisabled] = useState(false);
  const [nextdisabled, setNextDisabled] = useState(false);

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

  const slidesData = [
    {slide: slide1, title: "delivery"},
    {slide: slide2, title: "promocode sweet.tv"},
    {slide: slide3, title: "meat duo"},
    {slide: slide4, title: "loyalty program"},
    {slide: slide5, title: "pizza mix"},
    {slide: slide6, title: "chat bot"}
  ]

  const slides = slidesData.map(({slide, title}, index) => {
    return (
      <div key={index} className="slider__slide">
        <img className='slider__slide-img' src={slide} alt={title} />
      </div>
    )
  })

  useEffect(() => {
    setTransform(`translateX(-${offset}px)`);
  }, [offset]);

  const svgCode = (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"/>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
      <g id="SVGRepo_iconCarrier">
        <path
        className="svg-image" 
        d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" 
        fill="#faaf3f"/>
      </g>
    </svg>
  );
  
  return (
    <section className="slider">
      <div className="container">
        <h1 className="slider__title">News and promotions</h1>
        <div className="slider__wrapper">
          <div
            style={{
              width: `${(100 * slidesData.length) / 3}%`,
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
  );  
}

export default MainSlider