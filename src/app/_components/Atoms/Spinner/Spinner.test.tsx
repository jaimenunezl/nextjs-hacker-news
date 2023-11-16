import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('should render a select', () => {
    const spinner = render(<Spinner />);

    expect(
      spinner.container.firstElementChild?.children[0].classList.toString()
    ).toMatch('animate-spin');
  });
});
