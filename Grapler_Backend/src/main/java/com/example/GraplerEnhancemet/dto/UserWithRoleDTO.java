package com.example.GraplerEnhancemet.dto;

import com.example.GraplerEnhancemet.entity.User;
import com.example.GraplerEnhancemet.entity.enums.RoleEnum;
import lombok.Data;

@Data
public class UserWithRoleDTO {
    private User user;
    private RoleEnum role;

    public UserWithRoleDTO(User user, RoleEnum role) {
        this.user = user;
        this.role = role;
    }
}