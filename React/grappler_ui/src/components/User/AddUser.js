import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { addUserApi } from "../../api/UserApi"; // Assuming there's a user-related API
import { addUser } from "../../slices/userSlice"; // Import addUser from userSlice
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(""); // Initialize message as an empty string
  const [showErrorButton, setShowErrorButton] = useState(false);
  const [showOkayButton, setShowOkayButton] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleAddUser(user) {
    try {
      console.log(user);
      const response = await addUserApi(user); // Use addUserApi for user creation
      console.log("response.data.data = ", response.data);
      console.log("response.status = ", response.message);
      dispatch(addUser(response.data.data)); // Dispatch addUser action
      setMessage(response.data.message);
      setShowErrorButton(false);
      setShowOkayButton(true);
      setOpen(true);
      handleClickOpen();
    } catch (error) {
      setMessage(error.response.data.message);
      setShowOkayButton(false);
      setShowErrorButton(true);
      setOpen(true);
    }
  }

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      {/* ...Rest of the code remains the same... */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          description: "",
          address: "",
          contactNumber: "",
          structureType: "HIERARCHICAL", // Default structureType
        }}
        onSubmit={(values) => {
          handleAddUser(values); // Call handleAddUser instead of handleAddCompany
        }}
      >
        <Form className="custom-form">
          {/* ...Form fields for user data... */}
        </Form>
      </Formik>
      {/* ...Rest of the code remains the same... */}
    </section>
  );
};

export default AddUser;
