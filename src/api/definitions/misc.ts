import {ResponseBase} from './response';

export type FetchStatus<T extends ResponseBase | never = never, E = string> = {
  fetched: boolean,
  fetching: boolean,
  error?: E,
  response?: T,
}
