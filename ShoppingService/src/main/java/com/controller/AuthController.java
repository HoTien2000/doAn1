package com.controller;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.entity.Role;
import com.entity.UserSystem;
import com.payload.JwtResponse;
import com.payload.LoginRequest;
import com.payload.MessageResponse;
import com.repository.RoleRepository;
import com.repository.UserSystemRepository;
import com.security.jwt.JwtUtils;
import com.utils.EnumRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api", produces = "application/json")
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserSystemRepository userSystemRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncode;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        UserSystem userSystem = userSystemRepository.findByEmail(loginRequest.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        Set<String> grantedAuthorities = new HashSet<>();

        JwtResponse jwtResponse = null;

        if (authentication != null) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            Set<Role> roles = userSystem.getRoles();

            for (Role role : roles) {
                grantedAuthorities.add(role.getName());
            }

            jwtResponse = new JwtResponse(jwt, userSystem.getId(), userSystem.getEmail(), grantedAuthorities);
        }

        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserSystem userSystem) {
        try {
            if (userSystemRepository.existsByEmail(userSystem.getEmail())) {
                return ResponseEntity.ok(new MessageResponse("emailExisted"));
            }
    
            if (userSystemRepository.existsByPhone(userSystem.getPhone())) {
                return ResponseEntity.ok(new MessageResponse("phoneExisted"));
            }

            userSystem.setPassword(passwordEncode.encode(userSystem.getPassword()));
            userSystem.setLastUpdate(LocalDate.now());
    
            List<Role> listRoles = roleRepository.findAll();
            Set<Role> roles = new HashSet<>();
    
            if (listRoles.size() == 0) {

                String roleAdmin = EnumRole.ROLE_ADMIN.toString();
                String roleUser = EnumRole.ROLE_USER.toString();
    
                roles.add(new Role(roleAdmin));
                roles.add(new Role(roleUser));
    
                roleRepository.saveAll(roles);
                userSystem.setRoles(roles);
                userSystemRepository.save(userSystem);
            } else {
                Role role = roleRepository.findByName("ROLE_USER");

                roles.add(role);

                userSystem.setRoles(roles);
                userSystemRepository.save(userSystem);
            }

            return ResponseEntity.ok(new MessageResponse("successfully"));
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return ResponseEntity.ok(new MessageResponse("failed"));
    }
}
