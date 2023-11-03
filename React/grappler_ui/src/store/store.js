import { configureStore } from "@reduxjs/toolkit";
import companySlice from "../slices/companySlice";
import workspacesSlice from "../slices/workspaceSlice";
import projectSlice from "../slices/projectSlice";
import taskSlice from "../slices/taskSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
  reducer: {
    companylist: companySlice,
    workspaceList: workspacesSlice,
    projectList: projectSlice,
    tasks : taskSlice,
    user : userSlice,
  },
});
export default store;
