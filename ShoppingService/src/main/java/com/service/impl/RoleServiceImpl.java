package com.service.impl;

import javax.transaction.Transactional;

import com.entity.Role;
import com.repository.RoleRepository;
import com.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class RoleServiceImpl implements RoleService{
    
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findByName(String name) {
        Role role = roleRepository.findByName(name);

        return role;
    }
}
