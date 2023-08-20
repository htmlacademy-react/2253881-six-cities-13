import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import Header from './header';
import { extractActionsTypes, makeOffers } from '../../mocks/mocks';
import userEvent from '@testing-library/user-event';
import {
  APIRoute,
  AuthorizationStatus,
  BASE_BACKEND_URL,
  City,
  SortMethod,
} from '../../consts';
import { logoutAction } from '../../store/user-slice/async-user-slice';

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

  it('on click log out', async () => {
    const offers = makeOffers();

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <Header />,
      {
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
      }
    );

    mockAxiosAdapter
      .onDelete(`${BASE_BACKEND_URL + APIRoute.Logout}`)
      .reply(200);
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    const elemToClick = screen.getByText('Sign out');

    await userEvent.click(elemToClick);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);
  });
});
