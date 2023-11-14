import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { addCompanyApi } from "../../api/api";
import { addCompany } from "../../slices/companySlice";
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

const CompanyAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("xccvfg");
  const [showErrorButton, setShowErrorButton] = useState(false);
  const [showOkayButton, setShowOkayButton] = useState(false);

  const handleClickOpen = () => {
    console.log("fvvfvd");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  async function handleAddCompany(company) {
    try {
      console.log(company);
      const response = await addCompanyApi(company);
      console.log("response.data.data = ", response.data);
      console.log("response.status = ", response.message);
      console.log("inside if");
      dispatch(addCompany(response.data.data));
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
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Create Company
                    </p>
                    <h2>Add New Owner</h2>
                    <Formik
                      initialValues={{
                        // id : "" ,
                        name: "",
                        email: "",
                        description: "",
                        address: "",
                        contactNumber: "",
                        structureType: "",
                      }}
                      onSubmit={(values) => {
                        console.log(values);
                        //updateCompany(values  ) ;
                        handleAddCompany(values);
                      }}
                    >
                      <Form className="custom-form">
                        <div className="form-group">
                          <label htmlFor="name">Company Name</label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            required
                          />
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
                            pattern="\d{10}"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="structureType">Structure Type</label>
                          <Field
                            as="select"
                            id="structureType"
                            name="structureType"
                            className="form-control"
                            defaultValue="HIERARCHICAL"
                            required
                          >
                            <option value="">Select an option</option>
                            <option value="HIERARCHICAL">Hierarchical</option>
                            <option value="NONHIERARCHICAL">
                              NonHierarchical
                            </option>
                            {/* Add other structure types as options here */}
                          </Field>
                        </div>
                        <br />
                        <br />
                        <button type="submit" className="btn btn-primary">
                          Add Company
                        </button>
                        <br />
                        <br />
                        <button
                          onClick={() => navigate(-1)}
                          className="btn btn-primary"
                        >
                          Go Back{" "}
                        </button>
                      </Form>
                    </Formik>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </section>
  );
};
export default CompanyAdd;
