import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import classNames from 'classnames';
import { nanoid } from '@reduxjs/toolkit';
import { setCity, setFiltredOffers, setSortMethod } from '../../store/actions';
import { Country, SortMethod } from '../../consts';
import './citys-navigation.css';

const CitiesNavigation: React.FC = () => {
  const setedCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.values(Country).map((el) => (
          <li key={nanoid()} className="locations__item">
            <button
              className={classNames(
                'locations__item-link',
                'tabs__item',
                'active-button',
                {
                  'tabs__item--active': setedCity === el,
                }
              )}
              onClick={() => {
                dispatch(setCity({ city: el }));
                dispatch(setFiltredOffers({ cityName: el }));
                dispatch(setSortMethod({ sortMethod: SortMethod.Popular }));
              }}
            >
              <span>{el}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CitiesNavigation;
