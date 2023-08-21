import { screen, render } from '@testing-library/react';
import FavouriteItem from './favourite-item';
import userEvent from '@testing-library/user-event';
import { withStore, withHistory } from '../../mocks/mock-component';
import { extractActionsTypes, makeOffers } from '../../mocks/mocks';
import {
  APIRoute,
  AuthorizationStatus,
  BASE_BACKEND_URL,
  City,
  SortMethod,
} from '../../consts';
import { changeFavouriteStatusOffer } from '../../store/offers-slice/async-offers-actions';
import { setFavOffers } from '../../store/offers-slice/offers-slice';

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

  it('on click fav', async () => {
    const offers = makeOffers();

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <FavouriteItem {...offers[0]} />,
      {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
        offers: {
          favOffers: [...offers].slice(2, 5),
          city: City.Paris,
          filtredOffers: [],
          offers: [...offers],
          sortMethod: SortMethod.Popular,
          loadingStatus: false,
          nearbyOffers: [...offers],
          currentOffer: null,
        },
      }
    );
    mockAxiosAdapter
      .onPost(
        `${BASE_BACKEND_URL}${APIRoute.Favorite}/${offers[0].id}/${
          offers[0].isFavorite ? 0 : 1
        }`
      )
      .reply(200, { ...offers[0], isFavorite: !offers[0].isFavorite });

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      changeFavouriteStatusOffer.pending.type,
      setFavOffers.type,
    ]);
  });
});
