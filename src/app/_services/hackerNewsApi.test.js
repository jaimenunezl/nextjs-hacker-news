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
      });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return a promise', async () => {
    const spy = jest.spyOn(global, 'fetch');

    const result = await getNews();

    expect(spy).toHaveBeenCalledWith('https://myapi.com/search_by_date');
    expect(result[0].id).toBe('38280830');
  });

  it('should call with the filter', async () => {
    const spy = jest.spyOn(global, 'fetch');

    await getNews('angular');

    expect(spy).toHaveBeenCalledWith(
      'https://myapi.com/search_by_date?query=angular'
    );
  });

  it('should call with the page', async () => {
    const spy = jest.spyOn(global, 'fetch');

    await getNews('angular', 1);

    expect(spy).toHaveBeenCalledWith(
      'https://myapi.com/search_by_date?query=angular&page=1'
    );
  });
});
