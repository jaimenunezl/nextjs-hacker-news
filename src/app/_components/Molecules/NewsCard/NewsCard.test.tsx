import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import NewsCard from './NewsCard';

const props = {
  isFavorite: false,
  title: 'my news title',
  author: 'myself',
  createdAt: new Date().toISOString(),
  url: 'https://www.google.com',
  id: '123',
};

describe('NewsCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a NewsCard', () => {
    render(<NewsCard {...props} />);

    const search = screen.getByText('my news title');
    expect(search).toBeTruthy();
  });

  it("should show the favorite icon when it's favorite", () => {
    render(<NewsCard {...props} isFavorite={true} />);

    const svg = screen.getByTestId('fav-icon-active');
    expect(svg.classList.toString()).toMatch('fav-active');
  });

  it("should show the favorite icon when it's not favorite", () => {
    render(<NewsCard {...props} />);

    const svg = screen.getByTestId('fav-icon-inactive');
    expect(svg.classList.toString()).toMatch('fav-active');
  });

  it('should show the author', () => {
    render(<NewsCard {...props} />);

    const title = screen.getByText('a few seconds ago by myself');
    expect(title).toBeTruthy();
  });

  it("should fire the onFavorite event when it's clicked", () => {
    const onFavorite = jest.fn();
    render(<NewsCard {...props} onFavorite={onFavorite} />);

    const svg = screen.getByTestId('fav-icon-container');
    fireEvent.click(svg);

    expect(onFavorite).toHaveBeenCalledWith('123', true);
  });

  it('should fire the onRedirect event when it is clicked', () => {
    const onRedirect = jest.fn();
    render(<NewsCard {...props} onRedirect={onRedirect} />);

    const card = screen.getByTestId('news-card');
    fireEvent.click(card);

    expect(onRedirect).toHaveBeenCalledWith('https://www.google.com');
  });
});
