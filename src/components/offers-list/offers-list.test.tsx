import { render, screen } from '@testing-library/react';
import MemoizdeOffersList from './offers-list';
import { makeOffers } from '../../mocks/mocks';
import { withHistory, withStore } from '../../mocks/mock-component';
import { AuthorizationStatus } from '../../consts';

describe('Component:Offers list', () => {
  it('should render correctly', () => {
    const offers = makeOffers();

    const text = 'To bookmarks';
    const rating = 'Rating';

    const { withStoreComponent } = withStore(
      <MemoizdeOffersList offers={offers} />,
      {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
      }
    );

    const prepComp = withHistory(withStoreComponent);

    render(prepComp);

    const firsFoundedBook = screen.getAllByText(text);
    const firsFoundedRating = screen.getAllByText(rating);
    const firstFoundedType = screen.getByText(offers[0].type);

    expect(firsFoundedBook[0]).toBeInTheDocument();
    expect(firsFoundedRating[0]).toBeInTheDocument();
    expect(firstFoundedType).toBeInTheDocument();

    expect(firsFoundedBook.length).toBe(offers.length);
    expect(firsFoundedRating.length).toBe(offers.length);
  });
});
