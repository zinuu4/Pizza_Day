import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { removeUser } from "store/slices/userSlice"
import { setChoosenMenuItem } from "store/slices/profileSlice"

import AppFooter from "components/appFooter/AppFooter"
import AppHeader from "components/appHeader/AppHeader"
import SideMenu from "components/userProfile/sideMenu/SideMenu"
import Profile from "components/userProfile/profile/Profile"
import FavouriteProducts from "components/userProfile/favouriteProducts/FavouriteProducts"
import HistoryOfOrders from "components/userProfile/historyOfOrders/HistoryOfOrders"

import './profilePage.scss';

const ProfilePage = () => {
  const {choosenMenuItem} = useSelector(state => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {email} = useSelector(state => state.user);

  useEffect(() => {
    if (!(!!email)) {
      navigate('/')
    }
  }, [email])

  useEffect(() => {
    if (choosenMenuItem == 'Logout') {
      dispatch(setChoosenMenuItem('Profile'));
      dispatch(removeUser());
    }
  }, [choosenMenuItem])

  const switchMenu = (MenuItem) => {
    switch (MenuItem) {
      case 'Come back':
        return navigate('/');
      case 'Profile':
        return <Profile/>
      case 'Favourite products':
        return <FavouriteProducts/>
      case 'History of orders':
        return <HistoryOfOrders/>
      case 'Download personal data':
        return <div>In process</div>
      case 'Delete account':
        return <div>In process</div>
      default:
        return <Profile/>
    }
  }
  const renderChoosenMenuItem = switchMenu(choosenMenuItem);
  return (
    <>
      <AppHeader/>
      <div className="profilePage">
        <div className="container">
          <div className="profilePage__content">
            <SideMenu/>
            {renderChoosenMenuItem}
          </div>
        </div>
      </div>
      <AppFooter/>
    </>
  )
}

export default ProfilePage;