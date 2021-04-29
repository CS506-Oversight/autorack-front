import React from 'react';

import {Menu} from '../../../state/menu/data';
import {AccordionList} from '../item/AccordionList';
import {MenuForm} from './Form';

export type MenuListProps = {
  menus: Array<Menu>,
  setMenu: (newMenu: Menu, index: number) => void,
  onSubmit: () => void,
  onDelete: (index: number) => () => void,
}

export const MenuList = ({menus, setMenu, onSubmit, onDelete}: MenuListProps) => {
  return (
    <AccordionList
      items={menus}
      setItemByIndex={setMenu}
      onSubmit={onSubmit}
      onDelete={onDelete}
      isItemIncomplete={(menu) => !menu.name || !menu.description || menu.ingredients.length === 0}
      getAccordionTitle={(menu) => menu.name || '(no name)'}
      renderItemForm={(menu, setMenu) => <MenuForm menu={menu} setMenu={setMenu}/>}
    />
  );
};
