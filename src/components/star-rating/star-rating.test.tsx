import { screen, render } from '@testing-library/react';
import StarRating from './star-rating';

describe('Component : star rating', () => {
  it('should render correctly', () => {
    const expectedCount = 5;

    render(
      <StarRating
        starChangeHandler={function name() {
          return undefined;
        }}
        startValue={4}
        isLoading={false}
      />
    );

    const allStart = screen.getAllByTestId('input_test');

    expect(allStart.length).toBe(expectedCount);
  });
});
