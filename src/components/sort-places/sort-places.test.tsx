import { screen, render } from '@testing-library/react';
import SortPlaces from './sort-places';
import { withHistory, withStore } from '../../mocks/mock-component';
import { City, SortMethod } from '../../consts';

describe('Component: Sort places', () => {
  it('should render correctly', () => {
    const compWithHistory = withHistory(<SortPlaces />);
    const { withStoreComponent } = withStore(compWithHistory, {
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

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });
});
