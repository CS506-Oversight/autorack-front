import React from 'react';

import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';

import App from '../../src/App';
import AppPaths from '../../src/const/paths';
import {PartialReduxState} from '../../src/state/state';
import {createStore} from '../../src/state/store';
import {RenderReturns} from './renderTypes';

export const renderApp = (
  route = AppPaths.HOME,
  preloadState?: PartialReduxState,
): RenderReturns => {
  const store = createStore(preloadState);

  const app = mount(
    <MemoryRouter initialEntries={[route]}>
      <App persist={false} reduxStore={store}/>
    </MemoryRouter>,
  );

  return {app, store};
};
