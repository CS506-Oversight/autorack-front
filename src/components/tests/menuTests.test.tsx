import React from 'react';

import {Checkbox, TextField, FilledInput} from '@material-ui/core';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import ReactTestUtils, {Simulate} from 'react-dom/test-utils';
import {act} from 'react-dom/test-utils';
import Select from 'react-select';

import {renderApp} from '../../../test/utils';
/* import RequestSender from '../.././api/utils/requestSender';*/
import AppPaths from '../../const/paths';
import {User} from '../../state/auth/data';
import {SelectForm} from '../elements/ingredient/SelectForm';
import UIButton from '../elements/ui/Button';
import {EditMenu} from '../pages/EditMenu';
/* import drop = Simulate.drop;*/
/* import drop = Simulate.drop;*/
/* import click = Simulate.click;
import change = Simulate.change;*/
/* import {Homepage} from '../pages/Homepage';*/


const testUser: User = {
  email: 'bbj@gmail.com',
  firstName: 'name',
  lastName: 'name',
  id: 'id',
};

test('Initial menu state loads correctly with no auth', async () => {
  const {store} = renderApp(AppPaths.EDIT_MENU);
  expect(store.getState().menu.ingredientList).toHaveLength(0);
  expect(store.getState().menu.menuList).toHaveLength(0);
  expect(store.getState().menu.menuIngredientList).toHaveLength(0);
});

test('Initial menu state loads correctly with auth', async () => {
  const {store} = renderApp(AppPaths.EDIT_MENU, {auth: {user: testUser}});
  await waitFor(async () => {
  });
  expect(store.getState().menu.ingredientList).toHaveLength(6);
  expect(store.getState().menu.menuList).toHaveLength(5);
  expect(store.getState().menu.menuIngredientList).toHaveLength(4);
});

test('SelectForm Loads Properly', async () => {
  const {app} = renderApp(AppPaths.EDIT_MENU, {auth: {user: testUser}});
  await waitFor(async () => {
    const selector = app.find(SelectForm);
    const header = selector.find('h3');
    const dropDown = selector.find(Select);
    const options = dropDown.props().options;
    const buttons = selector.find('UIButton');
    expect(dropDown.text()).toBe('Select Option');
    expect(options).toHaveLength(4);
    expect(header.text()).toBe('Select an Option');
    expect(buttons).toHaveLength(1);
  });
});


test('SelectForm Chooses Proper Next Page', async () => {
  const {app, store} = renderApp(AppPaths.EDIT_MENU, {auth: {user: testUser}});
  await waitFor(async () => {
    const selector = app.find(SelectForm);
    const dropDown = selector.find(Select);
    const options = dropDown.props().options;
    await act(async () => {
      selector.props().handleSelect(options[0]);
      selector.props().nextStep(2);
    });
    expect(app.text()).toContain('New Menu Item');
    await act(async () => {
      selector.props().handleSelect(options[1]);
      selector.props().nextStep(3);
    });
    console.log(store.getState().menu.menuIngredientList);
    expect(app.text()).toContain('Fill in Ingredient');
    await act(async () => {
      selector.props().handleSelect(options[2]);
      selector.props().nextStep(4);
    });
    expect(app.text()).toContain('Select a Menu Item');
    await act(async () => {
      selector.props().handleSelect(options[3]);
      selector.props().nextStep(8);
    });
    expect(app.text()).toContain('Select an Ingredient');
  });
});


test('Create Menu Item Form Loads Properly', async () => {
  const {app, store} = renderApp(AppPaths.EDIT_MENU, {auth: {user: testUser}});
  await waitFor(async () => {
    const selector = app.find(SelectForm);
    const dropDown = selector.find(Select);
    const options = dropDown.props().options;
    await act(async () => {
      selector.props().handleSelect(options[0]);
      selector.props().nextStep(2);
    });
  });
  app.update();
  const buttons = app.find(UIButton);
  expect(buttons).toHaveLength(5);
  expect(app.find('input[type="checkbox"]')).toHaveLength(store.getState().menu.ingredientList.length);
  expect(app.find(Select)).toHaveLength(store.getState().menu.ingredientList.length);
  expect(app.find(FilledInput)).toHaveLength(store.getState().menu.ingredientList.length+ 3);
});

test('Create Menu Item Form Loads Properly After Adding 1', async () => {
  const {app, store} = renderApp(AppPaths.EDIT_MENU, {auth: {user: testUser}});
  await waitFor(async () => {
    const selector = app.find(SelectForm);
    const dropDown = selector.find(Select);
    const options = dropDown.props().options;
    await act(async () => {
      selector.props().handleSelect(options[0]);
      selector.props().nextStep(2);
    });
  });
  app.update();
  const buttons = app.find(UIButton);

  buttons.at(4).simulate('click');
  expect(buttons).toHaveLength(5);
  expect(app.find('input[type="checkbox"]')).toHaveLength(store.
    getState().menu.ingredientList.length *2);
  expect(app.find(Select)).toHaveLength(store.getState().menu.ingredientList.length * 2);
  expect(app.find(FilledInput)).toHaveLength((store.getState().menu.ingredientList.length + 3) * 2);
});


