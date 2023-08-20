import { screen, render } from '@testing-library/react';
import ErrorOffers from './error-offers';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../mocks/mock-component';
import { extractActionsTypes, makeOffers } from '../../mocks/mocks';
import { APIRoute, AuthorizationStatus, BASE_BACKEND_URL } from '../../consts';
import {
  fetchFavOffers,
  fetchOffersAction,
} from '../../store/offers-slice/async-offers-actions';
import { checkAuthAction } from '../../store/user-slice/async-user-slice';
import {
  setAllOffers,
  setFiltredOffers,
} from '../../store/offers-slice/offers-slice';

describe('Component: Error offfers', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ErrorOffers />, {});

    const expectedText = 'Error loading offers';
    const expectedText2 = 'Try again?';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
  });

  it('button should fetch actions', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <ErrorOffers />,
      {
        user: { authorizationStatus: AuthorizationStatus.Auth },
      }
    );
    const offers = makeOffers();
    mockAxiosAdapter
      .onGet(`${BASE_BACKEND_URL + APIRoute.Offers}`)
      .reply(200, offers);

    mockAxiosAdapter
      .onGet(`${BASE_BACKEND_URL + APIRoute.Favorite}`)
      .reply(200, [...offers].slice(0, 5));

    mockAxiosAdapter.onGet(`${BASE_BACKEND_URL + APIRoute.Login}`).reply(200);

    render(withStoreComponent);

    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      checkAuthAction.pending.type,
      fetchFavOffers.pending.type,
      setAllOffers.type,
      setFiltredOffers.type,
      fetchOffersAction.fulfilled.type,
      checkAuthAction.fulfilled.type,
    ]);
  });
});
