import { render, screen } from '@testing-library/react';
import EmptyFavoritesList from './empty-favorites-list';

describe('Component: empty fav list', () => {
  it('should render correctly', () => {
    const expectedText1 = /Favorites \(empty\)/i;
    const expectedText2 = 'Nothing yet saved.';
    const expectedText3 =
      'Save properties to narrow down search or plan your future trips.';

    render(<EmptyFavoritesList />);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();
  });
});
