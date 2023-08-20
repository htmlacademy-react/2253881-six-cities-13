import { screen, render } from '@testing-library/react';
import MemoizedCitiesMavigation from './cities-navigation';
import userEvent from '@testing-library/user-event';
import { City, SortMethod } from '../../consts';
import { withStore } from '../../mocks/mock-component';
import { extractActionsTypes } from '../../mocks/mocks';
import {
  setCity,
  setFiltredOffers,
  setSortMethod,
} from '../../store/offers-slice/offers-slice';

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

  it('should dispatch on click city', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <MemoizedCitiesMavigation />,
      {
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
      }
    );

    render(withStoreComponent);

    const allButtons = screen.getAllByTestId('button_test');

    await userEvent.click(allButtons[0]);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      setCity.type,
      setFiltredOffers.type,
      setSortMethod.type,
    ]);
  });
});
