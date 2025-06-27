package com.api.expenses.rest.models.requestsModels;

import java.util.Optional;

public class UserLoginRequest {
    private Optional<String> username;
    private Optional<String> email;
    private String password;

    public UserLoginRequest() {
    }

    public UserLoginRequest(Optional<String> username, Optional<String> email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Optional<String> getUsername() {
        return username;
    }

    public void setUsername(Optional<String> username) {
        this.username = username;
    }

    public Optional<String> getEmail() {
        return email;
    }

    public void setEmail(Optional<String> email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
