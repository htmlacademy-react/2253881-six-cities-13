import { screen, render } from '@testing-library/react';
import ErrorOffers from './error-offers';
import { withStore } from '../../mocks/mock-component';

describe('Component: Error offfers', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ErrorOffers />, {});

    const expectedText = 'Error loading offers';
    const expectedText2 = 'Try again?';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
  });
});
