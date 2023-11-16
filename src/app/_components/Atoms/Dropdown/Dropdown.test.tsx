import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  it('should render a Dropdown', () => {
    const props = {
      placeholder: 'seleccione',
      options: [{ key: 'react', value: 'react' }],
    };

    render(<Dropdown {...props} />, {});

    const input = screen.getByPlaceholderText('seleccione');

    expect(input).toBeTruthy();
  });

  it('should render the Dropdown options', () => {
    const props = {
      placeholder: 'seleccione',
      options: [{ key: 'react', value: 'react' }],
    };

    render(<Dropdown {...props} />, {});

    const input = screen.getByText('react');

    expect(input).toBeTruthy();
  });

  it('should fire onChange', () => {
    const onChange = jest.fn();

    const props = {
      placeholder: 'seleccione',
      options: [{ key: 'angular', value: 'angular' }],
      onChange,
    };

    render(<Dropdown {...props} />);

    fireEvent.click(screen.getByText('angular'));

    expect(onChange).toHaveBeenCalledWith('angular');
  });

  it('should update input value', () => {
    const props = {
      placeholder: 'seleccione',
      options: [{ key: 'vue', value: 'vue' }],
    };

    render(<Dropdown {...props} />);

    fireEvent.click(screen.getByText('vue'));

    const input = screen.getByPlaceholderText<HTMLInputElement>('seleccione');

    expect(input.value).toBe('vue');
  });
});
