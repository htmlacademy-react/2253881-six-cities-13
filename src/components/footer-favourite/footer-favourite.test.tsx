import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FooterFavourite from './footer-favourite';

describe('footer fav test', () => {
  it('render link check', () => {
    render(
      <BrowserRouter>
        <FooterFavourite />
      </BrowserRouter>
    );

    const links: HTMLAnchorElement[] = screen.getAllByRole('link');

    expect(links[0].href).toContain('/');
  });
});
