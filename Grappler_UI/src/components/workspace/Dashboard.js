import React, { useEffect, useState } from "react";
import SidebarWorkspace from "./SidebarWorkspace";
import "../../css/task.css";
import { getAllTasksOfFolder, getAllTasksOfProject } from "../../api/TaskApi";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import queryString from 'query-string';
import taskSlice, { fetchTasks } from "../../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [data, setData] = useState({}); // Initialize data state

  useEffect(() => {
    const serializedData = queryString.parse(location.search);

    if (serializedData.data) {
      try {
        const folderData = JSON.parse(serializedData.data);
        setData(folderData); // Update data state
  
        const fetchData = async () => {
          try {
            let response =
              folderData.type === "folder"
                ? await getAllTasksOfFolder(folderData.id)
                : await getAllTasksOfProject(folderData.id);
            dispatch(fetchTasks(response.data));
            // console.log("Response from getAllWorkspaces:", response.data);
            toast.success("All tasks retrieved Successfully.");
          } catch (error) {
            toast.error(error.response?.data?.message);
          }
        };
  
        fetchData();
      } catch (error) {
        console.error("Error parsing JSON:", error);
        toast.error("Error parsing JSON");
      }
    }
  
    return () => {
      dispatch(fetchTasks([])); // Cleanup function when the component unmounts
    };
  }, [location]);
 
  const { tasks } = useSelector((state) => state.taskList);

  return (
    <>
      <div style={{ width: "50%"}}>
      {/* <div> */}
        <h1>Dash Board</h1>
        <table className="table table-striped table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th style={{ wordWrap: "break-word", maxWidth: "100px",textAlign:"center" }}>Task name</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td style={{ wordWrap: "break-word", maxWidth: "100px",textAlign:"center" }}>{task.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <SidebarWorkspace /> */}
    </>
  );
}

export default Dashboard;
