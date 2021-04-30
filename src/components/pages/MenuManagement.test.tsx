// import React from 'react';

// import {Button, TextField} from '@material-ui/core';
// import {waitFor} from '@testing-library/react';
// import {act} from 'react-dom/test-utils';

import {renderAppAsync} from '../../../test/utils/renderAsync';
import {dummyMenuData} from '../../api/mock/menu/data';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
// import {AccordionList} from '../elements/item/AccordionList';
// import {MenuForm} from '../elements/menu/Form';
import {MenuList} from '../elements/menu/List';
// import UIButton from '../elements/ui/Button';
// import UIInput from '../elements/ui/Input';
// import {UISelect} from '../elements/ui/Select';
// import {ItemManagement} from './base/management/ItemManagement';
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

    expect(app.find(MenuList).exists()).toBeFalsy();
    expect(store.getState().menu.menus.length).toBe(0);
    expect(Date.now() - store.getState().menu.lastFetch).toBeGreaterThan(1000);
  });

  it('fetches on empty menu list', async () => {
    const current = Date.now();

    const {app, store} = await renderAppAsync(AppPaths.MENU_MANAGEMENT, {
      preloadState: {auth: {user: testUser}, menu: {menus: [], lastFetch: current}},
      waitToPaint: true,
    });

    expect(app.find(MenuList).exists()).toBeFalsy();
    expect(store.getState().menu.lastFetch).toBe(store.getState().menu.lastFetch);
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
});
