package com.example.GraplerEnhancemet.controller;

import com.example.GraplerEnhancemet.custom_exception.NotFoundException;
import com.example.GraplerEnhancemet.entity.Task;
import com.example.GraplerEnhancemet.service.TaskService;
import com.example.GraplerEnhancemet.util.ApiResponse;
import com.example.GraplerEnhancemet.util.CreateTaskRequest;
import com.example.GraplerEnhancemet.util.ProjectAndFolderRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@EnableTransactionManagement
@Validated
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
@RequestMapping("/")
public class TaskController {
    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks")
    public ResponseEntity<ApiResponse<List<Task>>> getAllTasks() {
        try {
            List<Task> tasks = taskService.getAllTasks();
            if (!tasks.isEmpty()) {
                logger.info("All tasks successfully retrieved.");
                return ResponseEntity.ok(new ApiResponse<>(true, tasks, "All tasks retrieved successfully"));
            } else {
                logger.warn("No tasks found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null, "No tasks found."));
            }
        } catch (Exception e) {
            logger.error("Error occurred while retrieving all tasks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(false, null, e.getMessage()));
        }
    }

//    @GetMapping("/{taskId}")
//    public ResponseEntity<ApiResponse<Task>> getTask(@PathVariable Long taskId) {
//        try {
//            Task task = taskService.getTask(taskId);
//            if (task != null) {
//                logger.info("Task retrieved successfully with ID: {}", taskId);
//                return ResponseEntity.ok(new ApiResponse<>(true, task, "Task retrieved successfully"));
//            } else {
//                logger.warn("Task not found with Task ID: {}", taskId);
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null, "Task not found with ID: " + taskId));
//            }
//        } catch (Exception e) {
//            logger.error("Internal Server Error while retrieving task with ID: " + taskId, e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(false, null, e.getMessage()));
//        }
//    }

    @GetMapping("/folders/{folderId}/tasks")
    public ResponseEntity<ApiResponse<List<Task>>>getAllTasksOfFolder(@PathVariable Long folderId) {
        try {
            List<Task> tasks= taskService.getAllTasksByFolderId(folderId);
            if (tasks!= null && !tasks.isEmpty()) {
                logger.info("Task retrieved successfully.");
                return ResponseEntity.ok(new ApiResponse<>(true, tasks, "Task retrieved successfully"));
            } else {
                logger.warn("Task not found with Task ID: {}", folderId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null, "Task not found."));
            }
        } catch (NotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null, e.getMessage()));
        } catch (Exception e) {
            logger.error("Internal Server Error while retrieving task with ID: " + folderId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(false, null, e.getMessage()));
        }
    }

    @GetMapping("/projects/{projectId}/tasks")
    public ResponseEntity<ApiResponse<List<Task>>>getAllTasksOfProject(@PathVariable Long projectId) {
        try {
            List<Task> tasks= taskService.getAllTasksByProjectId(projectId);
            if (tasks!= null && !tasks.isEmpty()) {
                logger.info("Task retrieved successfully.");
                return ResponseEntity.ok(new ApiResponse<>(true, tasks, "Task retrieved successfully"));
            } else {
                logger.warn("Task not found with Task ID: {}", projectId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null, "Task not found."));
            }
        } catch (NotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null, e.getMessage()));
        } catch (Exception e) {
            logger.error("Internal Server Error while retrieving task with ID: " + projectId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(false, null, e.getMessage()));
        }
    }


    //    @PostMapping("/{projectId}")
//    public ResponseEntity<ApiResponse<Folder>> createFolder1(@PathVariable Long projectId, @RequestParam(value = "parentFolderId", defaultValue = "-1") Long parentFolderId, @Valid @RequestBody Folder folder) {
    @PostMapping("/tasks")
//    public ResponseEntity<ApiResponse<Task>> createTask(@RequestBody ProjectAndFolderRequest request, @Valid @RequestBody Task task) {
    public ResponseEntity<ApiResponse<Task>> createTask(@Valid @RequestBody CreateTaskRequest createTaskRequest) {
        try {
            Task createdTask = taskService.createTask(createTaskRequest);
            logger.info("Task created successfully.");
            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, createdTask, "Task created successfully"));
        } catch (NotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null, e.getMessage()));
        } catch (Exception e) {
            logger.error("Internal Server Error while creating task", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(false, null, e.getMessage()));
        }
    }

    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<ApiResponse<Task>> updateTask(@PathVariable Long taskId, @Valid @RequestBody Task task) {
        try {
            Task updatedTask = taskService.updateTask(taskId, task);
            if (updatedTask != null) {
                logger.info("Task updated successfully with ID: {}", taskId);
                return ResponseEntity.ok(new ApiResponse<>(true, updatedTask, "Task updated successfully with ID: " + taskId));
            } else {
                logger.warn("Task not found with Task ID: {}", taskId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null, "Task not found with ID: " + taskId));
            }
        } catch (NotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null, e.getMessage()));
        } catch (Exception e) {
            logger.error("Internal Server Error while updating task with ID: " + taskId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(false, null, e.getMessage()));
        }
    }

    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<ApiResponse<?>> deleteTask(@PathVariable Long taskId) {
        try {
            boolean deleted = taskService.deleteTask(taskId);
            if (deleted) {
                logger.info("Task deleted successfully with ID: {}", taskId);
                return ResponseEntity.noContent().build();
            } else {
                logger.warn("Task not found with Task ID: {}", taskId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null, "Task not found with ID: " + taskId));
            }
        } catch (Exception e) {
            logger.error("Internal Server Error while deleting task with ID: " + taskId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(false, null, e.getMessage()));
        }
    }
}
