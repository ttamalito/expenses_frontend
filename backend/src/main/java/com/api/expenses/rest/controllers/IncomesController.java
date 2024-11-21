package com.api.expenses.rest.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/income")
public class IncomesController {
    @GetMapping("/total-earned")
    public void getTotalEarnedForAYear(@RequestParam int year) {

    }
     @GetMapping("/month")
    public void getTotalEarnedInAMonth(@RequestParam int month, @RequestParam int year) {

     }

     @GetMapping("/year/monthly")
    public void getTotalEarnedInAYearInAMonthlyBasis(@RequestParam int year) {

     }
}
