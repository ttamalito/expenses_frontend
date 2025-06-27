package com.api.expenses.rest.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class BaseController {

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Pong");
    }

    @GetMapping("/ping/not")
    public ResponseEntity<String> pingNot() {
        return ResponseEntity.ok("You do not need to be authenticated to access this endpoint");
    }

}
