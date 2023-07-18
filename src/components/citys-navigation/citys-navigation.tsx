import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import classNames from 'classnames';
import { nanoid } from '@reduxjs/toolkit';
import { setCity, setFiltredOffers } from '../../store/actions';
import { Country } from '../../consts';
import './citys-navigation.css';

const CitysNavigation: React.FC = () => {
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

export default CitysNavigation;
