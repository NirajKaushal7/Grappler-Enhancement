import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  workspaces: [],
};
const workspaceSlice = createSlice({
  name: 'workspace', // Change the name to 'workspace'
  initialState,
  reducers: {
    fetchWorkspaces: (state, action) => {
      console.log('inside fetchWorkspaces slice', action.payload);
      state.workspaces = action.payload;
    }, 
    createWorkspaces:(state,action)=>{
      console.log("in slices..",action.payload);
       state.workspaces.push(action.payload);
   },
   updateWorkspaceSlice: (state,action) =>{
       console.log("in slices",action.payload);
       const data=action.payload;
       state.workspaces=state.workspaces.map((obj)=>
         obj.id === data.id ? data : obj
       );
   },
   deleteWorkspaceSlice :(state,action)=>{
       const id=action.payload;
       console.log("deleting workspace in slice",id);
       state.workspaces=state.workspaces.filter((item)=>item.id !== id);
   }
 },
});

export const { fetchWorkspaces, createWorkspaces, updateWorkspaceSlice ,deleteWorkspaceSlice} = workspaceSlice.actions;
export default workspaceSlice.reducer;