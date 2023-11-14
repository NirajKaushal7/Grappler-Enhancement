package com.example.GraplerEnhancemet.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectAndFolderRequest {
    private Long folderId;
    private Long projectId;
}

