import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {Redirect} from 'react-router-dom';

import AppPaths from '../../const/paths';
import {alertDispatchers} from '../../state/alert/dispatchers';
import {SignUpData} from '../../state/auth/data';
import {authDispatchers} from '../../state/auth/dispatchers';
import {useDispatch} from '../../state/store';
import {AccountInfoForm} from '../elements/account/InfoForm';
import InputEmail from '../elements/account/InputEmail';
import {InputName} from '../elements/account/InputName';
import InputPassword from '../elements/account/InputPassword';


const SignUpFooter = () => {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Link href={AppPaths.SIGN_IN} variant="body2">
          Already have an account? Sign in
        </Link>
      </Grid>
    </Grid>
  );
};

export const SignUp = () => {
  const [accountInfo, setAccountInfo] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // State for triggering the re-render to redirects the user
  const [signedUp, setSignedUp] = useState(false);

  const dispatch = useDispatch();

  const updateAccountInfo = (key: string) => (newValue: string) => {
    setAccountInfo({...accountInfo, [key]: newValue});
  };

  const onSubmitSuccess = () => {
    dispatch(alertDispatchers.showAlert({severity: 'success', message: 'You have successfully signed up!'}));
    setSignedUp(true);
  };

  if (signedUp) {
    // TODO: Redirect to the page right after signing up
    return <Redirect to={AppPaths.AUTHENTICATED}/>;
  }

  return (
    <AccountInfoForm
      title="Sign up"
      buttonTextDefault="Sign up"
      accountInfoData={accountInfo}
      dispatcher={authDispatchers.signUp}
      onSubmitSuccess={onSubmitSuccess}
      footer={<SignUpFooter/>}
    >
      <Grid container spacing={2}>
        <InputName
          firstValue={accountInfo.firstName}
          firstOnChanged={updateAccountInfo('firstName')}
          lastValue={accountInfo.lastName}
          lastOnChanged={updateAccountInfo('lastName')}
        />
        <Grid item xs={12}>
          <InputEmail email={accountInfo.email} onValueChanged={updateAccountInfo('email')}/>
        </Grid>
        <Grid item xs={12}>
          <InputPassword password={accountInfo.password} onValueChanged={updateAccountInfo('password')}/>
        </Grid>
      </Grid>
    </AccountInfoForm>
  );
};
