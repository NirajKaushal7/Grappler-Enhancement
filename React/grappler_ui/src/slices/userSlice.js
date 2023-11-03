import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [
    // Add your initial user data here
  ],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser: (state, action) => {
      console.log("inside get userSlice", action.payload);
      state.users = action.payload;
    },
    addUser: (state, action) => {
      console.log("inside add user slice", action.payload);
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      console.log("inside update user slice", action.payload);
      const data = action.payload;
      state.users = state.users.map((user) =>
        user.id === data.id ? data : user
      );
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      console.log("delete in user slice", id);
      state.users = state.users.filter((user) => user.id !== id);
    },
    addProfilePic: (state, action) => {
      console.log("inside Add Profile Pic", action.payload);
      const data = action.payload;
      state.users = state.users.map((user) =>
        user.id === data.userId ? { ...user, profilePic: data.profilePicFileName } : user
      );
    },
    addLogo: (state, action) => {
      console.log("insice Add Logo   ", action.payload);
      const data = action.payload;
      console.log(data);
      console.log("name ", data.name);
      // console.log("selectedFile    ", selectedFile);
      state.users = state.users.map((user) =>
        user.id === data.userId
          ? { ...user, profile: data.logoFileName }
          : user
      );
    },
  },
});
export const {
  fetchUser,
  updateUser,
  addUser,
  deleteUser,
  addProfilePic,
  addLogo,
} = userSlice.actions;
export default userSlice.reducer;