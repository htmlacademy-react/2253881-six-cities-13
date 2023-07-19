import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favourites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { IOffer } from '../../mocks/offers-types';
import { Path, AuthStatus } from '../../consts';
import { COMMENTS } from '../../mocks/comments';

interface IAppProps {
  offers: Array<IOffer>;
}

const App: React.FC<IAppProps> = ({ offers }) => (
  <BrowserRouter>
    <Routes>
      <Route path={Path.Main}>
        <Route index element={<MainScreen offers={offers} />} />
        <Route
          path={Path.Favorite}
          element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <FavoritesScreen offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path={Path.Login} element={<LoginScreen />} />
        <Route
          path={`${Path.Offer}/:id`}
          element={<OfferScreen offers={offers} comments={COMMENTS} />}
        />
        <Route path={Path.NotFound} element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
