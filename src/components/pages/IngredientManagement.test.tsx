import {Button, TextField} from '@material-ui/core';
import {waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

import {renderAppAsync} from '../../../test/utils/renderAsync';
import {dummyIngredientData} from '../../api/mock/ingredient/data';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {IngredientForm} from '../elements/ingredient/Form';
import {IngredientList} from '../elements/ingredient/List';
import {AccordionList} from '../elements/item/AccordionList';
import {MenuForm} from '../elements/menu/Form';
import {MenuList} from '../elements/menu/List';
import UIButton from '../elements/ui/Button';
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

    expect(app.find(IngredientList).exists()).toBeTruthy();
    expect(store.getState().ingredient.ingredients.length).toBeGreaterThan(0);
    expect(Date.now() - store.getState().ingredient.lastFetch).toBeLessThan(1000);
  });

  it('fetches on empty ingredient list', async () => {
    const current = Date.now();

    const {app, store} = await renderAppAsync(AppPaths.INGREDIENT_MANAGEMENT, {
      preloadState: {auth: {user: testUser}, ingredient: {ingredients: [], lastFetch: current}},
      waitToPaint: true,
    });

    expect(app.find(IngredientList).exists()).toBeTruthy();
    expect(store.getState().ingredient.lastFetch).not.toBe(current);
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

  it('Test first Dropdown Working', async () => {
    const {app} = await renderAppAsync(AppPaths.INGREDIENT_MANAGEMENT, {
      preloadState: {auth: {user: testUser}},
      waitToPaint: true,
    });
    await waitFor(async () => {
      const management = app.find(ItemManagement);
      const ingredients = management.props().getInitialStateItems(management.props().initialState);
      expect(ingredients[0].name).toBe('sample ingredient');
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
    const {app} = await renderAppAsync(AppPaths.INGREDIENT_MANAGEMENT, {
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
      const list = app.find(ItemManagement).find(IngredientList).find(AccordionList).first().find(IngredientForm);
      const inputs = list.find(UIInput);
      const input1 = inputs.at(0).find(TextField);
      const input2 = inputs.at(1).find(TextField);
      const input4 = inputs.at(3).find(TextField);
      const finalInput1 = input1.find('input');
      const finalInput2 = input2.find('input');
      const finalInput4 = input4.find('input');
      const event1 = {
        preventDefault() {},
        target: {value: 'butter'},
      };
      const event2 = {
        preventDefault() {},
        target: {value: 12},
      };
      const event4 = {
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
        finalInput4.simulate('change', event4);
      });
    });
    app.update();
    const list = app.find(ItemManagement).find(IngredientList).find(AccordionList).first().find(IngredientForm);
    const inputs = list.find(UIInput);
    /*    const ingredientSelect = list.find(ItemManagement);
    const ingred = ingredientSelect.props().getInitialStateItems(ingredientSelect.props().initialState);
    expect(ingred[0].name).toBe('sample ingredient');*/
    expect(inputs.get(0).props.value).toBe('butter');
    expect(inputs.get(1).props.value).toBe(12);
    expect(inputs.get(3).props.value).toBe(25);
    await waitFor(async () => {
      const list = app.find(ItemManagement).find(IngredientList).find(AccordionList).first().find(IngredientForm);
      const select = list.find(UISelect);
      const options = select.props().options;
      await act(async () => {
        select.props().onOptionSelected(options[1]);
      });
    });
  });


/*  it('adds 1 ingredient', async () => {
    // TODO: Implement test: adds 1 ingredient
    console.warn('Test "adds 1 ingredient" not implemented');
  });

  it('adds 3 ingredients', async () => {
    // TODO: Implement test: adds 3 ingredients
    console.warn('Test "adds 3 ingredients" not implemented');
  });

  it('adds 1 + update 3 ingredients', async () => {
    // TODO: Implement test: adds 1 + update 3 ingredients
    console.warn('Test "adds 1 + update 3 ingredients" not implemented');
  });

  it('adds 3 + update 1 ingredient', async () => {
    // TODO: Implement test: adds 3 + update 1 ingredient
    console.warn('Test "adds 3 + update 1 ingredient" not implemented');
  });

  it('can delete an ingredient entry', async () => {
    // TODO: Implement test: can delete an ingredient entry
    console.warn('Test "can delete an ingredient entry" not implemented');
  });

  it('disallows adding ingredient with insufficient data', () => {
    // TODO: Implement test: disallows adding ingredient with insufficient data
    console.warn('Test "disallows adding ingredient with insufficient data" not implemented');
  });*/
});
