package com.api.expenses.rest.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/budget")
public class BudgetController {
    @GetMapping("/{year}")
    public void getSetUp(@PathVariable int year) {
    }

    // route to create or modify the existsing setup
    @PostMapping("/modify/{year}")
    public void modifySetUp(@PathVariable int year, @RequestBody String setup) {
    }
}
