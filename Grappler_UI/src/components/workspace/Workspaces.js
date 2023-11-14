import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkspaces,
  deleteWorkspaceSlice,
  fetchWorkspaces,
  updateWorkspaceSlice,
} from "../../slices/workspaceSlice"; // Update the import for your workspace
import { useNavigate } from "react-router-dom";
import {
  addWork,
  deleteWorkspaceApi,
  getAllWorkspaces,
  updateWorkspaceapi,
} from "../../api/WorkspaceApi"; // Update the import for your workspace API

import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function Workspaces() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [name, setName] = useState("");
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [workSpaceObject, setWorkSpaceObject] = useState("");

  const { workspaces } = useSelector((state) => state.workspaceList);
  const queryParams = new URLSearchParams(window.location.search);
  const companyId = queryParams.get("id");

  // get all project of a  workspace

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllWorkspaces(companyId);
        console.log("Response from getAllWorkspaces:", response.data);
        dispatch(fetchWorkspaces(response.data));
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  console.log("On component : " + workspaces);
  function handleUpdate(id) {
    console.log(id);
    navigate(`/updateWorkspace?id=${id}`);
  }
  function handleDelete(id) {
    console.log(id);
  }
  function Updatefunction() {
    setShowModal2(true);
  }

  function handleOpenWorkspace(workspaceId) {
    console.log("handleOpenWorkspace ", workspaceId);
    navigate(`/workspaces/${workspaceId}/${companyId}`);
  }
  async function addWorkspace(name) {
    try {
      console.log("adding workspace", name);
      const response = await addWork({ name }, companyId);
      console.log(response.data);
      dispatch(createWorkspaces(response.data));
      toast.success("Workspace created Successfully!");
      handleModalClose();
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        toast.error(error.response.data.message, { position: "top-center" });
      }
    }
  }

  async function updateWorkspace(updatedData, companyId) {
    try {
      console.log("Updating work", updatedData);
      console.log(companyId);
      console.log(workSpaceObject.id);
      const name = updatedData;
      const response = await updateWorkspaceapi(
        { name },
        companyId,
        workSpaceObject.id
      );
      console.log(response.data);
      dispatch(updateWorkspaceSlice(response.data));
      toast.success("Workspace updated Successfully!");
      handleModalClose2();
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        toast.error(error.response.data.message, { position: "top-center" });
      }
    }
  }

  async function handleDelete(workspaceId, companyId) {
    if (workspaceId) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this workspace?"
      );
      if (confirmed) {
        console.log("Deleting Workspace ID:", workspaceId);
        try {
          const response = await deleteWorkspaceApi(workspaceId, companyId);
          console.log(response);
          dispatch(deleteWorkspaceSlice(workspaceId));
          toast.success("Workspace deleted Successfully!", {
            position: "top-center",
          });
          navigate(`/workspace?id=${companyId}`);
        } catch (error) {
          if (error.response) {
            const status = error.response.status;
            toast.error(error.response.data.message, {
              position: "top-center",
            });
          }
        }
      }
    }
  }

  const handleModalClose = () => setShowModal(false);
  const addWorkspaceModal = (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="workspaceName">
            <Form.Label>Workspace Name :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workspace name"
              id="name"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            addWorkspace(document.getElementById("name").value);
          }}
        >
          Create Workspace
        </Button>
      </Modal.Footer>
    </Modal>
  );

  //updating the workspace
  const handleModalClose2 = () => setShowModal2(false);
  const updateWorkspaceModal = (
    <Modal show={showModal2} onHide={handleModalClose2}>
      <Modal.Header closeButton>
        <Modal.Title>Update Workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="workspaceName">
            <Form.Label>Workspace Name :</Form.Label>
            <Form.Control
              type="text"
              // placeholder={workSpaceObject.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose2}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={() => updateWorkspace(name, companyId)}
        >
          Update Workspace
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <div>
        <div className="container">
          <div className="badge bg-info text-wrap mt-2">
            {/* <ToastContainer /> */}
            <h2>Workspaces</h2>
          </div>
          <div className="right-aligned-div">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Add Workspace
            </button>
          </div>
          <table className="table table-striped table-hover mt-3">
            <thead className="table-dark">
              <tr>
                <th>Workspace Name</th>
                <th>Explore</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {workspaces ? (
                workspaces.map((workspace) => (
                  <tr key={workspace.id}>
                    <td>{workspace.name}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleOpenWorkspace(workspace.id)}
                      >
                        Open Workspace
                      </button>
                    </td>
                    <td>
                      <button
                        // onClick={() =>}
                        onClick={() => {
                          setWorkSpaceObject(workspace);
                          setName(workspace.name);
                          Updatefunction();
                        }}
                        className="btn btn-secondary"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(workspace.id, companyId)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <br />
        <center>
          {/* <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add Workspace
          </button> */}
        </center>
        <br />
        <br />
        <center>
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            Go Back{" "}
          </button>
        </center>
      </div>
      {addWorkspaceModal}
      {updateWorkspaceModal}
    </>
  );
}
export default Workspaces;
