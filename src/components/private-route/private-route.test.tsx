import { render, screen } from '@testing-library/react';
import PrivateRoute from './private-route';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AuthorizationStatus, Path } from '../../consts';
import { withHistory } from '../../mocks/mock-component';
import { Routes, Route } from 'react-router-dom';

describe('Component: Private route', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(Path.Main);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';

    const preparedComponent = withHistory(
      <Routes>
        <Route path={Path.Login} element={<span>{expectedText}</span>} />
        <Route
          path={Path.Main}
          element={
            <PrivateRoute authStatus={AuthorizationStatus.NoAuth}>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={Path.Login} element={<span>{notExpectedText}</span>} />
        <Route
          path={Path.Main}
          element={
            <PrivateRoute authStatus={AuthorizationStatus.Auth}>
              <span>{expectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
