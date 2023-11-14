package com.example.GraplerEnhancemet.util;

import com.example.GraplerEnhancemet.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTaskRequest {
    private ProjectAndFolderRequest projectAndFolderRequest;
    private Task task;
}

