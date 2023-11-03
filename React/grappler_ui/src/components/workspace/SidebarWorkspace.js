import React, { useState } from "react";
import "./../../css/SidebarWorkspace.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tree from "../project/Tree";
import { addProjectApi, getAllProjectOfWorkspace } from "../../api/projectApi";
import { createproject, fetchProjects } from "../../slices/projectSlice";
import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SidebarWorkspace = () => {
  // const { projects } = useSelector((state) => state.projectList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  // const queryParams = new URLSearchParams(window.location.search);
  // const workspaceId = queryParams.get("id");
  const { workspaceId } = useParams();
  console.log("Id in sidebarWOrkspace ", workspaceId);
  useEffect(() => {
    sessionStorage.setItem("myId", workspaceId);
  }, [workspaceId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProjectOfWorkspace(workspaceId);
        console.log("Response from projects :", response.data);
        dispatch(fetchProjects(response.data));
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  const handleModalClose = () => setShowModal(false);

  async function addProject() {
    try {
      const projectName = document.getElementById("name").value;
      const subType = document.getElementById("subtype").value;
      console.log("projectName", projectName);
      console.log("subType", subType);
      console.log("adding project");
      const formData = {
        name: projectName,
        subType: subType,
      };
      const response = await addProjectApi(formData, workspaceId);
      console.log("respone of create project ", response.data);
      dispatch(createproject(response.data));
      toast.success("Project created Successfully!", {
        position: "top-center",
      });
      handleModalClose();
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        toast.error(error.response.data.message, { position: "top-center" });
      }
    }
  }
  const addProjectModal = (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="workspaceName">
            <Form.Label>Project Name :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              id="name"
              required
            />
          </Form.Group>

          <Form.Group controlId="workspaceName">
            <Form.Label>SubType :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subtype of project"
              id="subtype"
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
            addProject();
          }}
        >
          Create Project
        </Button>
      </Modal.Footer>
    </Modal>
  );
  return (
    <>
      <ToastContainer />
      <div className="sidebar">
        <div className="sidebar-center">
          <Link to={`/workspaces/${workspaceId}/dashboard`} className="button">
            Dashboard
          </Link>

          <div className="tree-container">
            <Tree workspaceId={workspaceId} />
          </div>

          <div className="button" onClick={() => setShowModal(true)}>
            Create Project
          </div>
          <Link
            // to="/reports"
            className="button"
          >
            Reports
          </Link>
          <Link
            // to="/more"
            className="button"
          >
            More
          </Link>
        </div>
        {addProjectModal}
      </div>
    </>
  );
};

export default SidebarWorkspace;
