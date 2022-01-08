package com.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import com.entity.PasswordResetToken;
import com.entity.UserSystem;
import com.mail.service.MailService;
import com.repository.PasswordResetTokenRepository;
import com.repository.UserSystemRepository;
import com.service.PasswordResetTokenService;
import com.service.dto.ForgotPassword;
import com.service.dto.Mail;
import com.service.dto.ResetPasswordDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {

    @Value("${app.api.url}")
    private String url;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Autowired
    private MailService mailService;

    @Autowired
    private PasswordEncoder passwordEncode;

    @Override
    public PasswordResetToken save(ForgotPassword forgotPassword) {
        try {
            UserSystem userSystem = userSystemRepository.findByEmail(forgotPassword.getEmail());

            if (userSystem != null) {
                PasswordResetToken passwordResetToken = new PasswordResetToken();

                passwordResetToken.setToken(UUID.randomUUID().toString());
                passwordResetToken.setExpirationDate(LocalDateTime.now().plusMinutes(5));
                passwordResetToken.setUserSystem(userSystem);

                Mail mail = new Mail();

                mail.setContentType("text/plain; charset=UTF-8");
                mail.setMailFrom("parkminh49@gmail.com");
                mail.setMailTo(userSystem.getEmail());
                mail.setMailSubject("M30 Shop");
                mail.setMailContent(this.templateMail(passwordResetToken));

                mailService.sendEmail(mail);

                return passwordResetTokenRepository.save(passwordResetToken);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        passwordResetTokenRepository.deleteById(id);
    }

    public String templateMail(PasswordResetToken passwordResetToken) {
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append("<!doctype");
        stringBuilder.append("<html>");
        stringBuilder.append("<head>");
        stringBuilder.append("<title>");
        stringBuilder.append("<meta charset='utf-8'>");
        stringBuilder.append("</title>");
        stringBuilder.append("</head>");
        stringBuilder.append("<body>");
        stringBuilder.append("<p>Xin chào " + passwordResetToken.getUserSystem().getFullName() + "</p>");
        stringBuilder.append("<div>Click vào đường dẫn dưới đây để thay thổi mật khẩu</div>");
        stringBuilder.append(
                "<div>Đường dẫn: " + url.concat(passwordResetToken.getToken()) + "</div>");

        stringBuilder.append("</body>");
        stringBuilder.append("</html>");

        return stringBuilder.toString();
    }

    @Override
    public String resetPassword(ResetPasswordDTO resetPasswordDTO) {
        try {
            PasswordResetToken passwordResetToken = passwordResetTokenRepository
                    .findByToken(resetPasswordDTO.getToken());
            if (passwordResetToken != null) {
                if (!resetPasswordDTO.getPassword().equals(resetPasswordDTO.getConfirm())) {
                    return "notequals";
                } else if (passwordResetToken.getExpirationDate().isBefore(LocalDateTime.now())) {
                    return "timeout";
                } else {
                    UserSystem userSystem = passwordResetToken.getUserSystem();

                    userSystem.setLastUpdate(LocalDate.now());
                    userSystem.setPassword(passwordEncode.encode(resetPasswordDTO.getPassword()));

                    passwordResetTokenRepository.deleteById(passwordResetToken.getId());

                    UserSystem result = userSystemRepository.save(userSystem);

                    if (result != null) {
                        return "success";
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "failed";
    }

    @Override
    public List<PasswordResetToken> findAll() {
        List<PasswordResetToken> passwordResetTokens = passwordResetTokenRepository.findAll();

        return passwordResetTokens;
    }

    @Override
    public void deleteAll() {
        List<PasswordResetToken> passwordResetTokens = passwordResetTokenRepository.findAll();

        passwordResetTokenRepository.deleteAll(passwordResetTokens);
    }
}
