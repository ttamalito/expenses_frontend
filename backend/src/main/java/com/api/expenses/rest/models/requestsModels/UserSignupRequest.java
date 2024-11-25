package com.api.expenses.rest.models.requestsModels;

public class UserSignupRequest {
    private String username;
    private String password;
    private String email;

    public UserSignupRequest() {
    }

    public UserSignupRequest(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }
}
