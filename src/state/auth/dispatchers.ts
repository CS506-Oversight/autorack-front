import {createAsyncThunk} from '@reduxjs/toolkit';

import fireAuth from '../../config/firebaseConfig';
import {SignInData, SignUpData, User} from './data';

// For handling a known error: https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
// TODO: Better rejection error messages in thunk actions

export const authDispatchers = {
  setError: createAsyncThunk<string, string>(
    'auth/error',
    async (errorMessage: string) => {
      return errorMessage;
    },
  ),
  signUp: createAsyncThunk<User | null, SignUpData>(
    'auth/signUp',
    async (signUpData: SignUpData, {dispatch}) => {
      const res = await fireAuth.createUserWithEmailAndPassword(signUpData.email, signUpData.password);
      if (!res.user) {
        dispatch(authDispatchers.setError('Failed to sign up the user'));
        return null;
      }

      const userData: User = {
        email: signUpData.email,
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        id: res.user.uid,
        createdAt: new Date(),
      };
      // await firebase.firestore().collection('/users').doc(res.user.uid).set(userData);
      // await res.user.sendEmailVerification();
      // dispatch({
      //   type: NEED_VERIFICATION,
      // });
      // TODO: SEND THIS DATA TO THE DATABASE
      return userData;
    },
  ),
  signIn: createAsyncThunk<User | null, SignInData>(
    'auth/signIn',
    async (signInData: SignInData, {dispatch}) => {
      const res = await fireAuth.signInWithEmailAndPassword(signInData.email, signInData.password);

      if (!res.user) {
        dispatch(authDispatchers.setError('Failed to sign in the user'));
        return null;
      }

      if (!res.user.email) {
        dispatch(authDispatchers.setError('No email associated with the user'));
        return null;
      }

      // TODO: Fetch user name from the database
      // https://stackoverflow.com/q/43509021/11571888

      // FIXME: firstName, lastName when signing in

      const userData: User = {
        email: res.user.email,
        firstName: 'Name fetching not implemented',
        lastName: res.user.email,
        id: res.user.uid,
      };

      return userData;
    },
  ),
  signOut: createAsyncThunk<null, null>(
    'auth/signOut',
    async () => {
      await fireAuth.signOut();
      return null;
    },
  ),
};

// TODO: getUserById
// TODO: sendPasswordResetEmail
