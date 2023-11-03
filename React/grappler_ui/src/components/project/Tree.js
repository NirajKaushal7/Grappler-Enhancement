import React, { useEffect } from "react";
import "./../../css/tree.css"; // Import your custom CSS file

import { useState } from "react";
import Task from "../task/Task";
import { Link, useNavigate } from "react-router-dom";
import { getAllProjectOfWorkspace } from "../../api/projectApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../slices/projectSlice";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";

function TreeNode({ name, subFolders, workspaceId }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const hasSubfolders = subFolders && subFolders.length > 0;
  const [openSubFolder, setOpenSubFolder] = useState(false);

  const toggleOpen = () => {
    if (hasSubfolders) {
      setIsOpen(!isOpen);
    } else {
      console.log("heeel ", name);
      setOpenSubFolder(true);
      // <Task />;
    }
  };
  // const openAllTask = () => {
  //   console.log("button Clicked ");
  //   // Your code here.
  // };
  const handleLeafFolderClick = () => {
    console.log(name);
    // workspaceId = sessionStorage.getItem("workspaceId");
    navigate(`/workspaces/${workspaceId}/tasks`);
  };
  const handleNonLeafFolderClick = () => {
    console.log(" Non LEaf Folder");
  };

  function handleAddClick() {
    console.log("Hii ");
  }
  return (
    <div className="div">
      <span
        className={`folder ${
          hasSubfolders
            ? isOpen
              ? "open-folder"
              : "closed-folder"
            : "leaf-folder"
        }`}
        onClick={toggleOpen}
      ></span>
      {/* {hasSubfolders && (
        <span className="non_leaf_node" onClick={handleNonLeafFolderClick}>
          {name}
        </span>
      )} */}
      {hasSubfolders && (
        <span className="non_leaf_node" onClick={handleNonLeafFolderClick}>
          <i className="fas fa-plus"></i> {name}
        </span>
      )}
      {!hasSubfolders && (
        <span className="leaf_node" onClick={handleLeafFolderClick}>
          {name}
        </span>
      )}
      {/* <div className="clickable-div" onClick={openAllTask}>
        {name}
      </div> */}
      {isOpen && hasSubfolders && (
        <ul>
          {subFolders.map((folder, index) => (
            <li key={index}>
              <TreeNode
                name={folder.name}
                subFolders={folder.subFolders}
                workspaceId={workspaceId}
              />
            </li>
          ))}
        </ul>
      )}
      {/* {openSubFolder && <Task />} */}
    </div>
  );
}

function Tree({ workspaceId }) {
  const dispatch = useDispatch();
  console.log(" workspaceId inside tree   ", workspaceId);

  // When retrieving the workspaceId
  // workspaceId = sessionStorage.getItem("workspaceId");
  console.log(" ....workspaceId   ", workspaceId);
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
  }, [workspaceId]);

  const { projects } = useSelector((state) => state.projectList);
  const data = projects;

  console.log(data);
  return (
    <ul>
      {data.map((project, index) => (
        <li key={index}>
          <TreeNode
            name={project.name}
            subFolders={project.subFolders}
            workspaceId={workspaceId}
          />
        </li>
      ))}
    </ul>
  );
}

export default Tree;
