import {Container, makeStyles} from '@material-ui/core';
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import './App.css';
import Copyright from './components/elements/Copyright';

import {Navigation} from './components/elements/nav/Main';
import {Calculator} from './components/pages/Calculator';
import {Homepage} from './components/pages/Homepage';
import {SignIn} from './components/pages/SignIn';
import {SignUp} from './components/pages/SignUp';
import {PrivateRoute} from './components/auth/PrivateRoute';
import AppPaths from './const/paths';
import {persistor, store} from './state/store';


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
      <Route exact path={AppPaths.HOME}>
        <Homepage/>
      </Route>
      <Route exact path={AppPaths.SIGN_UP}>
        <SignUp/>
      </Route>
      <Route exact path={AppPaths.SIGN_IN}>
        <SignIn/>
      </Route>
      <PrivateRoute exact path={AppPaths.CALC} component={Calculator} />

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
 * Main app. Tests should use this and not the others.
 *
 * @return {JSX.Element}
 */
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <AppPage/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
