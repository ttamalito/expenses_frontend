package com.api.expenses.rest.controllers;

import com.api.expenses.rest.models.requestsModels.UserLoginRequest;
import com.api.expenses.rest.models.requestsModels.UserSignupRequest;
import com.api.expenses.rest.models.User;
import com.api.expenses.rest.services.JwtService;
import com.api.expenses.rest.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final UserService userService;

    private final JwtService jwtService;

    @Autowired
    public AuthenticationController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginRequest userData) {
        Optional<User> user = Optional.empty();

        if (userData.getUsername() != null && userData.getUsername().isPresent()) {
            user = userService.authenticateUserByUsername(userData.getUsername().get(), userData.getPassword());
        } else if (userData.getEmail() != null && userData.getEmail().isPresent()) {
            user = userService.authenticateUserByEmail(userData.getEmail().get(), userData.getPassword());
        }

        if (user.isPresent()) {
            String jwtToken = jwtService.generateToken(user.get());
            String cookie = "access_token=" + jwtToken + "; Max-Age=3600;";
            return ResponseEntity.noContent().header("Set-Cookie",cookie).build();
        } else
            return ResponseEntity.badRequest().body("Invalid credentials");

    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserSignupRequest userData) {

        if (userService.userCanBeCreated(userData.getUsername(), userData.getEmail())) {
            UUID userId = userService.createUser(userData.getUsername(), userData.getPassword(), userData.getEmail(), 1, "USER");
            User user = userService.getUserById(userId).get();
            String jwtToken = jwtService.generateToken(user);

            String cookie = "access_token=" + jwtToken + "; Max-Age=3600;";
            return ResponseEntity.ok().header("Set-Cookie",cookie).build();
        }

        return ResponseEntity.badRequest().body("User already exists");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
       User user =  (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

       if (user != null) {
           String cookie = "access_token=; Max-Age=0;";
           return ResponseEntity.noContent().header("Set-Cookie", cookie).build();
       }
         return ResponseEntity.badRequest().body("No user is logged in");

    }

}
