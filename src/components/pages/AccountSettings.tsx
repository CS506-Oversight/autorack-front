import React, {useState} from 'react';

import {Container, Grid, Paper} from '@material-ui/core';
// import {alertDispatchers} from '../../state/alert/dispatchers';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {unwrapResult} from '@reduxjs/toolkit';
import {Redirect} from 'react-router-dom';

import AppPaths from '../../const/paths';
import {alertDispatchers} from '../../state/alert/dispatchers';
import {UpdateUserPassword} from '../../state/auth/data';
import {authDispatchers} from '../../state/auth/dispatchers';
import {useAuthSelector} from '../../state/auth/selector';
import {useDispatch} from '../../state/store';
import InputPassword from '../elements/account/InputPassword';
import UIButton from '../elements/ui/Button';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '15%',
  },
  paper: {
    padding: '5em 0',
    marginLeft: '10em',
    marginRight: '10em',
  },
  heading: {
    paddingBottom: '1em',
  },
  button: {
    marginTop: '1em',
  },
}));

export const Settings = () => {
  const classes = useStyles();
  const {user} = useAuthSelector();
  const dispatch = useDispatch();

  if (user == null) { // `==` for checking `null` or `undefined`
    return <Redirect to={AppPaths.SIGN_IN}/>;
  }

  const [newAccountPassword, setNewAccountPassword] = useState<UpdateUserPassword>({
    originalUser: user,
    password: '',
    newPassword: '',
  });

  const updateCurrentAccountPassword = (key: string) => (newValue: string) =>{
    setNewAccountPassword({...newAccountPassword, [key]: newValue});
  };

  const fireUpdatePassword = async () => {
    dispatch(authDispatchers.updatePassword(newAccountPassword))
      .then(unwrapResult)
      .then(() =>
        dispatch(alertDispatchers.showAlert({
          severity: 'success',
          message: 'Password successfully changed!',
        })),
      )
      .catch((error) => {
        dispatch(alertDispatchers.showAlert({
          severity: 'error',
          message: error.message,
        }));
      });
  };

  return (
    <>
      <Container className={classes.root} >
        <Paper elevation={3} className={classes.paper} >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography component="h1" variant="h3" className={classes.heading}>Settings</Typography>
            <Grid item xs={6}>
              <Typography variant="h5">Update Password</Typography>
              <InputPassword
                password={newAccountPassword.password}
                onValueChanged={updateCurrentAccountPassword('password')}
                placeholder={'Current Password'}
                label='Old Password'
              />
              <InputPassword placeholder={'New password'}
                password={newAccountPassword.newPassword}
                onValueChanged={updateCurrentAccountPassword('newPassword')}
                label='New Password'
              />
              <UIButton
                text='Update Password'
                type="submit"
                color="primary"
                variant="contained"
                onClick={fireUpdatePassword}
                className={classes.button}
              />
            </Grid>
            <br/>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
