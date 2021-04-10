import {renderAppAsync} from '../../../test/utils/renderAsync';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {ForgotPassword} from './ForgotPassword';

describe('forgot password behavior', () => {
  const testUser: User = {
    email: 'bbj@gmail.com',
    firstName: 'name',
    lastName: 'name',
    id: 'id',
  };

  it('allows anonymous visit', async () => {
    const {app} = await renderAppAsync(AppPaths.FORGOT_PASSWORD);

    expect(app.find(ForgotPassword).exists()).toBeTruthy();
  });

  it('blocks authenticated visit', async () => {
    const {app} = await renderAppAsync(AppPaths.FORGOT_PASSWORD, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });

    expect(app.find(ForgotPassword).exists()).toBeFalsy();
  });

  it('sends password reset email', async () => {
    // TODO: Implement test: sends password reset email
    console.warn('Test "sends password reset email" not implemented');
  });

  it('fails on user account not found', async () => {
    // TODO: Implement test: fails on user account not found
    console.warn('Test "fails on user account not found" not implemented');
  });
});
