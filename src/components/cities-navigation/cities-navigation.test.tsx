import { screen, render } from '@testing-library/react';
import MemoizedCitiesMavigation from './cities-navigation';
import { City, SortMethod } from '../../consts';
import { withStore } from '../../mocks/mock-component';

describe('Component: Citys navigation', () => {
  it('should render correctly', () => {
    const exprectedCount = 6;
    const { withStoreComponent } = withStore(<MemoizedCitiesMavigation />, {
      offers: {
        city: City.Paris,
        filtredOffers: [],
        offers: [],
        sortMethod: SortMethod.Popular,
        loadingStatus: false,
        nearbyOffers: [],
        favOffers: [],
        currentOffer: null,
      },
    });
    render(withStoreComponent);
    const allButtons = screen.getAllByTestId('li_nav');

    expect(allButtons.length).toBe(exprectedCount);
    expect(screen.getByText(City.Brussels)).toBeInTheDocument();
  });
});
