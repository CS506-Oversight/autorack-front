import {Color} from '@material-ui/lab';

import {StateBase} from '../base';


export type AlertState = StateBase & {
  showAlert: boolean,
  message: string,
  severity: Color,
}
