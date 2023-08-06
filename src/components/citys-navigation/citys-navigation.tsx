import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { getCurrentCity } from '../../store/offers-slice/selectors-offers';
import {
  setCity,
  setFiltredOffers,
  setSortMethod,
} from '../../store/offers-slice/offers-slice';
import { City, SortMethod } from '../../consts';
import './citys-navigation.css';

const CitiesNavigation: React.FC = () => {
  const setedCity = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();

  const onClickCityButtonNav = useCallback(
    (el: City) => () => {
      dispatch(setCity(el));
      dispatch(setFiltredOffers(el));
      dispatch(setSortMethod(SortMethod.Popular));
    },
    [dispatch]
  );

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.values(City).map((el) => (
            <li key={`unique-city-${el}`} className="locations__item">
              <button
                className={classNames(
                  'locations__item-link',
                  'tabs__item',
                  'active-button',
                  {
                    'tabs__item--active': setedCity === el,
                  }
                )}
                onClick={onClickCityButtonNav(el)}
              >
                <span>{el}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const MemoizedCitiesMavigation = React.memo(CitiesNavigation);

export default MemoizedCitiesMavigation;
