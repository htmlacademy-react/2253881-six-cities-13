import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favourites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { RotatingLines } from 'react-loader-spinner';
import { useAppSelector } from '../../hooks/redux-hooks';
import { Path, AuthorizationStatus } from '../../consts';
import styles from './app.module.css';

const App: React.FC = () => {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const isLoading = useAppSelector((state) => state.loadingStatus);

  if (isLoading || authStatus === AuthorizationStatus.Unknown) {
    return (
      <div className={styles.loadingContainer}>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="3"
          animationDuration="0.75"
          width="150"
          visible
        />
      </div>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={Path.Main}>
          <Route index element={<MainScreen />} />
          <Route
            path={Path.Favorite}
            element={
              <PrivateRoute authStatus={authStatus}>
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route path={Path.Login} element={<LoginScreen />} />
          <Route path={`${Path.Offer}/:id`} element={<OfferScreen />} />
          <Route path={Path.NotFound} element={<NotFound />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
