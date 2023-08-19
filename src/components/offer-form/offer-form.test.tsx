import { screen, render } from '@testing-library/react';
import OfferForm from './offer-form';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../mocks/mock-component';

describe('Component:offer form', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<OfferForm />, {
      comments: {
        isLoading: false,
        comments: [],
        error: false,
      },
    });

    render(withStoreComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
  });

  it('offer from should work correctly', async () => {
    const idTextArea = 'text_area_comment';
    const buttonId = 'button_send';

    const text = 'asdasd';

    const { withStoreComponent } = withStore(<OfferForm />, {
      comments: {
        isLoading: false,
        comments: [],
        error: false,
      },
    });

    render(withStoreComponent);

    await userEvent.type(screen.getByTestId(idTextArea), text);

    expect(screen.getByText(text)).toBeInTheDocument();

    expect(screen.getByTestId(buttonId)).toHaveAttribute('disabled');
  });

  it('offer from should work correctly', async () => {
    const idTextArea = 'text_area_comment';
    const buttonId = 'button_send';

    const { withStoreComponent } = withStore(<OfferForm />, {
      comments: {
        isLoading: false,
        comments: [],
        error: false,
      },
    });

    render(withStoreComponent);
    let newText = '';

    for (let i = 0; i <= 350; i++) {
      newText += `${i}`;
    }

    await userEvent.type(screen.getByTestId(idTextArea), newText);

    expect(screen.getByText(newText)).toBeInTheDocument();

    expect(screen.queryByTestId(buttonId)).not.toHaveAttribute(
      'disabled',
      false
    );
  });
});
