import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('should render Home Page', () => {
    render(<HomePage />);

    const dropdown = screen.getByPlaceholderText('Select your news');

    expect(dropdown).toBeInTheDocument();
  });
});
