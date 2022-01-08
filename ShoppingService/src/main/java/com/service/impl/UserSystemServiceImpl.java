package com.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.entity.UserSystem;
import com.repository.UserSystemRepository;
import com.service.UserSystemService;
import com.service.dto.ChangePasswordDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserSystemServiceImpl implements UserSystemService {

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Autowired
    PasswordEncoder passwordEncode;

    @Override
    public List<UserSystem> findAll() {
        List<UserSystem> userSystems = userSystemRepository.findAll();

        return userSystems;
    }

    @Override
    public UserSystem findById(Long id) {
        Optional<UserSystem> userSystemOptional = userSystemRepository.findById(id);

        if(userSystemOptional.isPresent()) {
            return userSystemOptional.get();
        }

        return null;
    }

    @Override
    public UserSystem update(UserSystem userSystem) {
        if(userSystem != null) {
            userSystem.setLastUpdate(LocalDate.now());

            return userSystemRepository.save(userSystem);
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        userSystemRepository.deleteById(id);
    }

    @Override
    public UserSystem findByUserSystem() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

        return userSystem;
    }

    @Override
    public UserSystem updateProfile(UserSystem userSystem) {
        Optional<UserSystem> userSystemOptional = userSystemRepository.findById(userSystem.getId());

        if(userSystemOptional.isPresent()) {
            userSystem.setPassword(userSystemOptional.get().getPassword());
            userSystem.setRoles(userSystemOptional.get().getRoles());
            userSystem.setLastUpdate(LocalDate.now());

            return userSystemRepository.save(userSystem);
        }

        return null;

    }

    @Override
    public UserSystem changePassword(ChangePasswordDTO changePasswordDTO) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            userSystem.setPassword(passwordEncode.encode(changePasswordDTO.getNewPassword()));
            userSystem.setLastUpdate(LocalDate.now());

            return userSystemRepository.save(userSystem);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }
    
}
