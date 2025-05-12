// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    const result = generateLinkedList(elements);
    expect(result).toStrictEqual(expected);
  });

  test('should return empty node for empty array', () => {
    const result = generateLinkedList([]);
    expect(result).toStrictEqual({ value: null, next: null });
  });

  test('should generate linked list from values 2', () => {
    const elements = ['a', 'b', 'c'];
    const result = generateLinkedList(elements);

    expect(result).toMatchSnapshot();
  });

  test('should generate linked list with mixed values', () => {
    const elements = [true, { key: 'value' }, [1, 2, 3]];
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});
