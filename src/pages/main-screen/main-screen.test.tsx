import { screen, render } from '@testing-library/react';
import MainScreen from './main-screen';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mocks';
import { AuthorizationStatus, City } from '../../consts';

describe('Component: Main screen', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();

    fakeStore.user.authorizationStatus = AuthorizationStatus.NoAuth;

    const { withStoreComponent } = withStore(<MainScreen />, fakeStore);

    const withHistComp = withHistory(withStoreComponent);

    render(withHistComp);

    expect(screen.getByText(`${City.Amsterdam}`)).toBeInTheDocument();
    expect(screen.getAllByTestId('button_test')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('li_nav')[0]).toBeInTheDocument();
  });
});
