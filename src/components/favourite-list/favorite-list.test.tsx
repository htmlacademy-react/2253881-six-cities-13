import { screen, render } from '@testing-library/react';
import FavoriteList from './favorite-list';
import { withHistory, withStore } from '../../mocks/mock-component';
import { AuthorizationStatus, City, SortMethod } from '../../consts';
import { makeOffers } from '../../mocks/mocks';

describe('Component: Favorite list ', () => {
  it('should render loading', () => {
    const { withStoreComponent } = withStore(<FavoriteList />, {
      offers: {
        city: City.Paris,
        filtredOffers: [],
        offers: [],
        sortMethod: SortMethod.Popular,
        loadingStatus: true,
        nearbyOffers: [],
        favOffers: [],
        currentOffer: null,
      },
    });

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    expect(screen.getByTestId('loading-stage')).toBeInTheDocument();
  });

  it('should render no offers', () => {
    const { withStoreComponent } = withStore(<FavoriteList />, {
      offers: {
        city: City.Paris,
        filtredOffers: [],
        offers: [],
        sortMethod: SortMethod.Popular,
        loadingStatus: false,
        nearbyOffers: [],
        favOffers: [],
        currentOffer: null,
      },
    });
    const expectedText =
      'Save properties to narrow down search or plan your future trips.';

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render all offers', () => {
    const offers = makeOffers();
    const cityList = Array.from(new Set(offers.map((el) => el.city.name)));

    const { withStoreComponent } = withStore(<FavoriteList />, {
      offers: {
        city: City.Paris,
        filtredOffers: [],
        offers: [],
        sortMethod: SortMethod.Popular,
        loadingStatus: false,
        nearbyOffers: [],
        favOffers: [...offers],
        currentOffer: null,
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    const liListElems = screen.getAllByTestId('li-list');
    expect(cityList.length).toBe(liListElems.length);
  });
});
