import {renderAppAsync} from '../../../test/utils/renderAsync';
import {dummyIngredientData} from '../../api/mock/ingredient/data';
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {IngredientForm} from '../elements/ingredient/Form';
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

    expect(app.find(IngredientForm).exists()).toBeTruthy();
    expect(store.getState().ingredient.ingredients.length).toBeGreaterThan(0);
    expect(Date.now() - store.getState().ingredient.lastFetch).toBeLessThan(1000);
  });

  it('fetches on empty ingredient list', async () => {
    const current = Date.now();

    const {app, store} = await renderAppAsync(AppPaths.INGREDIENT_MANAGEMENT, {
      preloadState: {auth: {user: testUser}, ingredient: {ingredients: [], lastFetch: current}},
      waitToPaint: true,
    });

    expect(app.find(IngredientForm).exists()).toBeTruthy();
    expect(store.getState().ingredient.lastFetch).not.toBe(current);
  });

  it('does not fetch for every visit', async () => {
    const current = Date.now();

    const {app, store} = await renderAppAsync(AppPaths.INGREDIENT_MANAGEMENT, {
      preloadState: {auth: {user: testUser}, ingredient: {ingredients: dummyIngredientData, lastFetch: current}},
      waitToPaint: true,
    });

    expect(app.find(IngredientForm).exists()).toBeTruthy();
    expect(store.getState().ingredient.lastFetch).toBe(current);
  });

  test('adds new ingredient', async () => {
    // TODO: Implement test: adds new ingredient
    console.warn('Test "adds new ingredient" not implemented');
  });

  it('disallows new ingredient with insufficient data', () => {
    // TODO: Implement test: disallows new ingredient with insufficient data
    console.warn('Test "disallows new ingredient with insufficient data" not implemented');
  });

  it('edits an existing ingredient', () => {
    // TODO: Implement test: edits an existing ingredient
    console.warn('Test "edits an existing ingredient" not implemented');
  });

  it('disallows editing with empty value', () => {
    // TODO: Implement test: disallows editing with empty value
    console.warn('Test "disallows editing with empty value" not implemented');
  });
});
