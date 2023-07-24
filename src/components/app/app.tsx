import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favourites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { Path, AuthStatus } from '../../consts';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={Path.Main}>
        <Route index element={<MainScreen />} />
        <Route
          path={Path.Favorite}
          element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route path={Path.Login} element={<LoginScreen />} />
        <Route path={`${Path.Offer}/:id`} element={<OfferScreen />} />
        <Route path={Path.NotFound} element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
