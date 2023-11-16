import React, { useState } from "react";
import "./../../css/tree.css"; // Import your custom CSS file

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects,updateProject,deleteProject } from "../../slices/projectSlice";
import { createTask} from "../../slices/taskSlice";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { deleteProjectApi, getAllProjectOfWorkspace, updateProjectApi } from "../../api/projectApi";
import { 
  createFolder,
  createSubFolder,
  updateFolder,
  deleteFolder } from "../../api/FolderApi";
import { toast } from 'react-toastify';
import { createTaskUnderFolder, createTaskUnderProject, getAllTasksOfFolder, getAllTasksOfProject } from "../../api/TaskApi";
import queryString from 'query-string';

function TreeNode({ folder, subFolders, workspaceId,type, onTaskAdded }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const hasSubfolders = subFolders && subFolders.length > 0;
  const [anchorEl, setAnchorEl] = useState(null);

const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
const [folderNameInput, setFolderNameInput] = useState("");
const [folderTypeInput, setFolderTypeInput] = useState("");
const [folderNameError, setFolderNameError] = useState("");
const [taskNameError, setTaskNameError] = useState("");

const [projectName, setProjectName] = useState("");
const [projectType, setProjectType] = useState("Normal");
const [projectSubType, setProjectSubType] = useState("Normal");
const [validationError,setValidationError] = useState("");
const [hasTasks, setHasTasks] = useState(false);

const [taskName, setTaskName] = useState("");

  const toggleOpen = () => {
    if (hasSubfolders) {
      setIsOpen(!isOpen);
    }
  };

  const handleLeafFolderClick = () => {
    navigate(`/workspaces/${workspaceId}/tasks`);
  };

  const serializeData = () => {
    const folderData = {
      id: folder.id,
      type: type
    };
    return encodeURIComponent(JSON.stringify(folderData));
  };
  
  const handleSpanClick = () => {
    const serializedData = serializeData();
    navigate(`/workspaces/${workspaceId}/dashboard?data=${serializedData}`);
  };
  
  const checkFolderTasks = async () => {
    try {
      // console.log(folder.id);
      let response =
        type === "folder"
          ? await getAllTasksOfFolder(folder.id)
          : await getAllTasksOfProject(folder.id);
      // console.log("Response from getAllWorkspaces:", response.data);
      setHasTasks(Boolean(response.data));
      // console.log(hasTasks);
    } catch (error) {
      // console.error("Error:", error);
      setHasTasks(false);
      // console.log(hasTasks)
    }
  }
  useEffect(() => {
    checkFolderTasks();
  }, [folder]);

  // const handleFolderClick = () => {
  //   const serializedData = serializeData();
  //   navigate(`/workspaces/${workspaceId}/dashboard?data=${serializedData}`);
  // };
  
  // const handleProjectClick = () => {
  //   console.log("project click");
  //   const serializedData = serializeData();
  //   navigate(`/workspaces/${workspaceId}/dashboard?data=${serializedData}`);
  // };

  const handleNonLeafFolderClick = () => {
    // Handle non-leaf folder click here
  };

  const handle3DotsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handle3DotsClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  function handleCreateFolder() { 
    setAnchorEl(null);
    console.log("handleCreateFolder");
    setFolderNameInput("");
    setFolderTypeInput("NONLEAF");
    setFolderNameError("");
    setIsCreateModalOpen(true);
  }
  
  
function  handleAddTask()
{
  setAnchorEl(null);
   setIsAddTaskModalOpen(true);
   setTaskName("");    
   setTaskNameError(""); 
}

  
async function  addTask()
{
  if (taskName === "")  {
    // console.log(taskNameError);
  setTaskNameError("Please Fill details.");
  // console.log(taskNameError);
    return;
  }
  try{
    if(type == "folder"){
      const response = await createTaskUnderFolder(folder.id,taskName);
      // console.log(response);
      dispatch(createTask(response.data));
      toast.success(response.message);
    }
    else{
      console.log("ready to add task in project")
      const response = await createTaskUnderProject(folder.id,taskName);
      // console.log(response);
      dispatch(createTask(response.data));
      toast.success(response.message);  
    }
    onTaskAdded();
  }
  catch(error){
    // toast.error(error.response.data.message);
    toast.error(error.response?.data?.message);
    // console.log(error);
  }
  Refresh();
  setIsAddTaskModalOpen(false);
  setTaskNameError(""); 
}


  function handleEdit() {
    setAnchorEl(null);
    console.log(folder);
    if(type === "folder"){
      setFolderNameError("");
      setFolderNameInput(folder.name);
      setFolderTypeInput(folder.folderType);
      setIsEditModalOpen(true);
      setFolderNameError("");
    }
    else{
      // console.log(folder);
      const project = folder;
      setValidationError("");
      setProjectName(project.name);
      setProjectType(project.type);
      setProjectSubType(project.subType);
      setIsEditProjectModalOpen(true);
      setValidationError("");
    }
  }

  async function handleDelete() {
    setAnchorEl(null);
    try{
      let response ="";
   if(type === "folder"){
    response = await deleteFolder(folder.id);
    toast.success("Folder Deleted Successfully");
    Refresh();  
   } else{
     const project = folder;
     console.log("handleDelete else Part",project.id);
    response = await deleteProjectApi(workspaceId,project.id);
    dispatch(deleteProject(project.id));
    toast.success("Project Deleted Successfully");
   }
  }
  catch(error){
    const message = error.response?.data?.message;
    // console.log(error.response);
    toast.error(message);
  }
  }


  async function createFolderAndCloseModal() {
    console.log("createFolderAndCloseModal");
    const newFolder ={
      name:folderNameInput,
      folderType:folderTypeInput,
    }  
    if (newFolder.name.trim() === ""||newFolder.folderType.trim() === "") {
      setFolderNameError("Please fill Details properly.");
      return; // Prevent folder creation
    } else {
      setFolderNameError(""); // Clear any previous error
    }
      // console.log("create Folder name "+folderNameInput+ "type "+folderTypeInput);
    try{
      let response = "";
      if (type === "project"){
        console.log("Create folder");
        response = await createFolder(folder.id,newFolder);
      }
      else{
        console.log("Create sub-folder");
        response = await createSubFolder(folder.id,newFolder);  
      } 
      toast.success("Folder created Successfully");  
      console.log(response);
      console.log(response.message);
      console.log(response.data.message);
    } 
    catch(error){
      const message = error.response?.data?.message;
      // console.log(error.response);
      toast.error(message);
    } 
    Refresh();
    setFolderNameError("")
    setIsCreateModalOpen(false);
  }
  
  async function editFolderAndCloseModal() {
    const newFolder ={
      id:folder.id,
      name:folderNameInput,
      folderType:folderTypeInput,
    }  
    if (newFolder.name.trim() === ""||newFolder.folderType.trim() === "")  {
      setFolderNameError("Please fill Details properly.");
      return; // Prevent folder creation
    } else {
      setFolderNameError(""); // Clear any previous error
    }
      // console.log("create Folder name "+folderNameInput+ "type "+folderTypeInput);
      try{
      const response = await updateFolder(folder.id,newFolder); 
      toast.success("Folder updated Successfully");  
      // console.log(response);
      // console.log(response.message);
      // console.log(response.data.message);
    } 
    catch(error){
      const message = error.response?.data?.message;
      console.log(error.response);
      toast.error(message);
    }     
    Refresh();
    setValidationError("");
    setIsEditModalOpen(false);
  }
  
  async function editProjectAndCloseModal() {
    const project = folder;
    const newProject ={
      id:project.id,
      name:projectName,
      type:projectType,
      subType:projectSubType,
    }  
    if (newProject.name.trim() === ""||newProject.type.trim() === ""||newProject.subType.trim() === "") {
      setValidationError("Please Fill Details.");
      return; // Prevent folder creation
    } else {
      setValidationError(""); // Clear any previous error
    }
      // console.log("create Folder name "+folderNameInput+ "type "+folderTypeInput);
      try{
      const response = await updateProjectApi(workspaceId,project.id,newProject); 
      dispatch(updateProject(response.data));
      toast.success("Project updated Successfully");  
      // console.log(response);
      // console.log(response.message);
      // console.log(response.data.message);
    } 
    catch(error){
      const message = error.response?.data?.message;
      // console.log(error.response);
      toast.error(message);
    }     
    Refresh();
    setIsEditProjectModalOpen(false);
    setProjectName("");
    setProjectType("Normal");
    setProjectSubType("Normal");
  }
  

 async function Refresh()
 {
  try {
    const response = await getAllProjectOfWorkspace(workspaceId);
    dispatch(fetchProjects(response.data));
  } catch (error) {
    console.error("Error while fetching data:", error);
  }
 }


 
  return (
    <div className="div">
 <div className="folder-container">
  <span
    className={`folder ${
      hasSubfolders ? (isOpen ? "open-folder" : "closed-folder") : "leaf-folder"
    }`}
    onClick={toggleOpen}
  ></span>
  
  <div className="name-container">
    <span className="non_leaf_node" onClick={handleSpanClick}>
      {folder.name}
    </span>
    <MoreVertIcon
      className="three-dots-icon"
      onClick={handle3DotsClick}
    />
  </div>

  <Popover
    open={open}
    anchorEl={anchorEl}
    onClose={handle3DotsClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
  >
    <div className="popup-content">
      {/* {console.log("folder.tasks",folder.name , " ====>> ", folder.tasks, hasTasks)} */}
      {(folder.tasks && folder.tasks?.length === 0 && !hasTasks) ||
      (!folder.tasks && !hasTasks) ? (
        <Button onClick={handleCreateFolder}>Create Folder</Button>
      ) : (
        <></>
      )}
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
      <Button onClick={handleAddTask}>Add Task</Button>
    </div>
  </Popover>
</div>

       <Modal show={isCreateModalOpen} onHide={() => {setIsCreateModalOpen(false);setFolderTypeInput("NONLEAF")}}>
        <Modal.Header closeButton>
          <Modal.Title>Create Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="folderNameInput">
            <Form.Label>Folder Name</Form.Label>
            <Form.Control
              type="text"
              value={folderNameInput}
              onChange={(e) => setFolderNameInput(e.target.value)}
              required
            />
            <small className="text-danger">{folderNameError}</small>
          </Form.Group>
          <Form.Group controlId="folderTypeInput">
          <Form.Label>Folder Type</Form.Label>
          <Form.Control
            as="select"
            value={folderTypeInput}
            onChange={(e) => setFolderTypeInput(e.target.value)}
            defaultValue="NONLEAF"
            required
          >
            {/* default set on State */}
            <option value="NONLEAF">NONLEAF</option>
            <option value="LEAF">LEAF</option>
          </Form.Control>
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createFolderAndCloseModal}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isEditModalOpen} onHide={() => setIsEditModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="folderNameInput">
            <Form.Label>Folder Name</Form.Label>
            <Form.Control
              type="text"
              value={folderNameInput}
              onChange={(e) => setFolderNameInput(e.target.value)}
              required
            />
          <small className="text-danger">{folderNameError}</small>
          </Form.Group>
          <Form.Group controlId="folderTypeInput">
            <Form.Label>Folder Type</Form.Label>
            <Form.Control
            as="select"
            value={folderTypeInput}
            onChange={(e) => setFolderTypeInput(e.target.value)}
            // defaultValue="NONLEAF"
            required
          >
            {/* default set on State */}
            <option value="LEAF">LEAF</option>
            <option value="NONLEAF">NONLEAF</option>
          </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setIsEditModalOpen(false);setFolderTypeInput("NONLEAF")}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={editFolderAndCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={isEditProjectModalOpen} onHide={() => setIsEditProjectModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Folder</Modal.Title>
            <small className="text-danger">{validationError}</small>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="projectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="projectType">
          <Form.Label>Project Type</Form.Label>
          <Form.Control
            as="select"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            required
          >
          <option value="Normal">Normal</option>
          <option value="Adhoc">Adhoc</option>
          <option value="Retainer">Retainer</option>
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="projectSubType">
          <Form.Label>Project Sub Type</Form.Label>
          <Form.Control
            as="select"
            value={projectSubType}
            onChange={(e) => setProjectSubType(e.target.value)}
            required
          >
          <option value="Normal">Normal</option>
          <option value="Adhoc">Adhoc</option>
          <option value="Retainer">Retainer</option>
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>

          {/* <Form.Group controlId="projectType">
            <Form.Label>Project Type</Form.Label>
            <Form.Control
              type="text"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="projectSubType">
            <Form.Label>Project Sub Type</Form.Label>
            <Form.Control
              type="text"
              value={projectSubType}
              onChange={(e) => setProjectSubType(e.target.value)}
              required
            />
          </Form.Group> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsEditProjectModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={editProjectAndCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isAddTaskModalOpen} onHide={() => setIsAddTaskModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="folderNameInput">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
            <small className="text-danger">{taskNameError}</small>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setIsAddTaskModalOpen(false);setTaskNameError("")}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addTask}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>    
      {isOpen && hasSubfolders && (
        <ul>
          {subFolders.map((folder, index) => (
            <li key={index}>
              <TreeNode
                folder={folder}
                subFolders={folder.subFolders}
                workspaceId={workspaceId}
                type="folder"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Tree({ workspaceId }) {
  const dispatch = useDispatch();
  const [tasksUpdated, setTasksUpdated] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProjectOfWorkspace(workspaceId);
        dispatch(fetchProjects(response.data));
      } catch (error) {
        // console.error("Error while fetching data:", error);
        // toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, [workspaceId,tasksUpdated]);

  const { projects } = useSelector((state) => state.projectList);
  const data = projects;
  return (
    <ul>
      
      {data.map((project, index) => 
      (
        <li key={index}>
          {/* {console.log("data is here", tasksUpdated)} */}
          <TreeNode
            folder={project}
            subFolders={project.subFolders}
            workspaceId={workspaceId}
            type="project"
            onTaskAdded={() => setTasksUpdated(!tasksUpdated)}
          />
        </li>
      ))}
    </ul>
  );
}

