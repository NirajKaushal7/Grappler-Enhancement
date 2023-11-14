import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  companies: [
    // { id :  "1" ,companyName: "Sourabh Traders Daudwa ", email : "a@g.vom", description: "Grapler Enhancement ",structureType : "HIERARCHICAL", contactNumber : "9944", address : "Indore" , },
    // { id :  "2" ,companyName: "Innogent Technologies  ", email : "a@g.vom", description: "Grapler Enhancement ",structureType : "HIERARCHICAL", contactNumber : "9944", address : "Indore" , },
    // { id :  "3" ,companyName: "Innogent Technologies Europe ", email : "a@g.vom", description: "Grapler Enhancement ",structureType : "HIERARCHICAL", contactNumber : "9944", address : "Indore" , },
  ],
  usersWithRole :[],
};
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    fetchCompany: (state, action) => {
      console.log("inside get companyslice", action.payload);
      state.companies = action.payload;
    },
    fetchUser: (state, action) => {
      console.log("inside get companyslice", action.payload);
      state.usersWithRole = action.payload;
    },
    updateUserRole: (state, action) => {
      console.log("inside get companyslice", action.payload);
      const data = action.payload;
      state.usersWithRole = state.usersWithRole.map((obj) =>
        obj.user.id === data.id ? data : obj
        );
    },

    addCompany: (state, action) => {
      console.log("insice add  company slice ", action.payload);
      console.log(action.payload);
      state.companies.push(action.payload);
    },

    updateCompany: (state, action) => {
      console.log("inside update  company slice ", action.payload);
      const data = action.payload;
      state.companies = state.companies.map((obj) =>
        obj.id === data.id ? data : obj
      );
    },
    deleteCompany: (state, action) => {
      const id = action.payload;
      console.log("delete in slice", id);
      state.companies = state.companies.filter((item) => item.id !== id);
    },

    addLogo: (state, action) => {
      console.log("insice Add Logo   ", action.payload);
      const data = action.payload;
      // console.log(data);
      // const { companyId } = action.payload;
      // const { selectedFile } = action.payload;
      // console.log("name ", data.name);
      // console.log("selectedFile    ", selectedFile);
      state.companies = state.companies.map((company) =>
        company.id === data.companyId
          ? { ...company, logo: data.logoFileName }
          : company
      );
    },
  },
});
export const {
  fetchCompany,
  fetchUser,
  updateUserRole,
  updateCompany,
  addCompany,
  deleteCompany,
  addLogo,
} = companySlice.actions;
export default companySlice.reducer;
