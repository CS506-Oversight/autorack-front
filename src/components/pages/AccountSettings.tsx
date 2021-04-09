import React, {useState} from 'react';

import {Container, Grid, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {unwrapResult} from '@reduxjs/toolkit';
import {Redirect} from 'react-router-dom';

import AppPaths from '../../const/paths';
import {alertDispatchers} from '../../state/alert/dispatchers';
import {UpdatePasswordData} from '../../state/auth/data';
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

export const AccountSettings = () => {
  const classes = useStyles();
  const {user} = useAuthSelector();
  const dispatch = useDispatch();

  if (user == null) { // `==` for checking `null` or `undefined`
    return <Redirect to={AppPaths.SIGN_IN}/>;
  }

  const [newPassword, setNewPassword] = useState<UpdatePasswordData>({
    originalUser: user,
    password: '',
    newPassword: '',
  });

  const updateAccountPassword = (key: keyof UpdatePasswordData) => (newValue: string) => {
    setNewPassword({...newPassword, [key]: newValue});
  };

  const onSubmit = async () => {
    dispatch(authDispatchers.updatePassword(newPassword))
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
    <Container className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
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
              password={newPassword.password}
              placeholder="Current Password"
              label="Old Password"
              onValueChanged={updateAccountPassword('password')}
            />
            <InputPassword
              password={newPassword.newPassword}
              placeholder="New password"
              label="New Password"
              onValueChanged={updateAccountPassword('newPassword')}
            />
            <UIButton
              className={classes.button}
              text="Update Password"
              type="submit"
              color="primary"
              variant="contained"
              onClick={onSubmit}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
