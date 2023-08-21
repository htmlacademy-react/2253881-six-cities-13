import { screen, render } from '@testing-library/react';
import OfferScreen from './offer-screen';
import { withHistory, withStore } from '../../mocks/mock-component';
import { createOneCurrentOffer, makeFakeStore } from '../../mocks/mocks';
import { AuthorizationStatus } from '../../consts';

describe('Component: Main screen', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();

    fakeStore.user.authorizationStatus = AuthorizationStatus.Auth;
    fakeStore.offers.currentOffer = createOneCurrentOffer();

    const { withStoreComponent } = withStore(<OfferScreen />, fakeStore);

    const withHistComp = withHistory(withStoreComponent);

    render(withHistComp);

    expect(screen.getAllByText('To bookmarks')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Rating')[0]).toBeInTheDocument();
    expect(
      screen.getByText(`${fakeStore.offers.currentOffer.bedrooms} Bedrooms`)
    ).toBeInTheDocument();
  });
});
