import {Grid, Link} from '@material-ui/core';
import React, {useState} from 'react';
import {signIn} from '../../actions/authActions';
import {SignInData} from '../../actions/types';
import AppPaths from '../../const/paths';
import {AccountInfoForm} from '../elements/account/InfoForm';
import InputEmail from '../elements/account/InputEmail';
import InputPassword from '../elements/account/InputPassword';

const SignInFooter = () => {
  return (
    <Grid container>
      <Grid item xs>
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link href={AppPaths.SIGN_UP} variant="body2">
          Don&apos;t have an account? Sign Up
        </Link>
      </Grid>
    </Grid>
  );
};

export const SignIn = () => {
  const [accountInfo, setAccountInfo] = useState<SignInData>({
    email: '',
    password: '',
  });

  const updateAccountInfo = (key: string) => (newValue: string) => {
    setAccountInfo({...accountInfo, [key]: newValue});
  };

  return (
    <AccountInfoForm
      title="Sign in"
      buttonTextDefault="Sign in"
      accountInfoData={accountInfo}
      onDispatch={signIn}
      footer={<SignInFooter/>}
    >
      <InputEmail email={accountInfo.email} onValueChanged={updateAccountInfo('email')}/>
      <InputPassword password={accountInfo.password} onValueChanged={updateAccountInfo('password')}/>
    </AccountInfoForm>
  );
};
