import { screen, render } from '@testing-library/react';
import useMap from './use-map';
import { makeOffers } from '../mocks/mocks';

describe('useMap', () => {
  it('returns a Map instance when called', () => {
    const mapRef = {
      current: document.createElement('div'),
    } as React.MutableRefObject<HTMLElement | null>;

    const TestComponent = () => {
      const offers = makeOffers();
      const map = useMap(mapRef, offers[0]);
      return (
        <div data-testid="map">{map ? 'Map is ready' : 'Map is not ready'}</div>
      );
    };

    render(<TestComponent />);
    const mapElement = screen.getByTestId('map');

    expect(mapElement.textContent).toBe('Map is ready');
  });
});
