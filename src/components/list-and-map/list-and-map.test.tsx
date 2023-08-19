import { screen, render } from '@testing-library/react';
import ListAndMap from './list-and-map';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeOffers } from '../../mocks/mocks';
import { AuthorizationStatus, City, SortMethod } from '../../consts';

describe('Component: Linst and map', () => {
  it('should render empty offers', () => {
    const { withStoreComponent } = withStore(<ListAndMap />, {
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

    render(withStoreComponent);

    expect(
      screen.getByText(
        'We could not find any property available at the moment in Dusseldorf'
      )
    ).toBeInTheDocument();
  });

  it('should render correctly', () => {
    const offers = makeOffers();
    const { withStoreComponent } = withStore(<ListAndMap />, {
      offers: {
        city: City.Paris,
        filtredOffers: [...offers],
        offers: [],
        sortMethod: SortMethod.Popular,
        loadingStatus: false,
        nearbyOffers: [],
        favOffers: [],
        currentOffer: null,
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    expect(screen.getByText('Places')).toBeInTheDocument();

    expect(
      screen.getByText(`${offers.length} places to stay in ${City.Paris}`)
    );
  });
});
