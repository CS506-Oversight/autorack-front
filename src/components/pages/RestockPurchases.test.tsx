import {renderAppAsync} from '../../../test/utils/renderAsync';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {RestockPurchases} from './RestockPurchases';

describe('restock purchase behavior', () => {
  const testUser: User = {
    email: 'bbj@gmail.com',
    firstName: 'name',
    lastName: 'name',
    id: 'id',
  };

  it('blocks anonymous visit', async () => {
    const {app} = await renderAppAsync(AppPaths.RESTOCK_PURCHASES);

    expect(app.find(RestockPurchases).exists()).toBeFalsy();
  });

  it('allows authenticated visit', async () => {
    const {app} = await renderAppAsync(AppPaths.RESTOCK_PURCHASES, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });

    expect(app.find(RestockPurchases).exists()).toBeTruthy();
  });
});
