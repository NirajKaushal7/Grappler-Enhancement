import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateCompany } from "../../slices/companySlice";
import { updateCompanyApi } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

function CompanyUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies } = useSelector((state) => state.companylist);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("xccvfg");
  const [showErrorButton, setShowErrorButton] = useState(false);
  const [showOkayButton, setShowOkayButton] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const companyId = queryParams.get("id");

  console.log("insdie companyUpdate ", companyId);
  const company = companies.find((comp) => comp.id == companyId);
  console.log("cc", company);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function onSubmit(values) {
    try {
      console.log(values);
      const response = await updateCompanyApi(companyId, values);
      console.log("inside ", response.data);

      dispatch(updateCompany(response.data));
      setMessage(response.message);
      setShowErrorButton(false);
      setShowOkayButton(true);
      setOpen(true);

      // navigate(`/company`);
    } catch (error) {
      console.log(error.response);
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

  if (!company) {
    return <div>Loading...</div>; // You can show a loading message or handle this case as needed
  }
  return (
    <div className="container">
      <br />
      <br />
      <Formik
        initialValues={{
          id: company.companyId,
          name: company.name,
          email: company.email,
          description: company.description,
          address: company.address,
          contactNumber: company.contactNumber,
          structureType: company.structureType,
        }}
        onSubmit={(values) => {
          //  console.log(values) ;
          //updateCompany(values  ) ;
          onSubmit(values);
        }}
      >
        <Form className="custom-form">
          <div className="form-group">
            <label htmlFor="name">Company Name</label>
            <Field type="text" id="name" name="name" className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field
              as="textarea"
              id="description"
              name="description"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <Field
              type="text"
              id="address"
              name="address"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <Field
              type="text"
              id="contactNumber"
              name="contactNumber"
              className="form-control"
            />
          </div>

          <br />
          <br />
          <center>
            <button type="submit" className="btn btn-primary">
              Update Company
            </button>{" "}
            <br /> <br />
            {/* <button
              type="submit"
              onClick={navigate(-1)}
              className="btn btn-primary"
            >
              Go Back
            </button> */}
            <Link to="/company"  >
              <Button  className="btn btn-primary">
                Go Back
              </Button>
            </Link>
          </center>
        </Form>
      </Formik>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {/* Company Creation */}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 2,
              top: 1,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>{message}</Typography>
          </DialogContent>
          <DialogActions>
            {showErrorButton && (
              <Button onClick={handleClose} color="primary">
                Okay
              </Button>
            )}
            {showOkayButton && (
              <Link to="/company" style={{ textDecoration: "none" }}>
                <Button color="primary">Okay</Button>
              </Link>
            )}
          </DialogActions>
        </BootstrapDialog>
      </div>
    </div>
  );
}

export default CompanyUpdate;
