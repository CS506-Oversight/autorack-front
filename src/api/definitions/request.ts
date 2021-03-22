// These implementations should be consistent with the backend.

import {OptionTypeBase} from 'react-select';

export type RequestBase = {};

export type SimpleAddRequest = RequestBase & {
  arg1: number,
  arg2: number,
}
