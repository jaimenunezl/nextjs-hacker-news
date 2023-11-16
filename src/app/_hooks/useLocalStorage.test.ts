import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the item from the hook', async () => {
    const { result } = renderHook(() =>
      useLocalStorage('my-key', 'my-default-value')
    );

    expect(result.current).toEqual({
      item: 'my-default-value',
      updateItem: expect.any(Function),
    });
  });

  it('should return the item from localStorage', async () => {
    const { result } = renderHook(() =>
      useLocalStorage('my-key', 'my-default-value')
    );

    act(() => {
      result.current.updateItem('my-new-value');
    });

    expect(result.current.item).toEqual('my-new-value');
  });
});
