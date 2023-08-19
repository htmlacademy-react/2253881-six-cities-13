import { screen, render } from '@testing-library/react';
import FavouriteItem from './favourite-item';
import { withStore, withHistory } from '../../mocks/mock-component';
import { makeOffers } from '../../mocks/mocks';
import { AuthorizationStatus, City, SortMethod } from '../../consts';

describe('Component:Favourite item', () => {
  it('should render correctly', () => {
    const offers = makeOffers();

    const { withStoreComponent } = withStore(<FavouriteItem {...offers[0]} />, {
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      offers: {
        favOffers: [...offers].slice(2, 5),
        city: City.Paris,
        filtredOffers: [],
        offers: [],
        sortMethod: SortMethod.Popular,
        loadingStatus: false,
        nearbyOffers: [],
        currentOffer: null,
      },
    });

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText(offers[0].type)).toBeInTheDocument();

    if (offers[0].isPremium) {
      expect(screen.getByText('Premium')).toBeInTheDocument();
    }
  });
});
