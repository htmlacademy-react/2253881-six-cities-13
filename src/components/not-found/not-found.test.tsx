import { screen, render } from '@testing-library/react';
import NotFound from './not-found';
import { withHistory } from '../../mocks/mock-component';

describe('Component: not found', () => {
  it('Should render correctly', () => {
    const expectedText = '404 Error';
    const expectedText2 = 'Back to homePage';

    const preparedComponent = withHistory(<NotFound />);
    render(preparedComponent);

    const link: HTMLAnchorElement = screen.getByRole('link');

    expect(link.href).toContain('/');
    expect(link.textContent).toBe(expectedText2);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
