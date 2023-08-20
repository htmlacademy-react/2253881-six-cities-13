import { screen, render } from '@testing-library/react';
import LoginForm from './login-form';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../mocks/mock-component';

describe('Component:Login form', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<LoginForm />);

    render(withStoreComponent);

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should be correct when input', async () => {
    const inputPasswordId = 'input_password';
    const inputEmailId = 'input_email';

    const expecLogin = 'sadasd@asdasd.sd';
    const expectPassword = 'sad2';

    const { withStoreComponent } = withStore(<LoginForm />);

    render(withStoreComponent);

    await userEvent.type(screen.getByTestId(inputEmailId), expecLogin);
    await userEvent.type(screen.getByTestId(inputPasswordId), expectPassword);

    expect(screen.getByDisplayValue(expecLogin)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectPassword)).toBeInTheDocument();
  });

  it('should be correct when input', async () => {
    const inputPasswordId = 'input_password';
    const inputEmailId = 'input_email';

    const expecLogin = 'sadasd@asdasd.sd';
    const expectPassword = 'sad2';

    const { withStoreComponent } = withStore(<LoginForm />);

    render(withStoreComponent);

    await userEvent.type(screen.getByTestId(inputEmailId), expecLogin);
    await userEvent.type(screen.getByTestId(inputPasswordId), expectPassword);

    expect(screen.getByDisplayValue(expecLogin)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectPassword)).toBeInTheDocument();
  });
});
