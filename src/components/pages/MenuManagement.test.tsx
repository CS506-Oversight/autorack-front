import {renderAppAsync} from '../../../test/utils/renderAsync';
import {dummyMenuData} from '../../api/mock/menu/data';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {MenuList} from '../elements/menu/List';
import {MenuManagement} from './MenuManagement';


describe('menu management behavior', () => {
  const testUser: User = {
    email: 'bbj@gmail.com',
    firstName: 'name',
    lastName: 'name',
    id: 'id',
  };

  it('blocks anonymous visit', async () => {
    const {app} = await renderAppAsync(AppPaths.MENU_MANAGEMENT);

    expect(app.find(MenuManagement).exists()).toBeFalsy();
  });

  it('allows authenticated visit', async () => {
    const {app} = await renderAppAsync(AppPaths.MENU_MANAGEMENT, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });

    expect(app.find(MenuManagement).exists()).toBeTruthy();
  });

  it('loads menus on initial visit', async () => {
    const {app, store} = await renderAppAsync(AppPaths.MENU_MANAGEMENT, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });

    expect(app.find(MenuList).exists()).toBeTruthy();
    expect(store.getState().menu.menus.length).toBeGreaterThan(0);
    expect(Date.now() - store.getState().menu.lastFetch).toBeLessThan(1000);
  });

  it('fetches on empty menu list', async () => {
    const current = Date.now();

    const {app, store} = await renderAppAsync(AppPaths.MENU_MANAGEMENT, {
      preloadState: {auth: {user: testUser}, menu: {menus: [], lastFetch: current}},
      waitToPaint: true,
    });

    expect(app.find(MenuList).exists()).toBeTruthy();
    expect(store.getState().menu.lastFetch).not.toBe(current);
  });

  it('does not fetch for every visit', async () => {
    const current = Date.now();

    const {app, store} = await renderAppAsync(AppPaths.MENU_MANAGEMENT, {
      preloadState: {auth: {user: testUser}, menu: {menus: dummyMenuData, lastFetch: current}},
      waitToPaint: true,
    });

    expect(app.find(MenuList).exists()).toBeTruthy();
    expect(store.getState().menu.lastFetch).toBe(current);
  });

  it('adds 1 menu', async () => {
    // TODO: Implement test: adds 1 menu
    console.warn('Test "adds 1 menu" not implemented');
  });

  it('adds 3 menus', async () => {
    // TODO: Implement test: adds 3 menus
    console.warn('Test "adds 3 menus" not implemented');
  });

  it('adds 1 + update 3 menus', async () => {
    // TODO: Implement test: adds 1 + update 3 menus
    console.warn('Test "adds 1 + update 3 menus" not implemented');
  });

  it('adds 3 + update 1 menu', async () => {
    // TODO: Implement test: adds 3 + update 1 menu
    console.warn('Test "adds 3 + update 1 menu" not implemented');
  });

  it('can delete a menu entry', async () => {
    // TODO: Implement test: can delete a menu entry
    console.warn('Test "can delete a menu entry" not implemented');
  });

  it('can delete an ingredient entry in a menu', async () => {
    // TODO: Implement test: can delete an ingredient entry in a menu
    console.warn('Test "can delete an ingredient entry in a menu" not implemented');
  });

  it('disallows adding menu with insufficient data', () => {
    // TODO: Implement test: disallows adding menu with insufficient data
    console.warn('Test "disallows adding menu with insufficient data" not implemented');
  });

  it('disallows adding menu with empty ingredients', () => {
    // TODO: Implement test: disallows adding menu with insufficient ingredients
    console.warn('Test "disallows adding menu with insufficient ingredients" not implemented');
  });
});
