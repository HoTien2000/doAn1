package com.service.dto;

public class ResetPasswordDTO {
    private String token;
    private String password;
    private String confirm;
    
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getConfirm() {
        return confirm;
    }
    public void setConfirm(String confirm) {
        this.confirm = confirm;
    }

    
}
