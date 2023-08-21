import { screen, render } from '@testing-library/react';
import FavoritesScreen from './favourites-screen';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mocks';
import { AuthorizationStatus } from '../../consts';

describe('Component: Favourite screen', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();

    fakeStore.user.authorizationStatus = AuthorizationStatus.Auth;

    const { withStoreComponent } = withStore(<FavoritesScreen />, fakeStore);

    const withHistComp = withHistory(withStoreComponent);

    render(withHistComp);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getAllByTestId('li-list')[0]).toBeInTheDocument();
  });
});
