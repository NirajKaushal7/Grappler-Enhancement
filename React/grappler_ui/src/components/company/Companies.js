import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addLogo,
  deleteCompany,
  fetchCompany,
} from "../../slices/companySlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./../../css/company.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { IoIosAddCircle } from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { addImage, getAllCompanies } from "../../api/api";

function Companies() {
  console.log("inside companies");
  const { companies } = useSelector((state) => state.companylist);
  const [open, setOpen] = useState(false);
  const [deleteDialogue, setDeleteDialogue] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [isDelete, setIsDelete] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("Inside Company ", companies);
  const API_BASE_URL = "http://localhost:8080/comapnies";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCompanies();
        console.log("sssssssss", response.data);
        dispatch(fetchCompany(response.data));
      } catch (error) {
        console.error("Error Message ", error);
      }
    };
    fetchData();
  }, [dispatch]);

  function showUsers(id) {
    console.log("from userList  ", id);
    navigate(`/user?id=${id}`);
  }

  function handleUpdate(id) {
    console.log(id);
    navigate(`/updateCompany?id=${id}`);
  }
  function showWorkspaces(id) {
    console.log("from company ID  ", id);
    navigate(`/workspace?id=${id}`);
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    if (selectedFile) {
      // Check the size here (for example, limit to 1MB)
      setOpen(false);
      if (selectedFile.size <= 1048576) {
        try {
          const response = await addImage(companyId, selectedFile);
          console.log(response.data);
          const logoFileName = response.data.logo;
          console.log(logoFileName);
          dispatch(addLogo({ companyId, logoFileName }));
          navigate(`/company`);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      } else {
        alert("File size exceeds the allowed limit (1MB).");
      }
    } else {
      alert("No file selected.");
    }
  };

  function handleDelete() {
    if (companyId) {
      axios
        .delete("http://localhost:8080/companies/" + companyId)
        .then((response) => {
          dispatch(deleteCompany(companyId));
          // navigate('/company');
          setDeleteDialogue(false);
        })
        .catch((error) => {
          console.error("Error while deleting the Company:", error);
          alert("Error while deleting the item");
          setDeleteDialogue(false);
        });
    }
  }

  const handleLogoClick = (companyId) => {
    setCompanyId(companyId);
    setOpen(true);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="container">
        <div className="badge bg-info text-wrap mt-2">
          <h2> Company </h2>
        </div>
        <div className="right-aligned-div">
          <Link to="/addCompany" className="menu-bars">
            <IoIosAddCircle />
          </Link>
        </div>
        <table className="table table-striped table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>Company Logo </th>
              <th>Company Name</th>
              <th>Explore</th>
              <th>Users</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((comp) => (
              <tr key={comp.id}>
                <td>
                  <div
                    className="logo-container"
                    onClick={() => handleLogoClick(comp.id)}
                  >
                    <img
                      src={`data:image/jpeg;base64,${comp.logo}`}
                      alt="Company Logo"
                    />
                  </div>
                </td>
                <td> {comp.name}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => showWorkspaces(comp.id)}
                  >
                    View Workspaces
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => showUsers(comp.id, comp.companyName)}
                    className="btn btn-primary"
                  >
                    View Users
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => [
                      setCompanyId(comp.id),
                      setDeleteDialogue(true),
                    ]}
                    className="btn btn-danger"
                  >
                    Delete{" "}
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleUpdate(comp.id)}
                    className="btn btn-secondary"
                  >
                    {" "}
                    Update{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          // PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Upload New Logo
          </DialogTitle>
          <div className="company-logo-container">
            <div className="file-input-container">
              <input type="file" id="file-input" onChange={handleFileChange} />
              <label htmlFor="file-input" className="file-label">
                Choose File
              </label>
            </div>
            <button onClick={handleUpload} className="upload-button">
              Upload
            </button>
          </div>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={deleteDialogue}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>Do you want to Delete Company</DialogContent>
          <DialogActions>
            <Button onClick={handleDelete}>Delete</Button>
            <Button
              onClick={() => {
                setDeleteDialogue(false);
              }}
              autoFocus
            >
              cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Companies;
