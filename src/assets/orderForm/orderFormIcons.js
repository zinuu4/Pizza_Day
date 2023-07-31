const orderFormIcons = ({numberOfPersons}) => {
  const minusStrokeColor = numberOfPersons === 1 ? '#f0f0f0' : '#faaf3f';

  const svgMinus = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
      <g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"/> <path d="M6 12H18" stroke={minusStrokeColor} strokeLinecap="round" strokeLinejoin="round"/> </g>
    </svg>
  );

  return {svgMinus};
};

export default orderFormIcons;