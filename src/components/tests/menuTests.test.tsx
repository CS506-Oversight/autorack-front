import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import {act} from 'react-dom/test-utils';

import {renderApp} from '../../../test/utils';
/* import RequestSender from '../.././api/utils/requestSender';*/
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {SelectForm} from '../elements/ingredient/SelectForm';
import {EditMenu} from '../pages/EditMenu';
/* import {Homepage} from '../pages/Homepage';*/


const testUser: User = {
  email: 'bbj@gmail.com',
  firstName: 'name',
  lastName: 'name',
  id: 'id',
};

test('Initial menu state loads correctly', async () => {
  const {app, store} = renderApp(AppPaths.EDIT_MENU);

  // FIXME: For some reason, all pages are not rendered in enzyme (correctly rendered IRL)
  //  Expected: `SignIn` should be found.
  expect(store.getState().menu.ingredientList).toHaveLength(0);
  expect(store.getState().menu.menuList).toHaveLength(0);
  expect(store.getState().menu.menuIngredientList).toHaveLength(0);
});

test('Some Other Shit', async () => {
  const {app, store} = renderApp(AppPaths.EDIT_MENU, {auth: {user: testUser}});
  /*  const SelectFormFind = app.find('SelectForm').text();*/


  // FIXME: For some reason, all pages are not rendered in enzyme (correctly rendered IRL)
  //  Expected: `SignIn` should be found.
  /* console.log(app.getDOMNode());*/

  await waitFor(() => {
    const selector = app.find(SelectForm).text();
    console.log(app.text());
    console.log(selector);
  });
});
