import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';

import Spinner from 'components/userAlerts/spinner/Spinner';

import './app.scss';
import 'styles/style.scss';

const MainPage = lazy(() => import('pages/pageMain/MainPage'));
const PageChooseAddress = lazy(() => import('pages/pageChooseAddress/PageChooseAddress'));
const OrderPage = lazy(() => import('pages/pageOrder/OrderPage'));
const OrderInfoPage = lazy(() => import('pages/pageOrderInfo/OrderInfoPage'));
const ProfilePage = lazy(() => import('pages/pageProfile/ProfilePage'));
const Page404 = lazy(() => import('pages/page404/Page404'));

const App = () => {
  return (
    <Router>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>

      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
            }}
          >
            <Spinner/>
          </div>
        }
      >

        <Routes>

          <Route path='/' element={<MainPage />} />
          <Route path='/address' element={<PageChooseAddress />} />
          <Route path='/order' element={<OrderPage />} />
          <Route path='/order/:orderId' element={<OrderInfoPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='*' element={<Page404 />} />

        </Routes>

      </Suspense>
        

      </LoadScript>
    </Router>
  );
};

export default App;