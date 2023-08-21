import { screen, render } from '@testing-library/react';
import Review from './review';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const expectedDate = '2019-05-08T14:13:56.569Z';

    const editedDate = new Date(expectedDate).toLocaleDateString('en-Us', {
      year: 'numeric',
      month: 'long',
    });

    const mockUser = {
      name: '123s',
      avatarUrl: 'ddd.ru',
      isPro: false,
    };

    const comment = 'good very nice';

    render(
      <Review
        id={'da'}
        date={expectedDate}
        user={mockUser}
        comment={comment}
        rating={3}
      />
    );

    expect(screen.getByText(editedDate)).toBeInTheDocument();
    expect(screen.getByText(comment)).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByTestId('container-img')).toBeInTheDocument();
    expect(screen.getByTestId('image')).toBeInTheDocument();
  });
});
