import { useDispatch } from "react-redux";

const useModalToggle = () => {
  const dispatch = useDispatch();

  const setScroll = (modal) => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const handleWrapperClick = (event, setFunc) => {
    if (event.target === event.currentTarget) {
      setFunc(false);
    }
  };

  const handleWrapperClickDispatch = (event, setFunc) => {
    if (event.target === event.currentTarget) {
      dispatch(setFunc(false));
    }
  };

  return { setScroll, handleWrapperClick, handleWrapperClickDispatch };
};

export default useModalToggle;
