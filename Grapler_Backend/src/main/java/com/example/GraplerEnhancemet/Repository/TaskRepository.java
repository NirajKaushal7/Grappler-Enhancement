package com.example.GraplerEnhancemet.Repository;

import com.example.GraplerEnhancemet.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findAllByFolderId(Long folderId);
//
@Query("SELECT t FROM Task t WHERE t.project.id = :projectId")
List<Task> findAllByProjectId(@Param("projectId") Long projectId);
//    void deleteByFolderId(Long folderId);
@Modifying
@Transactional
@Query("DELETE FROM Task t WHERE t.folder.id = :folderId")
void deleteTasksByFolderId(@Param("folderId") Long folderId);
}

