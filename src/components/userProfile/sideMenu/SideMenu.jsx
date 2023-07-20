import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setChoosenMenuItem } from 'store/slices/profileSlice';

import './sideMenu.scss';
import back from 'assets/userProfile/sideMenu/back.svg';
import pencil from 'assets/userProfile/sideMenu/pencilEdit.svg';
import heart from 'assets/userProfile/sideMenu/productCardHeart.svg';
import check from 'assets/userProfile/sideMenu/check.svg';
import download from 'assets/userProfile/sideMenu/download.svg';
import logout from 'assets/userProfile/sideMenu/logout.svg';
import deleteProfile from 'assets/userProfile/sideMenu/delete.svg';

const SideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuData = [
    {title: "Profile", img: pencil},
    {title: "Favourite products", img: heart},
    {title: "History of orders", img: check},
    {title: "Download personal data", img: download},
    {title: "Logout", img: logout},
    {title: "Delete account", img: deleteProfile},
  ]
  return (
    <div className='sideMenu'>
      <h5 className='sideMenu__title'>Personal area</h5>
      <ul className='sideMenu__wrapper'>
        <li key='Come back' onClick={() => navigate('/')} className='sideMenu__item'>
          <img className='sideMenu__item__img' src={back} alt='Come back' />
          <div className='sideMenu__itme__title'>Come back</div>
        </li>
        {
          menuData.map(({title, img}) => {
            return (
              <li key={title} onClick={() => dispatch(setChoosenMenuItem(title))} className='sideMenu__item'>
                <img className='sideMenu__item__img' src={img} alt={title} />
                <div className='sideMenu__itme__title'>{title}</div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default SideMenu;