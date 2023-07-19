import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, deleteUser } from "firebase/auth";
import { Helmet } from "react-helmet";

import { removeUser } from "store/slices/userSlice"
import { setChoosenMenuItem } from "store/slices/profileSlice"

import AppFooter from "components/appFooter/AppFooter"
import AppHeader from "components/appHeader/AppHeader"
import SideMenu from "components/userProfile/sideMenu/SideMenu"
import Profile from "components/userProfile/profile/Profile"
import FavouriteProducts from "components/userProfile/favouriteProducts/FavouriteProducts"
import HistoryOfOrders from "components/userProfile/historyOfOrders/HistoryOfOrders"

import './profilePage.scss';
import close from 'assets/close/closeYellow.svg';

const ProfilePage = () => {
  const {choosenMenuItem} = useSelector(state => state.profile);
  const [logoutModal, setLogoutModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {email, name} = useSelector(state => state.user);

  useEffect(() => {
    if (!(!!email)) {
      navigate('/')
    }
  }, [email])

  useEffect(() => {
    if (choosenMenuItem == 'Logout') {
      setLogoutModal(true)
    }
    if (choosenMenuItem == 'Delete account') {
      setDeleteAccountModal(true)
    }
  }, [choosenMenuItem])

  const deleteUserFunc = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user).then(() => {
      console.log('user deleted');
    }).catch((error) => {
      console.log(error);
    });
  }

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
      default:
        return <Profile/>
    }
  }
  const renderChoosenMenuItem = switchMenu(choosenMenuItem);
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Profile page"
        />
        <title>{name} profile</title>
      </Helmet>
      <AppHeader/>
      <div className="profilePage">
        <div className="container">
          <div className="profilePage__content">
            <SideMenu/>
            {renderChoosenMenuItem}

            <div 
            style={{
              'display': logoutModal ? 'flex' : 'none'
            }}
            className="basicProfileModal__wrapper"
            >
              <div
              style={{
                'display': logoutModal ? 'flex' : 'none'
              }}
              className="basicProfileModal"
              >
                <img className="basicProfileModal__close" onClick={() => {
                  setLogoutModal(false)
                  dispatch(setChoosenMenuItem('Profile'))
                }} src={close} alt="close modal" />
                <div className="basicProfileModal__content">
                  <h6 className="basicProfileModal__title">Logout</h6>
                  <p className="basicProfileModal__text">Are you sure you want to logout</p>
                  <button onClick={() => {
                    dispatch(setChoosenMenuItem('Profile'));
                    dispatch(removeUser());
                    setLogoutModal(false)
                  }} className="basicProfileModal__btn">Logout from account</button>
                </div>
              </div>
            </div>

            <div 
            style={{
              'display': deleteAccountModal ? 'flex' : 'none'
            }}
            className="basicProfileModal__wrapper"
            >
              <div
              style={{
                'display': deleteAccountModal ? 'flex' : 'none'
              }}
              className="basicProfileModal"
              >
                <img className="basicProfileModal__close" onClick={() => {
                  setDeleteAccountModal(false)
                  dispatch(setChoosenMenuItem('Profile'))
                }} src={close} alt="close modal" />
                <div className="basicProfileModal__content">
                  <h6 className="basicProfileModal__title">Delete account</h6>
                  <p className="basicProfileModal__text">Are you sure you want to delete account?</p>
                  <button 
                  onClick={() => {
                    deleteUserFunc();
                    dispatch(setChoosenMenuItem('Profile'));
                    dispatch(removeUser());
                    setDeleteAccountModal(false)
                  }} 
                  className="basicProfileModal__btn"
                  style={{
                    'backgroundColor': 'red',
                    'width': '295px'
                  }}
                  >Yes, delete</button>
                  <button 
                  className="basicProfileModal__btn-cancel"
                  onClick={() => setDeleteAccountModal(false)}
                  >Cancel</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <AppFooter/>
    </>
  )
}

export default ProfilePage;