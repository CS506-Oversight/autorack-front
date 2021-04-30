import React from 'react';

import {Container, makeStyles} from '@material-ui/core';
import {Redirect} from 'react-router-dom';

import Copyright from './components/elements/Copyright';
import {GlobalAlert} from './components/elements/GlobalAlert';
import {Navigation} from './components/elements/nav/Main';
import {AnonymousRoute} from './components/elements/routes/AnonymousRoute';
import {PrivateRoute} from './components/elements/routes/PrivateRoute';
import {PublicRoute} from './components/elements/routes/PublicRoute';
import {AccountSettings} from './components/pages/AccountSettings';
import {Authenticated} from './components/pages/Authenticated';
import {Dashboard} from './components/pages/Dashboard';
import {ForgotPassword} from './components/pages/ForgotPassword';
import {IngredientManagement} from './components/pages/IngredientManagement';
import {MenuManagement} from './components/pages/MenuManagement';
import {RestockPurchases} from './components/pages/RestockPurchases';
import {SignIn} from './components/pages/SignIn';
import {SignUp} from './components/pages/SignUp';
import AppPaths from './const/paths';
import {ReduxProvider, ReduxProviderProps} from './state/provider';

import './App.css';


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

      {/* Accessible regardless the login status */}

      <PublicRoute path={AppPaths.HOME}>
        <Redirect to={AppPaths.AUTHENTICATED}/>
      </PublicRoute>

      {/* Anonymous users only */}

      <AnonymousRoute path={AppPaths.SIGN_UP}>
        <SignUp/>
      </AnonymousRoute>
      <AnonymousRoute path={AppPaths.SIGN_IN}>
        <SignIn/>
      </AnonymousRoute>
      <AnonymousRoute path={AppPaths.FORGOT_PASSWORD}>
        <ForgotPassword/>
      </AnonymousRoute>

      {/* Authentication needed */}

      <PrivateRoute path={AppPaths.AUTHENTICATED}>
        <Authenticated/>
      </PrivateRoute>
      <PrivateRoute path={AppPaths.DASHBOARD}>
        <Dashboard/>
      </PrivateRoute>
      <PrivateRoute path={AppPaths.ACCOUNT_SETTINGS}>
        <AccountSettings/>
      </PrivateRoute>
      <PrivateRoute path={AppPaths.RESTOCK_PURCHASES}>
        <RestockPurchases/>
      </PrivateRoute>
      <PrivateRoute path={AppPaths.INGREDIENT_MANAGEMENT}>
        <IngredientManagement/>
      </PrivateRoute>
      <PrivateRoute path={AppPaths.MENU_MANAGEMENT}>
        <MenuManagement/>
      </PrivateRoute>
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
      <AppPage/>
    </ReduxProvider>
  );
};

export default App;
