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

  it('signs the user in if the auth info are correct', async () => {
    // TODO: Implement test: signs the user in if the auth info are correct
    console.warn('Test "signs the user in if the auth info are correct" not implemented');
    // expect(store.getState().auth.user).toBe(testUser);
  });

  it('fails when the password is incorrect', async () => {
    // TODO: Implement test: fails when the password is incorrect
    console.warn('Test "fails when the password is incorrect" not implemented');
    // expect(store.getState().auth.user).toBeNull();
  });

  it('fails when the user does not exist', async () => {
    // TODO: Implement test: fails when the user does not exist
    console.warn('Test "fails when the user does not exist" not implemented');
    // expect(store.getState().auth.user).toBeNull();
  });
});
