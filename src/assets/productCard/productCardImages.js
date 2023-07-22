const productCardImages = ({counter, isItFavProducts}) => {
  const minusStrokeColor = counter == 1 ? '#f0f0f0' : '#faaf3f';

  const svgMinus = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
    <g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"/> <path d="M6 12H18" stroke={minusStrokeColor} strokeLinecap="round" strokeLinejoin="round"/> </g>
    </svg>
  );

  const heartFill = isItFavProducts ? '#faaf3f' : '#fff'

  const svgHeart = (
    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#faaf3f">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
    <g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill={heartFill}/> </g>
    </svg>
  )

  return {svgMinus, svgHeart};
}

export default productCardImages;