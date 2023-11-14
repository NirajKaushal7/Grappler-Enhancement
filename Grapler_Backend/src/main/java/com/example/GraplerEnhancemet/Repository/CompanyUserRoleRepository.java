package com.example.GraplerEnhancemet.Repository;

import com.example.GraplerEnhancemet.dto.UserWithRoleDTO;
import com.example.GraplerEnhancemet.entity.User;
import com.example.GraplerEnhancemet.entity.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.GraplerEnhancemet.entity.CompanyUserRole;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CompanyUserRoleRepository  extends JpaRepository<CompanyUserRole, Long>{
    CompanyUserRole findByCompany_IdAndUser_Id(Long companyId, Long userId);
    @Query("SELECT cu.role FROM CompanyUserRole cu WHERE cu.user.id = :userId AND cu.company.id = :companyId")
    RoleEnum findRoleByUserIdAndCompanyId(@Param("userId") Long userId, @Param("companyId") Long companyId);
    @Query("SELECT cu.user FROM CompanyUserRole cu WHERE cu.company.id = :companyId")
    List<User> findAllUsersByCompanyId(Long companyId);
    @Query("SELECT new com.example.GraplerEnhancemet.dto.UserWithRoleDTO(cu.user, cu.role) FROM CompanyUserRole cu WHERE cu.company.id = :companyId")
    List<UserWithRoleDTO> findUsersAndRolesByCompanyId(Long companyId);

    @Modifying
    @Transactional
    @Query("DELETE FROM CompanyUserRole cu WHERE cu.id = :id")
    void deleteCompanyUserRoleById(@Param("id") Long id);

}
