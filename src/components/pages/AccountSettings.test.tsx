import {renderAppAsync} from '../../../test/utils/renderAsync';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {AccountSettings} from './AccountSettings';

describe('account settings behavior', () => {
  const testUser: User = {
    email: 'bbj@gmail.com',
    firstName: 'name',
    lastName: 'name',
    id: 'id',
  };

  it('blocks anonymous visit', async () => {
    const {app} = await renderAppAsync(AppPaths.ACCOUNT_SETTINGS);

    expect(app.find(AccountSettings).exists()).toBeFalsy();
  });

  it('allows authenticated visit', async () => {
    const {app} = await renderAppAsync(AppPaths.ACCOUNT_SETTINGS, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });

    expect(app.find(AccountSettings).exists()).toBeTruthy();
  });

  it('changes the user\'s password', async () => {
    // TODO: Implement test: changes the user's password
    console.warn('Test "changes the user\'s password" not implemented');
  });

  it('fails to change the user\'s password if mismatch', async () => {
    // TODO: Implement test: fails to change the user's password if mismatch
    console.warn('Test "fails to change the user\'s password if mismatch" not implemented');
  });

  it('fails to change the user\'s password is the same', async () => {
    // TODO: Implement test: fails to change the user's password is the same
    console.warn('Test "fails to change the user\'s password is the same" not implemented');
  });
});
