import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, child, get, update } from "firebase/database";
import { db } from '../../../firebase';
import { toast } from "react-toastify";

export const getAllTeachers = createAsyncThunk(
  "teachers/getAllTeachers",
  async (_, thunkAPI) => {
    const dbRef = ref(db);

    try {
      const snapshot = await get(child(dbRef, "/teachers"));

      if (snapshot.exists()) {
        const data = snapshot.val();

        const allTeachers = Object.values(data);

        return allTeachers;
      } else {
        toast.warn("No data available");
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
    }
  }
);
