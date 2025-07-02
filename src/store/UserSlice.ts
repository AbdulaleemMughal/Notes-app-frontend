import { createSlice } from "@reduxjs/toolkit";

interface UserInterface {
  _id?: string;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

type UserState = UserInterface | null;

const initialState: UserState = null;

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = UserSlice.actions;

export default UserSlice.reducer;
