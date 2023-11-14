package com.example.GraplerEnhancemet.service;

import com.example.GraplerEnhancemet.Repository.FolderRepository;
import com.example.GraplerEnhancemet.Repository.TaskRepository;
import com.example.GraplerEnhancemet.custom_exception.NotFoundException;
import com.example.GraplerEnhancemet.entity.Folder;
import com.example.GraplerEnhancemet.entity.Project;
import com.example.GraplerEnhancemet.entity.Task;
import com.example.GraplerEnhancemet.util.CreateTaskRequest;
import com.example.GraplerEnhancemet.util.ProjectAndFolderRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class TaskService {
    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private ProjectService projectService;
    @Autowired
//    private FolderService folderService;
    private FolderRepository folderRepository;

    public List<Task> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        logger.info("Retrieved all tasks successfully.");
        return tasks;
    }


    public List<Task> getAllTasksByProjectId(Long projectId) {
        Project project = projectService.getProject(projectId);
        if(project == null)
        {
            throw new NotFoundException("Project Not Found");
        }
//        List<Task> tasks = taskRepository.findAllByProjectId(projectId);
        List<Task> tasks = getAllTasksInProjectAndSubfolders(project);
        logger.info("Retrieved all tasks of all Sub-folders successfully."+project.getName());
//        List<Task> projectTasks = project.getTasks();// exception comes
        List<Task> projectTasks = taskRepository.findAllByProjectId(projectId);
        logger.info("Retrieved all Project tasks successfully."+projectTasks);
        projectTasks.addAll(tasks);
        return projectTasks;
//        return tasks;
    }
    public List<Task> getAllTasksByFolderId(Long folderId) {
//        Folder folder = folderService.getFolder(folderId);
        Folder folder = folderRepository.findById(folderId).orElse(null);
        if(folder== null)
        {
            throw new NotFoundException("Folder Not Found");
        }
//        List<Task> tasks = taskRepository.findAllByFolderId(folderId);
        List<Task> tasks = getAllTasksInFolderAndSubfolders(folder);
        logger.info("Retrieved all tasks successfully.");
        return tasks;
    }
    public List<Task> getAllTasksInProjectAndSubfolders(Project project) {
    List<Folder> folders = project.getSubFolders();
    List<Task> allTasks = new ArrayList<>();
    if(folders != null && !folders.isEmpty()){
        folders.forEach(folder -> {
            allTasks.addAll(getAllTasksInFolderAndSubfolders(folder));
        });
    }
    return allTasks;
    }
        public List<Task> getAllTasksInFolderAndSubfolders(Folder folder) {
        logger.debug("Processing folder with ID: {} and line 123", folder.getId());
        Set<Long> processedFolders = new HashSet<>();
        return getAllTasksInFolderAndSubfoldersRecursive(folder, processedFolders);
    }
    private List<Task> getAllTasksInFolderAndSubfoldersRecursive(Folder folder, Set<Long> processedFolders) {
        logger.debug("Processing in recursive method with ID: {}", folder.getId());
        List<Task> allTasks = new ArrayList<>();

        // Check if the folder has already been processed
        if (!processedFolders.add(folder.getId())) {
            // This folder has already been processed, return an empty list or handle as needed.
            logger.debug("Processing folder with ID: {}", folder.getId());
            return Collections.emptyList();
        }

        // Retrieve tasks for the current folder using the repository method
        List<Task> folderTasks = taskRepository.findAllByFolderId(folder.getId());
        if (folderTasks != null) {
            logger.debug("Adding tasks of folder with ID: {}", folder.getId());
            allTasks.addAll(folderTasks);
        }

        // Recursively add tasks from subfolders
        List<Folder> subfolders = folder.getSubFolders();
        logger.debug("Folder with ID: {} having subfolders", folder.getId());
        if (subfolders != null) {
            for (Folder subfolder : subfolders) {
                // Use the result of the recursive call directly without creating a separate list
                allTasks.addAll(getAllTasksInFolderAndSubfoldersRecursive(subfolder, processedFolders));
            }
        }

        return allTasks;
    }


    public Task getTask(Long taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        if (task.isPresent()) {
            logger.info("Retrieved task successfully.");
            return task.get();
        } else {
            logger.warn("Task not found with Task ID: {}", taskId);
            throw new NotFoundException("Task not found with ID: " + taskId);
        }
    }

    public Task createTask(CreateTaskRequest createTaskRequest) {
        ProjectAndFolderRequest request = createTaskRequest.getProjectAndFolderRequest();
        Task task = createTaskRequest.getTask();
        Long projectId = request.getProjectId();
        Long folderId = request.getFolderId();
        if(projectId != null){
            logger.info("Project Id : "+projectId);
            Project project = projectService.getProject(projectId);
            if(project==null){
                logger.warn("Project Not found with Id : "+projectId);
                throw new NotFoundException("Project Not found.");
            }
            task.setProject(project);
        }
        if(folderId != null) {
            logger.info("Folder Id : "+request.getFolderId());
//            Folder folder = folderService.getFolder(folderId);
            Folder folder = folderRepository.findById(folderId).orElse(null);
            if(folder==null){
                logger.warn("Folder Not found with Id : "+folderId);
                throw new NotFoundException("Folder Not found.");
            }
            task.setFolder(folder);
        }
        else if(projectId == null && folderId == null){
            throw new NotFoundException("Parent Id not found: please pass the project/folder id.");
        }

        Task createdTask = taskRepository.save(task);
        logger.info("Task created successfully. with ID: {}", createdTask.getId());
        return createdTask;
       }

    public Task updateTask(Long taskId, Task updatedTask) {
        Optional<Task> task = taskRepository.findById(taskId);
        if (task.isPresent()) {
            Task existingTask = task.get();

            // Update task properties as needed

            Task savedTask = taskRepository.save(existingTask);
            logger.info("Task updated successfully with Task ID: {}", taskId);
            return savedTask;
        } else {
            logger.warn("Task not found with Task ID: {}", taskId);
            throw new NotFoundException("Task not found with ID: " + taskId);
        }
    }

    public boolean deleteTask(Long taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        if (task.isPresent()) {
            taskRepository.deleteById(taskId);
            logger.info("Task deleted successfully with Task ID: {}", taskId);
            return true;
        } else {
            logger.warn("Task not found with Task ID: {}", taskId);
            return false;
        }
    }
}