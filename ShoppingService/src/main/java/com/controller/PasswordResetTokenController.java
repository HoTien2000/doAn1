package com.controller;

import java.util.List;

import com.entity.PasswordResetToken;
import com.payload.MessageResponse;
import com.service.PasswordResetTokenService;
import com.service.dto.ForgotPassword;
import com.service.dto.ResetPasswordDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/forgot-password")
public class PasswordResetTokenController {

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save(@RequestBody ForgotPassword forgotPassword) {

        PasswordResetToken result = passwordResetTokenService.save(forgotPassword);

        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<MessageResponse> postMethodName(@RequestBody ResetPasswordDTO resetPasswordDTO) {
       String result = passwordResetTokenService.resetPassword(resetPasswordDTO);

       return ResponseEntity.ok(new MessageResponse(result));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<PasswordResetToken>> findAll() {
        List<PasswordResetToken> passwordResetTokens = passwordResetTokenService.findAll();

        return ResponseEntity.ok().body(passwordResetTokens);
    }

    @DeleteMapping("/delete-all")
    public ResponseEntity<MessageResponse> deleteAll() {
        try{
            passwordResetTokenService.deleteAll();

            return ResponseEntity.ok().body(new MessageResponse("success"));
        }catch(Exception e) {
            e.printStackTrace();
        }
        
        return ResponseEntity.ok().body(new MessageResponse("failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            passwordResetTokenService.delete(id);

            return ResponseEntity.ok().body(new MessageResponse("success"));
        }catch(Exception e) {
            e.printStackTrace();
        }
        
        return ResponseEntity.ok().body(new MessageResponse("failed"));
    }

}
