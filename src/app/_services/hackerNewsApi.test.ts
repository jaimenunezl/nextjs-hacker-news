/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import { mockNewsResponse } from './_mocks_/newsApi.mock';
import { getNews } from './hackerNewsApi';

describe('hackerNewsApi', () => {
  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve(mockNewsResponse),
        ok: true,
      }) as any;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return a promise', async () => {
    const spy = jest.spyOn(global, 'fetch');

    const result = await getNews('', 0);

    expect(spy).toHaveBeenCalledWith('https://myapi.com/search_by_date?page=0');
    expect(result[0].id).toBe('38280830');
  });

  it('should call with the filter and page', async () => {
    const spy = jest.spyOn(global, 'fetch');

    await getNews('react', 15);

    expect(spy).toHaveBeenCalledWith(
      'https://myapi.com/search_by_date?query=react&page=15'
    );
  });
});
