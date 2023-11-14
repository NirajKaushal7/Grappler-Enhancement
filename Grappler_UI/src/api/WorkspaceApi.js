import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/companies/';
export const getAllWorkspaces = async (companyId) => {
    try {
        console.log("At APi");
      const response = await axios.get(`${API_BASE_URL}${companyId}/workspaces`);
      console.log('asaaaaaa',response.data) ;
      return response.data ;
    } catch (error) {
      console.log(error) ;
    }
  };


  
export const addWork=async(name,companyId)=>{
  try{
      console.log("adding workspace in api..",name);
      const response=await axios.post(`${API_BASE_URL}${companyId}/workspaces`,name);
      console.log(response);
      return response.data;
  }catch(error){
      throw error;
  }
};

export const updateWorkspaceapi =async (updatedData,companyId,workspaceId)=>{
try{
  console.log("api....",updatedData);
  console.log("workspace id in api",workspaceId);
  const response =await axios.put(`${API_BASE_URL}${companyId}/workspaces/${workspaceId}`,updatedData);
  console.log(response);
  return response.data;
}catch(error){
  throw error;
}
};

export const deleteWorkspaceApi = async(workspaceId,companyId)=>{
try{
  console.log("in the delete api ID:",workspaceId);
  console.log("in the delete api ID:",companyId);
  const response =await axios.delete(`${API_BASE_URL}${companyId}/workspaces/${workspaceId}`);
  console.log(response);
  return response;
}catch(error){
  throw error;
}
};