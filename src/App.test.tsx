import {renderApp} from '../test/utils/render';
import RequestSender from './api/utils/requestSender';
import {Authenticated} from './components/pages/Authenticated';
import {SignIn} from './components/pages/SignIn';
import {SignUp} from './components/pages/SignUp';
import AppPaths from './const/paths';
import {User} from './state/auth/data';

describe('auth redirect behavior', () => {
  const testUser: User = {
    email: 'bbj@gmail.com',
    firstName: 'name',
    lastName: 'name',
    id: 'id',
  };

  test('anonymous user is redirected to sign-in from authenticated', async () => {
    const {app, store} = renderApp(AppPaths.AUTHENTICATED);

    expect(store.getState().auth.user).toBeNull();
    expect(app.find(Authenticated).exists()).toBeFalsy();
    expect(app.find(SignIn).exists()).toBeTruthy();
  });

  test('anonymous user can go to the sign-in page', () => {
    const {app, store} = renderApp(AppPaths.SIGN_IN);

    expect(store.getState().auth.user).toBeNull();
    expect(app.find(Authenticated).exists()).toBeFalsy();
    expect(app.find(SignIn).exists()).toBeTruthy();
  });

  test('logged in user can go to the authenticated page', () => {
    const {app, store} = renderApp(AppPaths.HOME);

    expect(store.getState().auth.user).toBeNull();
    expect(app.find(SignUp).exists()).toBeFalsy();
    expect(app.find(Authenticated).exists()).toBeFalsy();
  });

  test('logged in user is redirected from sign-in to authenticated', () => {
    const {app, store} = renderApp(AppPaths.SIGN_IN, {auth: {user: testUser}});

    expect(app.find(SignIn).exists()).toBeFalsy();
    expect(app.find(Authenticated).exists()).toBeFalsy();
    expect(store.getState().auth.user).toBe(testUser);
  });

  test('logged in user can go to authenticated page', () => {
    const {app, store} = renderApp(AppPaths.AUTHENTICATED, {auth: {user: testUser}});

    expect(app.find(SignIn).exists()).toBeFalsy();
    expect(app.find(Authenticated).exists()).toBeTruthy();
    expect(store.getState().auth.user).toBe(testUser);
  });
});

it('checks API is up', async () => {
  if (!await RequestSender.isApiAvailable()) {
    // Fail the test
    throw new Error('Backend API is not available. Make sure you correctly configured the URL and started it.');
  }
});

// TODO: [Test] take calculator as an example to create user-story tests and test for `RequestSender`
