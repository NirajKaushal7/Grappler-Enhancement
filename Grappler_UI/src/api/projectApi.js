import axios from "axios";
const API_BASE_URL = "http://localhost:8080/workspaces/";
export const getAllProjectOfWorkspace = async (workspaceId) => {
  try {
    // console.log("At Project get api ", workspaceId);
    const response = await axios.get(`${API_BASE_URL}${workspaceId}/projects`);
    // console.log("asaaaaaa", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProject = async (workspaceId) => {
  try {
    console.log("At Project get api ", workspaceId);
    const response = await axios.get(
      `${API_BASE_URL}${workspaceId}/projects/${workspaceId}`
    );
    console.log("asaaaaaa", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

  //http://localhost:8082/workspaces/2/projects
export const addProjectApi=async(ProjectData ,workspaceIdId)=>{
  try{
      console.log("adding workspace in api..",ProjectData);
      const response=await axios.post(`${API_BASE_URL}${workspaceIdId}/projects`,ProjectData);
      console.log(response);
      return response.data;
  }catch(error){
      throw error;
  }
};

export const updateProjectApi=async(workspaceId, projectId,newProject)=>{
  try{
      console.log("adding workspace in api..",newProject);
      const response=await axios.put(`${API_BASE_URL}${workspaceId}/projects/${projectId}`,newProject);
      console.log(response);
      return response.data;
  }catch(error){
      throw error;
  }
};

export const deleteProjectApi=async(workspaceId, projectId,)=>{
  try{
      const response = await axios.delete(`${API_BASE_URL}${workspaceId}/projects/${projectId}`);
      console.log(response);
      return response.data;
  }catch(error){
      throw error;
  }
};
