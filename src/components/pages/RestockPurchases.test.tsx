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

  it('sorts by price', async () => {
    // TODO: Implement test: sorts by price
    console.warn('Test "sorts by price" not implemented');
  });

  it('sorts by status', async () => {
    // TODO: Implement test: sorts by status
    console.warn('Test "sorts by status" not implemented');
  });
});
