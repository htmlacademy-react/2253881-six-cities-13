import { screen, render } from '@testing-library/react';
import NearbyPlacesList from './nearby-places-list';
import { makeOffers } from '../../mocks/mocks';
import { withHistory, withStore } from '../../mocks/mock-component';
import { AuthorizationStatus } from '../../consts';

describe('Component:nearvy places list', () => {
  it('Should render correctly', () => {
    const offers = makeOffers();

    const { withStoreComponent } = withStore(
      <NearbyPlacesList offers={offers} />,
      {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
      }
    );

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    expect(
      screen.getByText('Other places in the neighbourhood')
    ).toBeInTheDocument();

    expect(screen.getByText(`${offers[0].type}`)).toBeInTheDocument();
  });
});
