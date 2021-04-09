import React from 'react';

import {Menu, newMenuId} from '../../state/menu/data';
import {menuDispatchers} from '../../state/menu/dispatchers';
import {useMenuSelector} from '../../state/menu/selector';
import {MenuList} from '../elements/menu/List';
import {ItemManagement} from './base/management/ItemManagement';

const sentinelNewMenu: Menu = {
  id: newMenuId,
  name: '',
  description: '',
  price: 0,
  ingredients: [],
};

export const MenuManagement = () => {
  // Note that this state will not be refreshed on-rerender
  const menuState = useMenuSelector();

  return (
    <ItemManagement
      newItemSentinel={sentinelNewMenu}
      initialOptions={menuState.menus}
      initialState={menuState}
      loadDispatcher={menuDispatchers.loadMenu}
      upsertDispatcher={menuDispatchers.upsertMenu}
      getInitialStateItems={(state) => state.menus}
      messageOnSuccess="Menu Updated/Added."
      selectLabel="Menu to Add/Edit"
      renderItemList={(managementState, setItemByIndex, onDelete, onSubmit) => (
        <MenuList
          menus={managementState.onForm}
          setMenu={setItemByIndex}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />
      )}
    />
  );
};
