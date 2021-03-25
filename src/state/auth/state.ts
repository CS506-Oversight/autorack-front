import {StateBase} from '../base';
import {User} from './data';


export type AuthState = StateBase & {
  user: User | null,
}
