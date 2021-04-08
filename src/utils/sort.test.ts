import {sort} from './sort';

describe('Sort utils', () => {
  test('sort the value directly', () => {
    const result = sort([5, 9, 7]);

    expect(result).toStrictEqual([5, 7, 9]);
  });

  test('sort the value directly reversed', () => {
    const result = sort([5, 9, 7], {
      order: 'desc',
    });

    expect(result).toStrictEqual([9, 7, 5]);
  });

  test('sort the value directly ascending', () => {
    const result = sort([5, 9, 7], {
      order: 'asc',
    });

    expect(result).toStrictEqual([5, 7, 9]);
  });

  test('sort the value in the object', () => {
    const target = [
      {a: 15, b: 'e'},
      {a: 7, b: 'c'},
      {a: 9, b: 'b'},
    ];

    const result = sort(target, {
      sortKey: (item) => item.a,
    });

    expect(result).toStrictEqual([
      {a: 7, b: 'c'},
      {a: 9, b: 'b'},
      {a: 15, b: 'e'},
    ]);
  });

  test('sort the value in the object reversed', () => {
    const target = [
      {a: 15, b: 'e'},
      {a: 7, b: 'c'},
      {a: 9, b: 'b'},
    ];

    const result = sort(target, {
      order: 'desc',
      sortKey: (item) => item.a,
    });

    expect(result).toStrictEqual([
      {a: 15, b: 'e'},
      {a: 9, b: 'b'},
      {a: 7, b: 'c'},
    ]);
  });

  test('sort string object value', () => {
    const target = [
      {a: 15, b: 'e'},
      {a: 7, b: 'c'},
      {a: 9, b: 'b'},
    ];

    const result = sort(target, {
      sortKey: (item) => item.b,
    });

    expect(result).toStrictEqual([
      {a: 9, b: 'b'},
      {a: 7, b: 'c'},
      {a: 15, b: 'e'},
    ]);
  });
});
