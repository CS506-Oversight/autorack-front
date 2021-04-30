import {renderAppAsync} from '../../../test/utils/renderAsync';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {AccountSettings} from './AccountSettings';
import {SignIn} from './SignIn';

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

  it('Tests Null User', async () => {
    const {app} = await renderAppAsync(AppPaths.ACCOUNT_SETTINGS, {
      preloadState: {auth: {user: null}},
      waitToPaint: true,
    });

    expect(app.find(SignIn).exists()).toBeTruthy();
  });
});
