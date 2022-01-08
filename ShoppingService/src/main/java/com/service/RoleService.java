package com.service;

import com.entity.Role;

public interface RoleService {
    Role findByName(String name);
}
