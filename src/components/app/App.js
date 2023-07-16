import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import LoginPage from 'pages/pagesAuthorization/pageLogin/LoginPage';
import RegisterPage from 'pages/pagesAuthorization/pageRegister/RegisterPage';
import MainPage from 'pages/pageMain/MainPage';
import PageChooseAddress from 'pages/pageChooseAddress/PageChooseAddress';
import OrderPage from 'pages/pageOrder/OrderPage';
import OrderInfoPage from 'pages/orderInfoPage/OrderInfoPage';

import './app.scss';
import '../../styles/style.scss';

function App() {
  return (
    <Router>

      <Routes>

        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/address' element={<PageChooseAddress/>}/>
        <Route path='/order' element={<OrderPage/>}/>
        <Route path='/order/:orderId' element={<OrderInfoPage/>}/>

      </Routes>

    </Router>
  );
}

export default App;