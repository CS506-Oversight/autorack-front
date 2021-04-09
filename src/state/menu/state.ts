import {SynchronizedState} from '../base';
import {Menu} from './data';


export type MenuState = SynchronizedState & {
  menus: Array<Menu>,
}
