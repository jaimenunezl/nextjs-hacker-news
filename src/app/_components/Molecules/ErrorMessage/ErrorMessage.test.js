import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('should render a ErrorMessage', () => {
    const props = {
      defaultErrorMessage: 'my default error message',
    };

    render(<ErrorMessage {...props} />);

    const search = screen.getByText('my default error message');

    expect(search).toBeTruthy();
  });
});
