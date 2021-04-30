import {TextField} from '@material-ui/core';
import {waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

import {renderAppAsync} from '../../../test/utils/renderAsync';
import {dummyIngredientData} from '../../api/mock/ingredient/data';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {IngredientForm} from '../elements/ingredient/Form';
import {IngredientList} from '../elements/ingredient/List';
import {AccordionList} from '../elements/item/AccordionList';
// import {MenuForm} from '../elements/menu/Form';
// import {MenuList} from '../elements/menu/List';
// import UIButton from '../elements/ui/Button';
import UIInput from '../elements/ui/Input';
import {UISelect} from '../elements/ui/Select';
import {ItemManagement} from './base/management/ItemManagement';
import {IngredientManagement} from './IngredientManagement';


describe('ingredient management behavior', () => {
  const testUser: User = {
    email: 'bbj@gmail.com',
    firstName: 'name',
    lastName: 'name',
    id: 'id',
  };

  it('blocks anonymous visit', async () => {
    const {app} = await renderAppAsync(AppPaths.INGREDIENT_MANAGEMENT);

    expect(app.find(IngredientManagement).exists()).toBeFalsy();
  });

  it('allows authenticated visit', async () => {
    const {app} = await renderAppAsync(AppPaths.INGREDIENT_MANAGEMENT, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });

    expect(app.find(IngredientManagement).exists()).toBeTruthy();
  });

  it('loads ingredients on initial visit', async () => {
    const {app, store} = await renderAppAsync(AppPaths.INGREDIENT_MANAGEMENT, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });

    expect(app.find(IngredientList).exists()).toBeFalsy();
    expect(store.getState().ingredient.ingredients.length).toBe(0);
    expect(Date.now() - store.getState().ingredient.lastFetch).toBeGreaterThan(1000);
  });

  it('fetches on empty ingredient list', async () => {
    const current = Date.now();

    const {app, store} = await renderAppAsync(AppPaths.INGREDIENT_MANAGEMENT, {
      preloadState: {auth: {user: testUser}, ingredient: {ingredients: [], lastFetch: current}},
      waitToPaint: true,
    });

    expect(app.find(IngredientList).exists()).toBeFalsy();
    expect(store.getState().ingredient.lastFetch).toBe(store.getState().ingredient.lastFetch);
  });

  it('does not fetch for every visit', async () => {
    const current = Date.now();

    const {app, store} = await renderAppAsync(AppPaths.INGREDIENT_MANAGEMENT, {
      preloadState: {auth: {user: testUser}, ingredient: {ingredients: dummyIngredientData, lastFetch: current}},
      waitToPaint: true,
    });

    expect(app.find(IngredientList).exists()).toBeTruthy();
    expect(store.getState().ingredient.lastFetch).toBe(current);
  });
});
