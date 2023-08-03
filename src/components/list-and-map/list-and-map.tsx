import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import OffersList from '../offers-list/offers-list';
import SortPlaces from '../sort-places/sort-places';
import Map from '../map/map';
import {
  getFiltredOffers,
  getCurrentCity,
} from '../../store/offers-slice/selectors-offers';

const ListAndMap: React.FC = () => {
  const [activeOfferId, setActiveOfferId] = useState<string>(
    'not selected from start'
  );

  const filtredOffers = useAppSelector(getFiltredOffers);
  const activeCity = useAppSelector(getCurrentCity);

  if (!filtredOffers.length) {
    return (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property available at the moment in
                Dusseldorf
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {filtredOffers.length} places to stay in {activeCity}
          </b>
          <SortPlaces />
          <div className="cities__places-list places__list tabs__content">
            <OffersList
              offers={filtredOffers}
              setActiveOfferId={setActiveOfferId}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map">
            <Map offers={filtredOffers} selectedPointId={activeOfferId} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ListAndMap;
