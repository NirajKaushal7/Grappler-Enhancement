import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../../slices/userSlice"; // Import relevant Redux actions and slices
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./../../css/user.css"; // You can create a separate CSS file for the UserComponent
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { IoIosAddCircle } from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { addUser, getAllUsers } from "../../api/api"; // You'll need to adjust API calls and functions

function UpdateUser() {
  console.log("inside UserComponent");
  const { users } = useSelector((state) => state.userlist);
  const [open, setOpen] = useState(false);
  const [deleteDialogue, setDeleteDialogue] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isDelete, setIsDelete] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("Inside UserComponent ", users);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUsers(); // Adjust the API call to fetch users
        console.log("Users data", response.data);
        dispatch(fetchUsers(response.data)); // Use the appropriate Redux action
      } catch (error) {
        console.error("Error Message ", error);
      }
    };
    fetchData();
  }, [dispatch]);

  function handleUpdate(id) {
    console.log(id);
    navigate(`/updateUser?id=${id}`); // Update the route to the user update page
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
          const response = await addUser(selectedFile); // Adjust the API call to add a user
          console.log(response.data);
          // Handle the response data as needed, e.g., dispatch an action
          navigate(`/users`);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      } else {
        alert("File size exceeds the allowed limit (1MB).");
      }
    } else {
      alert("No file selected.");
    }
  }

  function handleDelete() {
    if (userId) {
      axios
        .delete("http://localhost:8080/users/" + userId) // Adjust the URL to delete a user
        .then((response) => {
          dispatch(deleteUser(userId)); // Use the appropriate Redux action
          setDeleteDialogue(false);
        })
        .catch((error) => {
          console.error("Error while deleting the User:", error);
          alert("Error while deleting the item");
          setDeleteDialogue(false);
        });
    }
  }

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
          <h2> Users </h2>
        </div>
        <div className="right-aligned-div">
          <Link to="/addUser" className="menu-bars">
            <IoIosAddCircle />
          </Link>
        </div>
        <table className="table table-striped table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>User Profile</th>
              <th>User Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div
                    className="profile-container"
                    onClick={() => handleProfileClick(user.id)}
                  >
                    {/* Display user profile image */}
                  </div>
                </td>
                <td> {user.name}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="btn btn-secondary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => [
                      setUserId(user.id),
                      setDeleteDialogue(true),
                    ]}
                    className="btn btn-danger"
                  >
                    Delete
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
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Upload New User Profile
          </DialogTitle>
          <div className="user-profile-container">
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
          <DialogContent>Do you want to Delete User</DialogContent>
          <DialogActions>
            <Button onClick={handleDelete}>Delete</Button>
            <Button
              onClick={() => {
                setDeleteDialogue(false);
              }}
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default UpdateUser;
