import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  projects: [
    // {
    //   id: 1,
    //   name: "Project 1",
    //   folders: [
    //     { id: 1, name: "F1" },
    //     {
    //       id: 2,
    //       name: "F2",
    //       folders: [
    //         {
    //           id: 5,
    //           name: "FF1",
    //           folders: [
    //             {
    //               id: 80,
    //               name: "FFF1",
    //               folders: [
    //                 {
    //                   id: 80,
    //                   name: "FFFyy1",
    //                   folders: [
    //                     {
    //                       id: 80,
    //                       name: "FFFyy1",
    //                       folders: [
    //                         { id: 80, name: "FFFyy1" },
    //                         { id: 90, name: "FFFyy1" },
    //                       ],
    //                     },
    //                     { id: 90, name: "FFFyy1" },
    //                   ],
    //                 },
    //                 { id: 90, name: "FFFyy1" },
    //               ],
    //             },
    //             { id: 90, name: "FFF2" },
    //           ],
    //         },
    //         { id: 6, name: "FF2" },
    //       ],
    //     },

    //     { id: 3, name: "F3" },
    //     { id: 4, name: "F4" },
    //   ],
    // },
    // {
    //   id: 2,
    //   name: "Projects 2",
    //   folders: [
    //     { id: 5, name: "F1" },
    //     { id: 6, name: "F2" },
    //     { id: 8, name: "F3" },
    //     { id: 7, name: "F4" },
    //   ],
    // },
    // {
    //   id: 3,
    //   name: "Project 3",
    //   folders: [
    //     { id: 9, name: "F31" },
    //     { id: 10, name: "F41" },
    //   ],
    // },
    // {
    //   id: 4,
    //   name: "Project 4 ",
    //   folders: [
    //     { id: 9, name: "F31" },
    //     { id: 10, name: "F41" },
    //   ],
    // },
    // {
    //   id: 5,
    //   name: "Project 5 ",
    //   folders: [
    //     { id: 11, name: "F31" },
    //     { id: 12, name: "F41" },
    //   ],
    // },
  ],
};
const projectSlice = createSlice({
  name: "project", // Change the name to 'workspace'
  initialState,
  reducers: {
    fetchProjects: (state, action) => {
      console.log("inside fetchWorkspaces slice", action.payload);
      state.projects = action.payload;
    },
    createproject :(state,action)=>{
      console.log("in slices..",action.payload);
       state.projects.push(action.payload);
   },
  },
});
export const { fetchProjects , createproject } = projectSlice.actions;
export default projectSlice.reducer;
