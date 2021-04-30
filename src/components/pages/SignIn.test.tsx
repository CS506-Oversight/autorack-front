import {renderAppAsync} from '../../../test/utils/renderAsync';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {SignIn} from './SignIn';

describe('sign in behavior', () => {
  const testUser: User = {
    email: 'bbj@gmail.com',
    firstName: 'name',
    lastName: 'name',
    id: 'id',
  };

  it('allows anonymous visit', async () => {
    const {app} = await renderAppAsync(AppPaths.SIGN_IN);

    expect(app.find(SignIn).exists()).toBeTruthy();
  });

  it('blocks authenticated visit', async () => {
    const {app} = await renderAppAsync(AppPaths.SIGN_IN, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });

    expect(app.find(SignIn).exists()).toBeFalsy();
  });
});
