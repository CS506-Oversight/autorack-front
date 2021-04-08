// Used in the documentation of `Order`.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TableSortLabelTypeMap} from '@material-ui/core';

/**
 * Type of order.
 *
 * This definition should match the field `direction` in {@link TableSortLabelTypeMap}.
 */
export type Order = 'asc' | 'desc';

const comparator = <T, >(a: T, b: T) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

export type ComparableType = string | number | bigint;

export type SortOptions<T> = {
  sortKey?: (item: T) => ComparableType,
  order?: Order,
}

export const sort = <T, >(target: Array<T>, options?: SortOptions<T>) => {
  // Set the default order if not given
  if (options && !options.order) {
    options.order = 'asc';
  }

  let ret = [...target];

  // Sort the array according to `sortKey` in the options
  if (options?.sortKey) {
    // False positive - already type guarded
    // @ts-ignore
    ret = ret.sort((a, b) => comparator(options.sortKey(a), options.sortKey(b)));
  } else {
    ret = ret.sort();
  }

  // Reverse if the order is `desc`
  if (options?.order === 'desc') {
    ret = ret.reverse();
  }

  return ret;
};
