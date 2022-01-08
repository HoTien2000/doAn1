package com.controller;

import java.util.List;
import java.util.Set;

import com.entity.Role;
import com.entity.UserSystem;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.payload.MessageResponse;
import com.repository.UserSystemRepository;
import com.service.UserSystemService;
import com.service.dto.ChangePasswordDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/user")
public class UserSystemController {

    @Autowired
    private UserSystemService userSystemService;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/find-all")
    public ResponseEntity<List<UserSystem>> findAll() {
        List<UserSystem> userSystems = userSystemService.findAll();

        return ResponseEntity.ok(userSystems);
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<UserSystem> findById(@PathVariable Long id) {
        UserSystem userSystem = userSystemService.findById(id);

        return ResponseEntity.ok().body(userSystem);
    }

    @PutMapping("/update")
    public ResponseEntity<MessageResponse> update(@RequestParam("userSystem") String userSystem,
            @RequestParam("role") String role) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());

            UserSystem dataUser = mapper.readValue(userSystem, UserSystem.class);

            Set<Role> roles = mapper.readValue(role, new TypeReference<Set<Role>>() {
            });

            dataUser.setRoles(roles);

            UserSystem checkUser = userSystemService.findById(dataUser.getId());

            if (!checkUser.getEmail().equals(dataUser.getEmail())
                    && userSystemRepository.existsByEmail(dataUser.getEmail())) {
                return ResponseEntity.ok(new MessageResponse("emailExisted"));
            }

            if (!checkUser.getPhone().equals(dataUser.getPhone())
                    && userSystemRepository.existsByPhone(dataUser.getPhone())) {
                return ResponseEntity.ok(new MessageResponse("phoneExisted"));
            }

            dataUser.setPassword(checkUser.getPassword());
            UserSystem data = userSystemService.update(dataUser);

            if (data != null) {
                return ResponseEntity.ok().body(new MessageResponse("successfully"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(new MessageResponse("failed"));

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try {
            userSystemService.delete(id);

            return ResponseEntity.ok().body(new MessageResponse("successfully"));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok().body(new MessageResponse("failed"));
    }

    @GetMapping("/find-user")
    public ResponseEntity<UserSystem> findByUserSystem() {
        UserSystem userSystem = userSystemService.findByUserSystem();

        return ResponseEntity.ok().body(userSystem);
    }

    @PutMapping("/update-profile")
    public ResponseEntity<MessageResponse> updateProfile(@RequestBody UserSystem userSystem) {
        try {

            if (!userSystem.getEmail().equals(userSystem.getEmail())
                    && userSystemRepository.existsByEmail(userSystem.getEmail())) {
                return ResponseEntity.ok(new MessageResponse("emailExisted"));
            }

            if (!userSystem.getPhone().equals(userSystem.getPhone())
                    && userSystemRepository.existsByPhone(userSystem.getPhone())) {
                return ResponseEntity.ok(new MessageResponse("phoneExisted"));
            }

            UserSystem result = userSystemService.updateProfile(userSystem);

            if (result != null) {
                return ResponseEntity.ok().body(new MessageResponse("success"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok().body(new MessageResponse("failed"));
    }

    @PutMapping("/change-password")
    public ResponseEntity<MessageResponse> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

        Authentication check = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(userSystem.getEmail(), changePasswordDTO.getOldPassword()));

        if(check == null) {
            return ResponseEntity.ok().body(new MessageResponse("incorrect"));
        }

        UserSystem result = userSystemService.changePassword(changePasswordDTO);

        if(result != null) {
            return ResponseEntity.ok().body(new MessageResponse("success"));
        }

        return ResponseEntity.ok().body(new MessageResponse("failed"));
    }
}
