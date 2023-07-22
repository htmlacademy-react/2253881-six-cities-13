import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import CitiesNavigation from '../../components/citys-navigation/citys-navigation';
import SortPlaces from '../../components/sort-places/sort-places';
import { fetchOffersAction } from '../../store/api-actions';

const MainScreen: React.FC = () => {
  const activeCity = useAppSelector((state) => state.city);
  const filtredOffers = useAppSelector((state) => state.filtredOffers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction(activeCity));
  }, [dispatch, activeCity]);

  const [activeOfferId, setActiveOfferId] = useState<string>(
    'not selected from start'
  );

  const [isSortSelectOpen, setIsSortSelectOpen] = useState<boolean>(false);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesNavigation />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filtredOffers.length} places to stay in {activeCity}
              </b>
              <SortPlaces
                isSortSelectOpen={isSortSelectOpen}
                setIsSortSelectOpen={setIsSortSelectOpen}
              />
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
      </main>
    </div>
  );
};

export default MainScreen;
