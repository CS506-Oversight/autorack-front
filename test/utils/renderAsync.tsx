import React from 'react';

import {mount, ReactWrapper} from 'enzyme';
import {act} from 'react-dom/test-utils';
import {MemoryRouter} from 'react-router-dom';

import App from '../../src/App';
import AppPaths from '../../src/const/paths';
import {PartialReduxState} from '../../src/state/state';
import {createStore} from '../../src/state/store';
import {RenderReturns} from './renderTypes';

/**
 * Wrapper function to wait for the app completed rendering.
 *
 * @param {ReactWrapper} wrapper
 * @return {Promise<void>}
 * @see https://stackoverflow.com/a/63612692/11571888
 */
export const waitForPaint = async (wrapper: ReactWrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};

type RenderAsyncOptions = {
  preloadState?: PartialReduxState,
  waitToPaint?: boolean,
}

export const renderAppAsync = async (
  route = AppPaths.HOME,
  options: RenderAsyncOptions = {},
): Promise<RenderReturns> => {
  const store = createStore(options.preloadState);

  const app = mount(
    <MemoryRouter initialEntries={[route]}>
      <App persist={false} reduxStore={store}/>
    </MemoryRouter>,
  );

  if (options.waitToPaint) {
    await waitForPaint(app);
  }

  return {app, store};
};
