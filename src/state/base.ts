export type StateBase = {};

export type SynchronizedState = StateBase & {
  // Epoch time
  lastFetch: number,
}
