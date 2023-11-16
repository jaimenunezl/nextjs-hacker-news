import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FavoritePage from './page';
import { LocalStorageKeys } from '@/app/_shared/enums';

describe('FavoritePage', () => {
  it('should render Favorite Page', () => {
    localStorage.setItem(LocalStorageKeys.FAVORITE_NEWS, JSON.stringify([]));

    render(<FavoritePage />);

    const dropdown = screen.getByText('No favorites yet');
    expect(dropdown).toBeInTheDocument();
  });
});
