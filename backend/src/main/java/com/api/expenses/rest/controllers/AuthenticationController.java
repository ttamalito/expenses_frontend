package com.api.expenses.rest.controllers;

import com.api.expenses.rest.models.Role;
import com.api.expenses.rest.models.dtos.CreateUserDto;
import com.api.expenses.rest.models.requestsModels.UserLoginRequest;
import com.api.expenses.rest.models.requestsModels.UserSignupRequest;
import com.api.expenses.rest.models.User;
import com.api.expenses.rest.services.JwtService;
import com.api.expenses.rest.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    private final UserService userService;

    private final JwtService jwtService;

    @Autowired
    public AuthenticationController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Pong");
    }

    @PostMapping("/ping")
    public ResponseEntity<String> pingPost(@RequestBody String hello) {
        return ResponseEntity.ok(hello);
    }

    @PostMapping("/ping/not")
    public ResponseEntity<String> pingNot() {
        return ResponseEntity.ok("Pong");
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> login(@RequestBody UserLoginRequest userData) {
        Optional<User> user = Optional.empty();

        if (userData.getUsername() != null && userData.getUsername().isPresent()) {
            user = userService.authenticateUserByUsername(userData.getUsername().get(), userData.getPassword());
        } else if (userData.getEmail() != null && userData.getEmail().isPresent()) {
            user = userService.authenticateUserByEmail(userData.getEmail().get(), userData.getPassword());
        }

        if (user.isPresent()) {
            String jwtToken = jwtService.generateToken(user.get());
            String accessTokenJson = "{\"accessToken\": \"" + jwtToken + "\"}";
            return ResponseEntity.ok().body(accessTokenJson);
        } else
            return ResponseEntity.badRequest().body("Invalid credentials");

    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody CreateUserDto userData) {

        String password = userData.password();
        String confirmPassword = userData.confirmPassword();
        if (!password.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        if (userService.userCanBeCreated(userData.username(), userData.email())) {
            UUID userId = userService.createUser(userData.username(), userData.password(), userData.email(), 1, Role.USER); // make sure that there is a currency with id 1
            User user = userService.getUserById(userId).get();
            String jwtToken = jwtService.generateToken(user);
            LOGGER.info("User created with id: {}", userId);

//            String cookie = "access_token=" + jwtToken + "; Max-Age=3600;";
            String accessTokenJson = "{\"accessToken\": \"" + jwtToken + "\"}";
            return ResponseEntity.ok().body(accessTokenJson);
        }

        return ResponseEntity.badRequest().body("User already exists");
    }

    @GetMapping("/loggedIn")
    public ResponseEntity<String> loggedIn() {
        User user =  (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user != null) {
            return ResponseEntity.ok().body("User is logged in");
        }
        return ResponseEntity.badRequest().body("No user is logged in");
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
