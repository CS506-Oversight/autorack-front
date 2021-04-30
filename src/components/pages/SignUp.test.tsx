import {renderAppAsync} from '../../../test/utils/renderAsync';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {SignUp} from './SignUp';

describe('sign up behavior', () => {
  const testUser: User = {
    email: 'bbj@gmail.com',
    firstName: 'name',
    lastName: 'name',
    id: 'id',
  };

  it('allows anonymous visit', async () => {
    const {app} = await renderAppAsync(AppPaths.SIGN_UP);

    expect(app.find(SignUp).exists()).toBeTruthy();
  });

  it('blocks authenticated visit', async () => {
    const {app} = await renderAppAsync(AppPaths.SIGN_UP, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });

    expect(app.find(SignUp).exists()).toBeFalsy();
  });
});
