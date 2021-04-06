import React from 'react';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, {mount, ReactWrapper} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';

import App from '../src/App';
import AppPaths from '../src/const/paths';
import {PartialReduxState} from '../src/state/state';
import {createStore, ReduxStore} from '../src/state/store';

Enzyme.configure({adapter: new Adapter()});

type RenderReturns = {
  app: ReactWrapper,
  store: ReduxStore,
}

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
