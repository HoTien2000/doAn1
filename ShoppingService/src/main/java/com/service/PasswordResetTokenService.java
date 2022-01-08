package com.service;

import java.util.List;

import com.entity.PasswordResetToken;
import com.service.dto.ForgotPassword;
import com.service.dto.ResetPasswordDTO;

public interface PasswordResetTokenService {
    PasswordResetToken save(ForgotPassword forgotPassword);

    void delete(Long id);

    String resetPassword(ResetPasswordDTO resetPasswordDTO);

    List<PasswordResetToken> findAll();

    void deleteAll();
}
