import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import LoginPage from 'pages/pagesAuthorization/pageLogin/LoginPage';
import RegisterPage from 'pages/pagesAuthorization/pageRegister/RegisterPage';
import MainPage from 'pages/pageMain/MainPage';

import './app.scss';
import '../../styles/style.scss';

function App() {
  return (
    <Router>

      <Routes>

        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/' element={<MainPage/>}/>

      </Routes>

    </Router>
  );
}

export default App;