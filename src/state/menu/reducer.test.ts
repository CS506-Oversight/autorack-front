import {dummyIngredientData} from '../../api/mock/ingredient/data';
import {dummyMenuData} from '../../api/mock/menu/data';
import {Menu} from './data';
import {menuDispatchers} from './dispatchers';
import menuReducer from './reducer';

describe('menu reducer behavior', () => {
  const menu: Menu = {
    id: 'aaa',
    name: 'test',
    description: 'test menu',
    ingredients: [dummyIngredientData[0], dummyIngredientData[1]],
  };

  it('loads dummy menu', () => {
    const action = {
      type: menuDispatchers.loadMenu.fulfilled,
      payload: dummyMenuData,
    };

    const newState = menuReducer({menus: [], lastFetch: 0}, action);
    expect(newState.menus.length).toBe(2);
    expect(newState.menus).toBe(dummyMenuData);
  });

  it('adds a new menu', () => {
    const action = {
      type: menuDispatchers.upsertMenu.fulfilled,
      payload: [menu],
    };

    const newState = menuReducer({menus: [], lastFetch: 0}, action);
    expect(newState.menus.length).toBe(1);
  });

  it('updates a menu', () => {
    const action = {
      type: menuDispatchers.upsertMenu.fulfilled,
      payload: [{...menu, name: 'fff'}],
    };

    const newState = menuReducer({menus: [menu], lastFetch: 0}, action);
    expect(newState.menus.some((menu) => menu.name === 'fff')).toBeTruthy();
    expect(newState.menus.length).toBe(1);
  });

  it('adds 3 and updates 1 menu', () => {
    const action = {
      type: menuDispatchers.upsertMenu.fulfilled,
      payload: [
        {...menu, id: 'bbb'},
        {...menu, id: 'ccc'},
        {...menu, id: 'ddd'},
        {...menu, name: 'fff'},
      ],
    };

    const newState = menuReducer({menus: [menu], lastFetch: 0}, action);
    expect(newState.menus.some((menu) => menu.name === 'fff')).toBeTruthy();
    expect(newState.menus.some((menu) => menu.id === 'bbb')).toBeTruthy();
    expect(newState.menus.some((menu) => menu.id === 'ccc')).toBeTruthy();
    expect(newState.menus.some((menu) => menu.id === 'ddd')).toBeTruthy();
    expect(newState.menus.length).toBe(4);
  });

  it('updates 3 and adds 1 menu', () => {
    const action = {
      type: menuDispatchers.upsertMenu.fulfilled,
      payload: [
        {...menu, id: 'eee'},
        {...menu, id: 'bbb', name: 'bbb'},
        {...menu, id: 'ccc', name: 'ccc'},
        {...menu, id: 'ddd', name: 'ddd'},
      ],
    };

    const newState = menuReducer({
      menus: [
        {...menu, id: 'bbb'},
        {...menu, id: 'ccc'},
        {...menu, id: 'ddd'},
      ],
      lastFetch: 0,
    }, action);
    expect(newState.menus.some((menu) => menu.id === 'eee')).toBeTruthy();
    expect(newState.menus.some((menu) => menu.id === 'bbb' && menu.name === 'bbb')).toBeTruthy();
    expect(newState.menus.some((menu) => menu.id === 'ccc' && menu.name === 'ccc')).toBeTruthy();
    expect(newState.menus.some((menu) => menu.id === 'ddd' && menu.name === 'ddd')).toBeTruthy();
    expect(newState.menus.length).toBe(4);
  });
});
