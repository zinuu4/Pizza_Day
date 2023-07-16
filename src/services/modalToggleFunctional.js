export const modalToggleFunctional = () => {
  const setScroll = (modal) => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  const handleWrapperClick = (event, setFunc) => {
    if (event.target === event.currentTarget) {
      setFunc(false);
    }
  }
  return {setScroll, handleWrapperClick};
}