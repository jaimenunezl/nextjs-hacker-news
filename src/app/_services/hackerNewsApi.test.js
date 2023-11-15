import { render, screen, fireEvent } from '@testing-library/react';
import hackerNewsApi from './hackerNewsApi';
import '@testing-library/jest-dom';

describe('hackerNewsApi', () => {
  it('should render a hackerNewsApi', () => {
    const props = {
      defaulthackerNewsApi: 'my default error message',
    };

    render(<hackerNewsApi {...props} />);

    const search = screen.getByText('my default error message');

    expect(search).toBeTruthy();
  });
});
