import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import CitiesNavigation from '../../components/citys-navigation/citys-navigation';
import { setAllOffers, setFiltredOffers } from '../../store/actions';
import { IOffer } from '../../mocks/offers-types';

interface IMainProps {
  offersCount: number;
  offers: Array<IOffer>;
}

const MainScreen: React.FC<IMainProps> = ({ offersCount, offers }) => {
  const activeCity = useAppSelector((state) => state.city);
  const filtredOffers = useAppSelector((state) => state.filtredOffers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAllOffers({ offers }));
    dispatch(setFiltredOffers({ cityName: activeCity }));
  }, [dispatch, offers, activeCity]);

  const [activeOfferId, setActiveOfferId] = useState<string>(
    'not selected from start'
  );

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
                {offersCount} places to stay in {activeCity}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OffersList
                  offers={filtredOffers}
                  setActiveOfferId={setActiveOfferId}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map">
                <Map selectedPointId={activeOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
