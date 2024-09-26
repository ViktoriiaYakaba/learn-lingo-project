import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from "firebase/auth";
import { auth } from '../../../firebase';

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (newUserData, { rejectWithValue }) => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          newUserData.email,
          newUserData.password
        );
  
        await updateProfile(auth.currentUser, {
          displayName: newUserData.username,
        });
        const { uid, displayName, email } = auth.currentUser;
        return { uid, displayName, email };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);
  
export const logInUser = createAsyncThunk(
    "auth/logInUser",
    async (userData, { rejectWithValue }) => {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        const { uid, displayName, email } = user;
        return { uid, displayName, email };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

   export const logOut = createAsyncThunk(
    "auth/logOut",
    async (_, { rejectWithValue }) => {
      try {
        await signOut(auth);
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  