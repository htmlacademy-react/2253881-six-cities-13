import React, { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import {
  fetchFavOffers,
  fetchOffersAction,
} from '../../store/offers-slice/async-offers-actions';
import { City } from '../../consts';
import styles from './error-offers.module.css';
import { checkAuthAction } from '../../store/user-slice/async-user-slice';

const ErrorOffers: React.FC = () => {
  const dispatch = useAppDispatch();

  const onClickButtonToLoadOffers = useCallback(() => {
    dispatch(fetchOffersAction(City.Paris));
    dispatch(checkAuthAction());
    dispatch(fetchFavOffers());
  }, [dispatch]);

  return (
    <div className={`${styles.wrapperDiv}`}>
      <div className={`${styles.mainDivContainer}`}>
        <h1 className={`${styles.titleError}`}>Error loading offers</h1>
        <button
          className={`${styles.buttonError}`}
          onClick={onClickButtonToLoadOffers}
          data-testid="button_fetch"
        >
          Try again?
        </button>
      </div>
    </div>
  );
};

export default ErrorOffers;
