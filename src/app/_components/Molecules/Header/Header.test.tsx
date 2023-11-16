import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('should render a Header', () => {
    render(<Header />);

    const search = screen.getByRole('heading', { level: 1 });

    expect(search).toBeTruthy();
  });

  it("should render a Header with 'hacker news' text", () => {
    render(<Header />);

    const search = screen.getByText('hacker news');

    expect(search).toBeTruthy();
  });
});
