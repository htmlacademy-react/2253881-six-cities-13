import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store/store';
import {
  fetchFavOffers,
  fetchOffersAction,
} from './store/offers-slice/async-offers-actions';
import { checkAuthAction } from './store/user-slice/async-user-slice';
import { City } from './consts';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';

store.dispatch(fetchOffersAction(City.Paris));
store.dispatch(checkAuthAction());
store.dispatch(fetchFavOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
