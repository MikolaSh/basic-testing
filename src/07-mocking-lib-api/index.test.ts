// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
// import { throttle } from 'lodash';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn), // bypass throttle for testing
  };
});

describe('throttledGetDataFromApi', () => {
  const mockRelativePath = '/posts/1';
  const mockData = { id: 1, title: 'Test Post' };

  beforeEach(() => {
    jest.clearAllMocks();

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(mockRelativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetMock = jest.fn().mockResolvedValue({ data: mockData });
    (axios.create as jest.Mock).mockReturnValue({
      get: axiosGetMock,
    });

    await throttledGetDataFromApi(mockRelativePath);

    expect(axiosGetMock).toHaveBeenCalledWith(mockRelativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(mockRelativePath);

    expect(result).toEqual(mockData);
  });
});
