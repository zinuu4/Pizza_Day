import { useDispatch, useSelector } from "react-redux"
import { setNotificationsModal } from "store/slices/modalsSlice"

import useModalToggle from "hooks/modalToggleFunctionality";

import mail from 'assets/imgHeader/mail.svg';
import close from 'assets/close/closeYellow.svg';
import './notificationsModal.scss';

const NotificationsModal = () => {
  const {notificationsModal} = useSelector(state => state.modals);

  const dispatch = useDispatch();

  const {setScroll, handleWrapperClickDispatch} = useModalToggle();
  setScroll(notificationsModal)

  return (
    <>
      {notificationsModal && (
        <div className='rightSideModal__wrapper' onClick={(e) => handleWrapperClickDispatch(e, setNotificationsModal)}>
          <div className='rightSideModal notifications__modal animate__animated animate__fadeInRight custom-animation'>
            <div className='notifications__modal__top'>
              <div className='notifications__modal__title'>Personal notifications</div>
              <img onClick={() => dispatch(setNotificationsModal(false))} className='notifications__modal__close' src={close} alt="close notifications modal" />
            </div>
            <div className='notifications__modal__content-empty'>
              <img src={mail} alt="no notifications" />
              <div className='notifications__modal__subtitle'>You have no notifications</div>
              <div className='notifications__modal__text'>Our admin is already printing a sensation, why not mark it with an order in our institution?</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NotificationsModal