package com.controller;

import com.entity.Role;
import com.service.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/role", produces = "application/json")
public class RoleController {
    
    @Autowired
    private RoleService roleService;

    @GetMapping("/role-name")
    public ResponseEntity<Role> findByName(String name) {
        return ResponseEntity.ok().body(roleService.findByName(name));
    }
}
