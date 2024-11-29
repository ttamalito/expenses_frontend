package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.ControllersHelper;
import com.api.expenses.rest.services.IncomeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/income")
public class IncomesController {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final IncomeService incomeService;

    @Autowired
    public IncomesController(@Lazy IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @GetMapping("/total-earned") // TODO: rename the endpoint to /total-earned/year
    public ResponseEntity<String> getTotalEarnedForAYear(@RequestParam int year) {
        UUID userId = ControllersHelper.getUserIdFromSecurityContextHolder();

        try {
            float total = incomeService.getTotalEarnedForAYearForAUser(userId, year);
            String response = String.format("{\"total\": %f}", total);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ControllersHelper.handleException(e);
        }
    }
     @GetMapping("/month")
    public ResponseEntity<String> getTotalEarnedInAMonth(@RequestParam int month, @RequestParam int year) {

        UUID userId = ControllersHelper.getUserIdFromSecurityContextHolder();
        try {
            float total = incomeService.getTotalEarnedForAMonthForAUser(userId, month, year);
            String response = String.format("{\"total\": %f}", total);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ControllersHelper.handleException(e);
        }
     }

     @GetMapping("/year/monthly")
    public ResponseEntity<String> getTotalEarnedInAYearInAMonthlyBasis(@RequestParam int year) {

        UUID userId = ControllersHelper.getUserIdFromSecurityContextHolder();
        try {
            List<Float> totals = incomeService.getTotalEarnedInAYearInAMonthlyBasis(userId, year);
            String totalsJson = objectMapper.writeValueAsString(totals);
            return ResponseEntity.ok(totalsJson);
        } catch (JsonProcessingException e) {
            return ControllersHelper.handleException(e);
        }
     }


}
