import { MemoryHistory, createMemoryHistory } from 'history';
import App from './app';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import {
  createOneCurrentOffer,
  makeCommets,
  makeFakeStore,
  makeOffers,
} from '../../mocks/mocks';
import {
  APIRoute,
  AuthorizationStatus,
  BASE_BACKEND_URL,
  Path,
} from '../../consts';
import LoginScreen from '../../pages/login-screen/login-screen';
import { Route, Routes } from 'react-router-dom';

describe('App routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render main screen when user on "/"', () => {
    const withHistoryComp = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComp, makeFakeStore());

    mockHistory.push(Path.Main);

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('should render login screen when user on "/login"', () => {
    const withHistoryComp = withHistory(<App />, mockHistory);

    const fakeStore = makeFakeStore();

    fakeStore.user.authorizationStatus = AuthorizationStatus.NoAuth;

    const { withStoreComponent } = withStore(withHistoryComp, fakeStore);

    mockHistory.push(`/${Path.Login}`);

    render(withStoreComponent);

    expect(screen.getAllByText('Sign in')[0]).toBeInTheDocument();
  });

  it('should render offer screen when user on "/offer/id"', () => {
    const withHistoryComp = withHistory(<App />, mockHistory);

    const fakeStore = makeFakeStore();
    const offers = makeOffers();
    const oneCurrentOffer = createOneCurrentOffer();
    fakeStore.user.authorizationStatus = AuthorizationStatus.NoAuth;
    fakeStore.offers.loadingStatus = false;
    fakeStore.comments.isLoading = false;
    fakeStore.common.statusLoading = false;
    fakeStore.offers.currentOffer = { ...oneCurrentOffer };

    const { withStoreComponent, mockAxiosAdapter } = withStore(
      withHistoryComp,
      fakeStore
    );
    mockAxiosAdapter
      .onGet(`${BASE_BACKEND_URL + APIRoute.Comments}${offers[0].id}`)
      .reply(200, makeCommets());
    mockAxiosAdapter
      .onGet(`${BASE_BACKEND_URL + APIRoute.Offers}/${offers[0].id}/nearby`)
      .reply(200, offers);
    mockAxiosAdapter
      .onGet(`${BASE_BACKEND_URL + APIRoute.Offers}/${offers[0].id}`)
      .reply(200, { ...oneCurrentOffer });

    mockHistory.push(`/${Path.Offer}/${offers[0].id}`);

    render(withStoreComponent);

    expect(
      screen.getByText(`${oneCurrentOffer.bedrooms} Bedrooms`)
    ).toBeInTheDocument();

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
  });

  it('should render fav screen when user on "/favorite"', () => {
    const withHistoryComp = withHistory(<App />, mockHistory);

    const fakeStore = makeFakeStore();
    const offers = makeOffers();

    fakeStore.user.authorizationStatus = AuthorizationStatus.Auth;
    fakeStore.offers.loadingStatus = false;
    fakeStore.comments.isLoading = false;
    fakeStore.common.statusLoading = false;
    fakeStore.offers.favOffers = [...offers];

    const { withStoreComponent } = withStore(withHistoryComp, fakeStore);

    mockHistory.push(`/${Path.Favorite}`);

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should render "not found" when page is not found ', () => {
    const withHistoryComp = withHistory(<App />, mockHistory);

    const fakeStore = makeFakeStore();

    const { withStoreComponent } = withStore(withHistoryComp, fakeStore);

    mockHistory.push('/asdjkhadjas');

    render(withStoreComponent);

    expect(screen.getByText('Back to homePage')).toBeInTheDocument();
  });

  it('should redirect on main when auth status', () => {
    const fakeStore = makeFakeStore();
    fakeStore.offers.offers = makeOffers();
    fakeStore.offers.filtredOffers = [];
    fakeStore.user.authorizationStatus = AuthorizationStatus.Auth;

    const { withStoreComponent } = withStore(<LoginScreen />, fakeStore);

    mockHistory.push(`/${Path.Login}`);

    const compWithHistory = withHistory(
      <Routes>
        <Route path={Path.Login} element={withStoreComponent} />
        <Route path={Path.Main} element={<span>redirect success</span>} />
      </Routes>,
      mockHistory
    );

    render(compWithHistory);

    expect(screen.getByText('redirect success')).toBeInTheDocument();
  });
});
