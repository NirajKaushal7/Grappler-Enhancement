import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Outlet,
} from "react-router-dom"; // Change Router to BrowserRouter
import Navbar from "./components/Sidebar";
import "./app.css";
import Companies from "./components/company/Companies";
import Home from "./components/Home";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { fetchCompany } from "./slices/companySlice";
// import { getAllCompanies } from "./api/api";
import CompanyUser from "./components/company/CompanyUser";
import CompanyUpdate from "./components/company/CompanyUpdate";
import CompanyAdd from "./components/company/CompanyAdd";
import Workspaces from "./components/workspace/Workspaces";
// import NavWorkspace from "./components/workspace/NavWorkspace";
import SidebarWorkspace from "./components/workspace/SidebarWorkspace";
// import addWorkspace from "./components/workspace/addWorkspace";
import Dashboard from "./components/workspace/Dashboard";
import Sidebar from "./components/Sidebar";
import UsersTask from "./components/task/UsersTask";
import Users from "./components/User/Users";
import AddUser from "./components/User/AddUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Task from "./components/task/Task";

function App() {
  return (
    <div>
<ToastContainer />{/* To render the toasts */}
    <>
      <Router>
        <Sidebar />
        {/* <SidebarWorkspace /> */}

        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/company" element={<Companies />} />
          <Route path="/companyUser" element={<CompanyUser />} />
          <Route path="/user" element={<Users />} />
          <Route path="/addCompany" element={<CompanyAdd />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/updateCompany" element={<CompanyUpdate />} />
          <Route path="/workspace" element={<Workspaces />} />
          <Route path="/workspace" element={<Workspaces />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
                path="workspaces/:workspaceId/*"
                element={
                  <div style={{display:"flex"}}>
                    <SidebarWorkspace />
                    <Outlet />
                  </div>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tasks" element={<Task />} />
              </Route>
          {/* <Route path="/workspaces/tasks" element={<Task />} /> */}
          <Route path="/addworkspace" element={<addWorkspace />} />
        </Routes>
      </Router>
    </> 
    </div>
  );
}

export default App;
