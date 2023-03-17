import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, position:{}, photos : [], book: {} }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLog: (state, action) => {
      state.value.token = action.payload;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.position = {};
      state.value.book = {};
    },
    addPhoto: (state, action) => {
      state.value.photos.push(action.payload);
    },
    addPhotoFromBdd: (state, action) => {
      state.value.photos = action.payload;
    },
    removePhoto: (state, action) => {
      state.value.photos = state.value.photos.filter(
        (data) => data !== action.payload
      );
    },
    searchPosition: (state, action) => {
      state.value.position = action.payload
    },
    deleteUser: (state, action) => {
      state.value.token = null;
      state.value.position = {};
      state.value.photos = [];
    },
    bookMed: (state, action) => {
      state.value.book = action.payload;
    },
    validateBook: (state, action) => {
      state.value. book = {};
    }
  },
});

export const { userLog, logout, addPhoto, addPhotoFromBdd, removePhoto, searchPosition, deleteUser, bookMed, validateBook } = userSlice.actions;
export default userSlice.reducer;
