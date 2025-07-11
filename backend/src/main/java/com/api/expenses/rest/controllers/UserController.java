package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.ControllersHelper;
import com.api.expenses.rest.models.User;
import com.api.expenses.rest.models.dtos.CreateUserDto;
import com.api.expenses.rest.models.dtos.UpdateUserDto;
import com.api.expenses.rest.models.requestsModels.UserSignupRequest;
import com.api.expenses.rest.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import javax.swing.text.html.Option;
import java.io.Serializable;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController implements Serializable {

    Logger LOG = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final ObjectMapper objectMapper;

    public UserController(@Lazy UserService userService) {

        this.userService = userService;
        this.objectMapper = new ObjectMapper();
    }

    @PostMapping(value = "/update/{username}", produces = {"application/json", "text/plain"})
    public ResponseEntity<String> update(@RequestBody UpdateUserDto userdata, @PathVariable String username) {
        Optional<User> optionalUser = ControllersHelper.getUserFromSecurityContextHolder();
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        User user = optionalUser.get();
        if (!user.getUsername().equals(username)) {
            return ResponseEntity.badRequest().body("Not authorized to perform this action");
        }

        user.setCurrencyId(userdata.currencyId());
        user.setFirstName(userdata.firstName());
        user.setLastName(userdata.lastName());
        boolean success = userService.updateUser(user);
        if (!success) {
            return ResponseEntity.internalServerError().body("User update failed");
        }
        return ResponseEntity.ok().body("User updated successfully");
    }

    @GetMapping(value = "/{username}", produces = {"application/json", "text/plain"})
    public ResponseEntity<String> getUserProfileData(@PathVariable String username) {
        Optional<User> fetchedUser = userService.getUserByUsername(username);

        if (fetchedUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        User user = fetchedUser.get();

        User userMakingRequest = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!userMakingRequest.getUsername().equals(user.getUsername())) {
            return ResponseEntity.badRequest().body("You are not allowed to view this user's profile");
        }

        try {
            String userJson = objectMapper.writeValueAsString(user);
            return ResponseEntity.ok().body(userJson);
        } catch (JsonProcessingException e) {
            LOG.error("An error occurred while serializing the user's data", e);
            return ResponseEntity.internalServerError().body("An error occurred while fetching the user's data");
        }
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        Optional<User> fetchedUser = userService.getUserByUsername(username);
        if (fetchedUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        User user = fetchedUser.get();
        User userMakingRequest = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!userMakingRequest.getUsername().equals(user.getUsername())) {
            return ResponseEntity.badRequest().body("You are not allowed to delete this user");
        }
        userService.deleteUser(user);
        return ResponseEntity.ok().body("User deleted successfully");
    }

}
