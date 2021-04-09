import {SynchronizedState} from '../base';
import {Menu} from './data';


export type MenuState = SynchronizedState & {
  menu: Array<Menu>,
}
