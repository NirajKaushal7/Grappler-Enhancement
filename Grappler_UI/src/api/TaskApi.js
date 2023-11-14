import axios from "axios";
const baseUrl = 'http://localhost:8080/tasks';
const baseUrl2 = 'http://localhost:8080/';

export async function getAllTasksOfProject(projectId) {
  try {
    const response = await axios.get(`${baseUrl2}projects/${projectId}/tasks`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllTasksOfFolder(folderId) {
    try {
      const response = await axios.get(`${baseUrl2}folders/${folderId}/tasks`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

export async function getTask(taskId) {
  try {
    const response = await axios.get(`${baseUrl}${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createTaskUnderProject(projectId, TaskName) {
  try {
    const data = {
        projectAndFolderRequest: {
          projectId: projectId
        },
        task: {
          name: TaskName,
        }
      };
    const response = await axios.post(`${baseUrl}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function createTaskUnderFolder(folderId, TaskName) {
    try {
      const data = {
          projectAndFolderRequest: {
            folderId: folderId
          },
          task: {
            name: TaskName,
          }
        };
      const response = await axios.post(`${baseUrl}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }