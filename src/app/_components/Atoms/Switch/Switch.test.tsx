import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Switch from './Switch';

describe('Switch', () => {
  it('should render a Switch', () => {
    const props = {
      options: ['angular', 'react'],
      active: 'react',
    };

    render(<Switch {...props} />);

    const search = screen.getByText('angular');

    expect(search).toBeTruthy();
  });

  it('should render all options', () => {
    const props = {
      options: ['angular', 'react'],
      active: 'react',
    };

    render(<Switch {...props} />);

    const react = screen.getByText('react');
    const angular = screen.getByText('angular');

    expect(react).toBeTruthy();
    expect(angular).toBeTruthy();
  });

  it('should has the active class', () => {
    const props = {
      options: ['angular', 'react'],
      active: 'react',
    };

    render(<Switch {...props} />);

    const react = screen.getByText('react');

    expect(react).toHaveClass('border-sky-400');
  });

  it('should has the active class', () => {
    const onChange = jest.fn();
    const props = {
      options: ['angular', 'react'],
      active: 'react',
      onChange,
    };

    render(<Switch {...props} />);

    fireEvent.click(screen.getByText('react'));

    expect(onChange).toHaveBeenCalledWith('react');
  });
});
