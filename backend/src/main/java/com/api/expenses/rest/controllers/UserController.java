package com.api.expenses.rest.controllers;

import com.api.expenses.rest.models.requestsModels.UserSignupRequest;
import com.api.expenses.rest.services.UserService;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.EntityResponse;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(@Lazy UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/update")
    public EntityResponse<Void> update(@RequestBody UserSignupRequest userdata) {
        return null;
    }

}
