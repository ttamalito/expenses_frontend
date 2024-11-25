package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.BudgetControllerUtils;
import com.api.expenses.rest.controllers.utils.ControllersHelper;
import com.api.expenses.rest.models.ExpenseCategory;
import com.api.expenses.rest.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/budget")
public class BudgetController {

    private final UserService userService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public BudgetController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping()
    public ResponseEntity<String> getBudget() {
        UUID userId = ControllersHelper.getUserIdFromSecurityContextHolder();

        try {
            List<ExpenseCategory> categories = userService.getUserExpenseCategories(userId);
            String categoriesAsJson = BudgetControllerUtils.convertExpenseCategoriesToJSON(categories);
            return ResponseEntity.ok().body(categoriesAsJson);
        } catch (Exception e) {
            return ControllersHelper.handleException(e);
        }

    }

    // route to create or modify the existsing setup
    @PostMapping("/modify")
    public ResponseEntity<String> modifySetUp(@RequestBody String listOfCategories) {
        try {
            List<ExpenseCategory> categories = objectMapper.readValue(listOfCategories,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, ExpenseCategory.class));
            userService.saveExpenseCategories(categories);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ControllersHelper.handleException(e);
        }
    }
}
