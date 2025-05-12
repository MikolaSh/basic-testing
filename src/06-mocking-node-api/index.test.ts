// Uncomment the code below and write your tests
import {
  doStuffByInterval,
  // readFileAsynchronously,
  doStuffByTimeout,
} from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const timeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(timeoutSpy).toHaveBeenCalledTimes(1);
    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), timeout);

    timeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout / 2);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout / 2);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(jest.getTimerCount()).toBe(1);
    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 500;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval * 3);

    expect(callback).toHaveBeenCalledTimes(3);

    expect(callback).toHaveBeenNthCalledWith(1);
    expect(callback).toHaveBeenNthCalledWith(2);
    expect(callback).toHaveBeenNthCalledWith(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
