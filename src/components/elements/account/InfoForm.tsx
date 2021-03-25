import React, {FormEvent, useState} from 'react';

import {Container} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {AsyncThunk, unwrapResult} from '@reduxjs/toolkit';

import {FetchStatus} from '../../../api/definitions/misc';
import {alertDispatchers} from '../../../state/alert/dispatchers';
import {User, UserAuthInfo} from '../../../state/auth/data';
import {useReduxDispatch} from '../../../state/store';
import UIButton from '../ui/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type AccountInfoFormProps<T extends UserAuthInfo> = {
  title: string,
  buttonTextDefault: string,
  buttonTextLoading?: string,
  accountInfoData: T,
  dispatcher: AsyncThunk<User | null, T, {}>,
  onSubmitSuccess?: (user?: User | null) => void,
  footer: JSX.Element,
}

export const AccountInfoForm = <T extends UserAuthInfo>({
  title,
  buttonTextDefault,
  buttonTextLoading,
  accountInfoData,
  dispatcher,
  onSubmitSuccess,
  children,
  footer,
}: React.PropsWithChildren<AccountInfoFormProps<T>>) => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>({
    fetched: false,
    fetching: false,
  });

  const dispatch = useReduxDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFetchStatus({
      fetching: true,
      fetched: false,
    });
    dispatch(dispatcher(accountInfoData))
      .then(unwrapResult)
      .then((result) => onSubmitSuccess && onSubmitSuccess(result))
      .catch((error) => {
        setFetchStatus({
          fetching: false,
          fetched: true,
        });
        dispatch(alertDispatchers.showAlert({severity: 'error', message: error.message}));
      });
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">{title}</Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          {children}
          <UIButton
            text={fetchStatus.fetching ? buttonTextLoading || 'Loading...' : buttonTextDefault}
            disabled={fetchStatus.fetching}
            type="submit"
            color="primary"
            className={classes.submit}
            variant="contained"
          />
          {footer}
        </form>
      </div>
    </Container>
  );
};
