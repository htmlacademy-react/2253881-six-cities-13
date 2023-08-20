import { MemoryHistory, createMemoryHistory } from 'history';
import App from './app';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mocks';
import { AuthorizationStatus, Path } from '../../consts';

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

    mockHistory.push(Path.Login);

    render(withStoreComponent);

    // expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
