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

  it('signs the user up', async () => {
    // TODO: Implement test: signs the user up
    console.warn('Test "signs the user up" not implemented');
    // expect(store.getState().auth.user).toBe(testUser);
  });

  it('fails when the user already exists', async () => {
    // TODO: Implement test: fails when the user already exists
    console.warn('Test "fails when the user already exists" not implemented');
    // expect(store.getState().auth.user).toBeNull();
  });

  it('fails when the user info is malformed', async () => {
    // TODO: Implement test: fails when the user info is malformed
    console.warn('Test "fails when the user info is malformed" not implemented');
    // expect(store.getState().auth.user).toBeNull();
  });
});
