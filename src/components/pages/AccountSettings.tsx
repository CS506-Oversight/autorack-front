import React, {useState} from 'react';

import {Container, Grid, Paper} from '@material-ui/core';
// import {alertDispatchers} from '../../state/alert/dispatchers';
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
export const Settings = () => {
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
      <Container>
        <Paper elevation={3}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"

          >
            <br/>
            <Typography component="h1" variant="h3">Settings</Typography>
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
              />
            </Grid>
            <br/>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
