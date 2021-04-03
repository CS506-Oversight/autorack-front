import React, {useState} from 'react';

import {alertDispatchers} from '../../state/alert/dispatchers';
import {ResetPasswordData} from '../../state/auth/data';
import {authDispatchers} from '../../state/auth/dispatchers';
import {useDispatch} from '../../state/store';
import {AccountInfoForm} from '../elements/account/InfoForm';
import InputEmail from '../elements/account/InputEmail';

export const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState<ResetPasswordData>({
    email: '',
  });

  const onSubmitSuccess = () => {
    dispatch(
      alertDispatchers.showAlert({
        severity: 'success',
        message: 'A Reset link was sent to your email!',
      }),
    );
    setUserEmail({email: ''});
  };

  const updateAccountInfo = (key: string) => (newValue: string) => {
    setUserEmail({...userEmail, [key]: newValue});
  };

  return (
    <>
      <AccountInfoForm
        title="Forgot Password"
        buttonTextDefault="Reset Password"
        accountInfoData={userEmail}
        onSubmitSuccess={onSubmitSuccess}
        dispatcher={authDispatchers.forgotPassword}
      >
        <InputEmail email={userEmail.email} onValueChanged={updateAccountInfo('email')}/>
      </AccountInfoForm>
    </>
  );
};
