import {renderAppAsync} from '../../../test/utils/renderAsync';
import {dummyIngredientData} from '../../api/mock/ingredient/data';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {IngredientList} from '../elements/ingredient/List';
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

  it('adds 1 ingredient', async () => {
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
  });
});
