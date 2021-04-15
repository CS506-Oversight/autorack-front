import React from 'react';

import {Button, ButtonBase, TextField} from '@material-ui/core';
import {waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

import {renderAppAsync} from '../../../test/utils/renderAsync';
import {dummyMenuData} from '../../api/mock/menu/data';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {AccordionList} from '../elements/item/AccordionList';
import {MenuForm} from '../elements/menu/Form';
import {MenuList} from '../elements/menu/List';
import UIButton from '../elements/ui/Button';
import UIInput from '../elements/ui/Input';
import {UISelect} from '../elements/ui/Select';
import {ItemManagement} from './base/management/ItemManagement';
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


  it('Test first Dropdown working', async () => {
    const {app} = await renderAppAsync(AppPaths.MENU_MANAGEMENT, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });
    await waitFor(async () => {
      const management = app.find(ItemManagement);
      const menus = management.props().getInitialStateItems(management.props().initialState);
      expect(menus[0].name).toBe('menu 1');
      const select = management.find(UISelect);
      const options = select.props().options;
      await act(async () => {
        // selects first option
        select.props().onOptionSelected(options[0]);
      });
    });
    expect(app.text()).toContain('(no name)');
  });

  it('Test first Form Fill in', async () => {
    const {app} = await renderAppAsync(AppPaths.MENU_MANAGEMENT, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });
    await waitFor(async () => {
      const management = app.find(ItemManagement);
      const select = management.find(UISelect);
      const options = select.props().options;
      await act(async () => {
        // selects first option
        select.props().onOptionSelected(options[1]);
      });
    });
    app.update();
    await waitFor(async () => {
      const list = app.find(ItemManagement).find(MenuList).find(AccordionList).first().find(MenuForm);
      const inputs = list.find(UIInput);

      const input1 = inputs.at(0).find(TextField);
      const input2 = inputs.at(1).find(TextField);
      const input3 = inputs.at(2).find(TextField);
      const finalInput1 = input1.find('input');
      const finalInput2 = input2.find('input');
      const finalInput3 = input3.find('input');
      const event1 = {
        preventDefault() {},
        target: {value: 'potatoes'},
      };
      const event2 = {
        preventDefault() {},
        target: {value: 'I am potatoes'},
      };
      const event3 = {
        preventDefault() {},
        target: {value: 25},
      };
      await act(async () => {
        finalInput1.simulate('change', event1);
      });
      await act(async () => {
        finalInput2.simulate('change', event2);
      });
      await act(async () => {
        finalInput3.simulate('change', event3);
      });
    });
    app.update();
    const list = app.find(ItemManagement).find(MenuList).find(AccordionList).first().find(MenuForm);
    const inputs = list.find(UIInput);
    const ingredientSelect = list.find(ItemManagement);
    const ingred = ingredientSelect.props().getInitialStateItems(ingredientSelect.props().initialState);
    expect(ingred[0].name).toBe('sample ingredient');
    expect(inputs.get(0).props.value).toBe('potatoes');
    expect(inputs.get(1).props.value).toBe('I am potatoes');
    expect(inputs.get(2).props.value).toBe(25);
    await waitFor(async () => {
      const submitButton = app.find(ItemManagement).find(MenuList).find(AccordionList).first().find(UIButton).last()
        .find(Button);
      await act(async () => {
        submitButton.simulate('click');
      });
    });
    // Should expect state to be filled here
  });

  /*  it('Test Accordion Working', async () => {
    const {app} = await renderAppAsync(AppPaths.MENU_MANAGEMENT, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });
    await waitFor(async () => {
      const management = app.find(ItemManagement);
      const select = management.find(UISelect);
      const options = select.props().options;
      await act(async () => {
        // selects first option
        select.props().onOptionSelected(options[1]);
      });
    });
    app.update();
    await waitFor(async () => {
      const submitButton = app.find(ItemManagement).find(MenuList).find(AccordionList).first();
      console.log(submitButton.text());
      await act(async () => {
        submitButton.props().onSubmit;
      });
    });
  });*/


/*  it('adds 1 menu', async () => {
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
  });*/
});
