import {createAsyncThunk} from '@reduxjs/toolkit';

import fireAuth from '../../config/firebaseConfig';
import {SignInData, SignUpData, User} from './data';
import {AUTH_STATE_NAME, AuthDispatcherName} from './name';

export const authDispatchers = {
  [AuthDispatcherName.SIGN_UP]: createAsyncThunk<User | null, SignUpData>(
    `${AUTH_STATE_NAME}/${AuthDispatcherName.SIGN_UP}`,
    async (signUpData: SignUpData, {rejectWithValue}) => {
      const res = await fireAuth.createUserWithEmailAndPassword(signUpData.email, signUpData.password);
      if (!res.user) {
        rejectWithValue('Firebase create user returns null user credential.');
        return null;
      }

      const userData: User = {
        email: signUpData.email,
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        id: res.user.uid,
        createdAt: Date.now(),
      };
      // TODO: Send user data to the database
      // https://stackoverflow.com/q/43509021/11571888
      return userData;
    },
  ),
  [AuthDispatcherName.SIGN_IN]: createAsyncThunk<User | null, SignInData>(
    `${AUTH_STATE_NAME}/${AuthDispatcherName.SIGN_IN}`,
    async (signInData: SignInData, {rejectWithValue}) => {
      const res = await fireAuth.signInWithEmailAndPassword(signInData.email, signInData.password);

      if (!res.user) {
        rejectWithValue('Firebase sign in returns null user credential.');
        return null;
      }

      if (!res.user.email) {
        rejectWithValue('Firebase sign in returns null email.');
        return null;
      }

      // TODO: Fetch user data (first name, last name) from the database
      // https://stackoverflow.com/q/43509021/11571888

      const userData: User = {
        email: res.user.email,
        firstName: 'Name fetching not implemented',
        lastName: res.user.email,
        id: res.user.uid,
      };

      return userData;
    },
  ),
  [AuthDispatcherName.SIGN_OUT]: createAsyncThunk<null, null>(
    `${AUTH_STATE_NAME}/${AuthDispatcherName.SIGN_OUT}`,
    async () => {
      await fireAuth.signOut();
      return null;
    },
  ),
};
