import {renderAppAsync} from '../../../test/utils/renderAsync';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {Homepage} from './Homepage';

describe('homepage behavior', () => {
  const testUser: User = {
    email: 'bbj@gmail.com',
    firstName: 'name',
    lastName: 'name',
    id: 'id',
  };

  it('allows anonymous visit', async () => {
    const {app} = await renderAppAsync(AppPaths.HOME);

    expect(app.find(Homepage).exists()).toBeTruthy();
  });

  it('allows authenticated visit', async () => {
    const {app} = await renderAppAsync(AppPaths.HOME, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });

    expect(app.find(Homepage).exists()).toBeTruthy();
  });
});