export default Tree;
// import React, { useEffect } from "react";
// import "./../../css/tree.css"; // Import your custom CSS file

// import { useState } from "react";
// import Task from "../task/Task";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllProjectOfWorkspace } from "../../api/projectApi";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProjects } from "../../slices/projectSlice";
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import AddIcon from "@mui/icons-material/Add";

// function TreeNode({ name, subFolders, workspaceId }) {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = React.useState(false);
//   const hasSubfolders = subFolders && subFolders.length > 0;
//   const [openSubFolder, setOpenSubFolder] = useState(false);

//   const toggleOpen = () => {
//     if (hasSubfolders) {
//       setIsOpen(!isOpen);
//     } else {
//       console.log("heeel ", name);
//       setOpenSubFolder(true);
//       // <Task />;
//     }
//   };
//   // const openAllTask = () => {
//   //   console.log("button Clicked ");
//   //   // Your code here.
//   // };
//   const handleLeafFolderClick = () => {
//     console.log(name);
//     // workspaceId = sessionStorage.getItem("workspaceId");
//     navigate(`/workspaces/${workspaceId}/tasks`);
//   };
//   const handleNonLeafFolderClick = () => {
//     console.log(" Non LEaf Folder");
//   };

//   function handleAddClick() {
//     console.log("Hii ");
//   }
//   return (
//     <div className="div">
//       <span
//         className={`folder ${
//           hasSubfolders
//             ? isOpen
//               ? "open-folder"
//               : "closed-folder"
//             : "leaf-folder"
//         }`}
//         onClick={toggleOpen}
//       ></span>
//       {/* {hasSubfolders && (
//         <span className="non_leaf_node" onClick={handleNonLeafFolderClick}>
//           {name}
//         </span>
//       )} */}
//       {hasSubfolders && (
//         <span className="non_leaf_node" onClick={handleNonLeafFolderClick}>
//           <i className="fas fa-plus"></i> {name}
//         </span>
//       )}
//       {!hasSubfolders && (
//         <span className="leaf_node" onClick={handleLeafFolderClick}>
//           {name}
//         </span>
//       )}
//       {/* <div className="clickable-div" onClick={openAllTask}>
//         {name}
//       </div> */}
//       {isOpen && hasSubfolders && (
//         <ul>
//           {subFolders.map((folder, index) => (
//             <li key={index} style={{display:"flex"}} >
//               <TreeNode
//                 name={folder.name}
//                 subFolders={folder.subFolders}
//                 workspaceId={workspaceId}
//               />
//               <button>+</button>
//             </li>
//           ))}
//         </ul>
//       )}
//       {/* {openSubFolder && <Task />} */}
//     </div>
//   );
// }

// function Tree({ workspaceId }) {
//   const dispatch = useDispatch();
//   console.log(" workspaceId inside tree   ", workspaceId);

//   // When retrieving the workspaceId
//   // workspaceId = sessionStorage.getItem("workspaceId");
//   console.log(" ....workspaceId   ", workspaceId);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getAllProjectOfWorkspace(workspaceId);
//         console.log("Response from projects :", response.data);
//         dispatch(fetchProjects(response.data));
//       } catch (error) {
//         console.error("Error while fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [workspaceId]);

//   const { projects } = useSelector((state) => state.projectList);
//   const data = projects;

//   console.log(data);
//   return (
//     <ul>
//       {data.map((project, index) => (
//         <li key={index}>
//           <TreeNode
//             name={project.name}
//             subFolders={project.subFolders}
//             workspaceId={workspaceId}
//           />
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default Tree;
