import { screen, render } from '@testing-library/react';
import MainPageContent from './main-page-content';
import { makeOffers } from '../../mocks/mocks';
import { withHistory, withStore } from '../../mocks/mock-component';
import { AuthorizationStatus, City, SortMethod } from '../../consts';

describe('Component: Main page contetn', () => {
  it('Should render correctly', () => {
    const offers = makeOffers();

    const { withStoreComponent } = withStore(<MainPageContent />, {
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

    const prepComp = withHistory(withStoreComponent);

    render(prepComp);

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });
});
