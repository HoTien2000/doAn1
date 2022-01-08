package com.service;

import java.util.List;

import com.entity.UserSystem;
import com.service.dto.ChangePasswordDTO;

public interface UserSystemService {
    List<UserSystem> findAll();

    UserSystem findById(Long id);

    UserSystem update(UserSystem user);

    void delete(Long id);

    UserSystem findByUserSystem();

    UserSystem updateProfile(UserSystem userSystem);

    UserSystem changePassword(ChangePasswordDTO changePasswordDTO);
}
