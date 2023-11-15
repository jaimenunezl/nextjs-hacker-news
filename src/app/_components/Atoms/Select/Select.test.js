import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
  it('should render a select', () => {
    const props = {
      placeholder: 'seleccione',
      options: [{ key: 'react', value: 'react' }],
    };

    render(<Select {...props} />);

    const input = screen.getByPlaceholderText('seleccione');

    expect(input).toBeTruthy();
  });

  it('should render the select options', () => {
    const props = {
      placeholder: 'seleccione',
      options: [{ key: 'react', value: 'react' }],
    };

    render(<Select {...props} />);

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

    render(<Select {...props} />);

    fireEvent.click(screen.getByText('angular'));

    expect(onChange).toHaveBeenCalledWith('angular');
  });

  it('should update input value', () => {
    const props = {
      placeholder: 'seleccione',
      options: [{ key: 'vue', value: 'vue' }],
    };

    render(<Select {...props} />);

    fireEvent.click(screen.getByText('vue'));

    const input = screen.getByPlaceholderText('seleccione');

    expect(input.value).toBe('vue');
  });
});
