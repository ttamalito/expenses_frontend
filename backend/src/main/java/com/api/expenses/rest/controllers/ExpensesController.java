package com.api.expenses.rest.controllers;

import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/expenses", produces = { MediaType.APPLICATION_JSON_VALUE })
public class ExpensesController {

    @PostMapping("/add")
    public void addExpense(@RequestBody String expense) {
        // Add expense
    }
    @GetMapping("/monthly/{month}/{year}")
    public void getExpensesForAMonth(@PathVariable String month, @PathVariable String year) {
        // Get expenses for a month
    }
    @PostMapping("/single-type/{month}/{year}")
    public void getExpensesOfATypeForAMonth(@PathVariable String month, @PathVariable String year, @RequestBody String type) {
        // Get expenses of a type for a month
    }

    @GetMapping("/yearly/{year}")
    public void getExpensesForAYear(@PathVariable String year) {
        // Get expenses for a year
    }
    @GetMapping("/single-type")
    public void getExpensesForAYearOfAType(@RequestParam String year, @RequestParam String type) {
        // Get expenses for a year of a type
    }
    @GetMapping("/total-spent")
    public void getTotalSpentOnAYear(@RequestParam String year) {
        // Get total spent on a year
    }
    @PostMapping("/modify")
    public void modifySingleExpense(@RequestBody String expense, @RequestParam String id) {
    }
    @GetMapping("/total-spent/monthly")
    public void getTotalSpentOnAMonth(@RequestParam String month, @RequestParam String year, @RequestParam String type) {
        // Get total spent on a month
    }

    @DeleteMapping("/delete")
    public void deleteExpense(@RequestBody String expenseId, @RequestParam String month, @RequestParam String year) {
        // Delete expense
    }

    // options this could be deleted, as spring boot handles this automatically
    @RequestMapping(value="/delete", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> deleteExpenseOptions()
    {
        return ResponseEntity
                .ok()
                .allow(HttpMethod.GET, HttpMethod.DELETE, HttpMethod.PUT, HttpMethod.OPTIONS)
                .build();
    }
}