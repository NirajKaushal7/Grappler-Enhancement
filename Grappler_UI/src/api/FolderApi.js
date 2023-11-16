import axios from "axios";
const baseUrl = 'http://localhost:8080/projects'; // Replace 'your_port' with your actual port number

// Function to get all folders by project ID
export async function getAllFolders(projectId) {
  try {
    const response = await axios.get(`${baseUrl}/${projectId}/folders`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to get a folder by folder ID
export async function getFolder(folderId) {
  try {
    const response = await axios.get(`${baseUrl}/folders/${folderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCompanyType(folderId) {
  try {
    const response = await axios.get(`${baseUrl}/${folderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to create a folder by project ID
export async function createFolder(projectId, folderData) {
  try {
    console.log("folderApi ",projectId,folderData);
    const response = await axios.post(`${baseUrl}/${projectId}/folders`, folderData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to create a subfolder by parent folder ID
export async function createSubFolder(parentFolderId, folderData) {
  try {
    const response = await axios.post(`${baseUrl}/folders/${parentFolderId}/sub-folders`, folderData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to update a folder by folder ID
export async function updateFolder(folderId, folderData) {
  try {
    const response = await axios.put(`${baseUrl}/folders/${folderId}`, folderData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to delete a folder by folder ID
export async function deleteFolder(folderId) {
  try {
    const response = await axios.delete(`${baseUrl}/folders/${folderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// module.exports = {
//   getAllFolders,
//   getFolder,
//   createFolder,
//   createSubFolder,
//   updateFolder,
//   deleteFolder,
// };
