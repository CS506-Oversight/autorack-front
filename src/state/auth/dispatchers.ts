import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import firebase from 'firebase/app';

import ApiPaths from '../../api/definitions/paths';
import fireAuth from '../../config/firebaseConfig';
import {ResetPasswordData, SignInData, SignUpData, User, UpdatePasswordData} from './data';
import {AUTH_STATE_NAME, AuthDispatcherName} from './name';

export type AuthActionReturn<R> = R extends User ? (R | null) : R;

export const authDispatchers = {
  [AuthDispatcherName.SIGN_UP]: createAsyncThunk<AuthActionReturn<User | null>, SignUpData>(
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

      // Send user data to the backend
      await axios.post(ApiPaths.USER, JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // https://stackoverflow.com/q/43509021/11571888
      return userData;
    },
  ),
  [AuthDispatcherName.SIGN_IN]: createAsyncThunk<AuthActionReturn<User | null>, SignInData>(
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

      const id = res.user.uid;

      // Fetch user data from the backend
      const response = await axios.get(ApiPaths.USER + `?user_id=${id}`)
        .then((res) => {
          return res.data;
        });

      if (!response.ok) {
        rejectWithValue(response.message);
        return null;
      }

      const userData: User = response.data;

      return userData;
    },
  ),
  [AuthDispatcherName.SIGN_OUT]: createAsyncThunk<AuthActionReturn<null>>(
    `${AUTH_STATE_NAME}/${AuthDispatcherName.SIGN_OUT}`,
    async () => {
      await fireAuth.signOut();
      return null;
    },
  ),
  [AuthDispatcherName.FORGOT_PASSWORD]: createAsyncThunk<AuthActionReturn<null>, ResetPasswordData>(
    `${AUTH_STATE_NAME}/${AuthDispatcherName.FORGOT_PASSWORD}`,
    async (resetPasswordData: ResetPasswordData) => {
      await fireAuth.sendPasswordResetEmail(resetPasswordData.email);
      return null;
    },
  ),
  [AuthDispatcherName.UPDATE_PASSWORD]:
    createAsyncThunk<AuthActionReturn<User>, UpdatePasswordData>(
      `${AUTH_STATE_NAME}/${AuthDispatcherName.UPDATE_PASSWORD}`,
      async (payload: UpdatePasswordData) => {
        if (payload.password === payload.newPassword) {
          throw new Error('New password is the same as the old one.');
        }

        const cred = firebase.auth.EmailAuthProvider.credential(payload.originalUser.email, payload.password);
        await fireAuth.currentUser?.reauthenticateWithCredential(cred);

        await fireAuth.currentUser?.updatePassword(payload.newPassword);

        return payload.originalUser;
      },
    ),
};
