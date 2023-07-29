import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store/store';
import { fetchOffersAction } from './store/offers-slice/async-offers-actions';
import { checkAuthAction } from './store/user-slice/async-user-slice';
import { City } from './consts';

store.dispatch(fetchOffersAction(City.Paris));
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
