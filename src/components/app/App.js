import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import MainPage from 'pages/pageMain/MainPage';
import PageChooseAddress from 'pages/pageChooseAddress/PageChooseAddress';
import OrderPage from 'pages/pageOrder/OrderPage';
import OrderInfoPage from 'pages/pageOrderInfo/OrderInfoPage';
import ProfilePage from 'pages/pageProfile/ProfilePage';

import './app.scss';
import '../../styles/style.scss';

function App() {
  return (
    <Router>

      <Routes>

        <Route path='/' element={<MainPage/>}/>
        <Route path='/address' element={<PageChooseAddress/>}/>
        <Route path='/order' element={<OrderPage/>}/>
        <Route path='/order/:orderId' element={<OrderInfoPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>

      </Routes>

    </Router>
  );
}

export default App;