import axios from "axios";
const API_BASE_URL = "http://localhost:8080/users"; // Update the base URL for user-related operations
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log("Users data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addUserApi = async (userData) => {
  try {
    const response = await axios.post(API_BASE_URL, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addImage = async (userID, selectedFile) => {
    console.log(userID, selectedFile);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await axios.put(
          `http://localhost:8080/users/addImage/${userID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  };
export const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw error;
  }
};