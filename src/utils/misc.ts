export const sumValues = <T extends number, >(target: Array<T>) => {
  return target.reduce((sum, i) => sum + i, 0);
};
