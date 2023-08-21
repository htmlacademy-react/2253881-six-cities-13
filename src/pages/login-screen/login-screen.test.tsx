import { screen, render } from '@testing-library/react';
import LoginScreen from './login-screen';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mocks';
import { AuthorizationStatus } from '../../consts';

describe('Component: Login screen', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();

    fakeStore.user.authorizationStatus = AuthorizationStatus.NoAuth;

    const { withStoreComponent } = withStore(<LoginScreen />, fakeStore);

    const withHistComp = withHistory(withStoreComponent);

    render(withHistComp);

    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });
});
