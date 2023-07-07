import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favourites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFound from '../not-found/not-found';
import RouteProtection from '../route-protection/route-protection';
import { OFFERS_COUNT, PATHS_NAMES, AUTH_STATUS } from '../../consts';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={PATHS_NAMES.Main}>
        <Route index element={<MainScreen offersCount={OFFERS_COUNT} />} />
        <Route
          path={PATHS_NAMES.Favorite}
          element={
            <RouteProtection authStatus={AUTH_STATUS.NoAuth}>
              <FavoritesScreen />
            </RouteProtection>
          }
        />
        <Route path={PATHS_NAMES.Login} element={<LoginScreen />} />
        <Route path={`${PATHS_NAMES.Offer}/:id`} element={<OfferScreen />} />
        <Route path={PATHS_NAMES.NotFound} element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
