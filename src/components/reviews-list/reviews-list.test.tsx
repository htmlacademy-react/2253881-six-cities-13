import { screen, render } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { makeCommets } from '../../mocks/mocks';

describe('Component: Reviews list', () => {
  it('should render correctly', () => {
    const mockComments = makeCommets();

    render(<ReviewsList comments={mockComments} />);

    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByText(mockComments.length)).toBeInTheDocument();
    expect(screen.getAllByText('Rating').length).toBe(mockComments.length);
  });
});
