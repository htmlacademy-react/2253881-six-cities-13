import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import Header from './header';
import { makeOffers } from '../../mocks/mocks';
import { AuthorizationStatus, City, SortMethod } from '../../consts';

describe('Component:Header', () => {
  it('should render sign in', () => {
    const offers = makeOffers();

    const { withStoreComponent } = withStore(<Header />, {
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
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
    });
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render Sign out', () => {
    const offers = makeOffers();

    const { withStoreComponent } = withStore(<Header />, {
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
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
    });
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText(offers.length)).toBeInTheDocument();
  });
});
