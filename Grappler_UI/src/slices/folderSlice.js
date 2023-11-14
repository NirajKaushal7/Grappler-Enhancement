
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  folders: [],
  selectedFolder: null,
};

const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    selectFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    addFolder: (state, action) => {
      state.folders.push(action.payload);
    },
    updateFolder: (state, action) => {
      const updatedFolder = action.payload;
      state.folders = state.folders.map((folder) =>
        folder.id === updatedFolder.id ? updatedFolder : folder
      );
    },
    deleteFolder: (state, action) => {
      const deletedFolderId = action.payload;
      state.folders = state.folders.filter((folder) => folder.id !== deletedFolderId);
    },
  },
});

export const {
  setFolders,
  selectFolder,
  addFolder,
  updateFolder,
  deleteFolder,
} = folderSlice.actions;

export default folderSlice.reducer;
