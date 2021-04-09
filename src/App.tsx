import React from 'react';

import {Container, makeStyles} from '@material-ui/core';
import {BrowserRouter} from 'react-router-dom';

import './App.css';
import Copyright from './components/elements/Copyright';
import {GlobalAlert} from './components/elements/GlobalAlert';
import {Navigation} from './components/elements/nav/Main';
import {PrivateRoute} from './components/elements/routes/PrivateRoute';
import {PublicRoute} from './components/elements/routes/PublicRoute';
import {AccountSettings} from './components/pages/AccountSettings';
import {Authenticated} from './components/pages/Authenticated';
import {ForgotPassword} from './components/pages/ForgotPassword';
import {Homepage} from './components/pages/Homepage';
import {SignIn} from './components/pages/SignIn';
import {SignUp} from './components/pages/SignUp';
import AppPaths from './const/paths';
import {ReduxProvider, ReduxProviderProps} from './state/provider';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

/**
 * Content of each page.
 *
 * @return {JSX.Element}
 */
const PageContent = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <GlobalAlert/>

      {/* Anonymous users only */}

      <PublicRoute path={AppPaths.HOME}>
        <Homepage/>
      </PublicRoute>
      <PublicRoute path={AppPaths.SIGN_UP}>
        <SignUp/>
      </PublicRoute>
      <PublicRoute path={AppPaths.SIGN_IN}>
        <SignIn/>
      </PublicRoute>
      <PublicRoute path={AppPaths.FORGOT_PASSWORD}>
        <ForgotPassword/>
      </PublicRoute>

      {/* Authentication needed */}

      <PrivateRoute path={AppPaths.AUTHENTICATED}>
        <Authenticated/>
      </PrivateRoute>
      <PrivateRoute path={AppPaths.ACCOUNT_SETTINGS}>
        <AccountSettings/>
      </PrivateRoute>

      {/* Common routes */}
      <Copyright/>
    </Container>
  );
};

/**
 * Body of the app.
 *
 * @return {JSX.Element}
 */
const AppPage = () => {
  return (
    <>
      <Navigation/>
      <PageContent/>
    </>
  );
};

/**
 * Main app, i.e. the entry point.
 *
 * @param {ReduxProviderProps} props properties for the redux provider
 * @return {JSX.Element}
 * @constructor
 */
const App = (props: ReduxProviderProps) => {
  return (
    <ReduxProvider {...props}>
      <BrowserRouter>
        <AppPage/>
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;
