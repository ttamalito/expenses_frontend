package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.ControllersHelper;
import com.api.expenses.rest.models.ExpenseCategory;
import com.api.expenses.rest.models.IncomeCategory;
import com.api.expenses.rest.models.User;
import com.api.expenses.rest.models.dtos.CreateExpenseCategoryDto;
import com.api.expenses.rest.models.dtos.CreateIncomeCategoryDto;
import com.api.expenses.rest.services.ExpenseCategoryService;
import com.api.expenses.rest.services.IncomeCategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "/category", produces = { MediaType.APPLICATION_JSON_VALUE })
public class CategoriesController {

    private final ExpenseCategoryService expenseCategoryService;
    private final IncomeCategoryService incomeCategoryService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public CategoriesController(ExpenseCategoryService expenseCategoryService,
                                IncomeCategoryService incomeCategoryService) {
        this.expenseCategoryService = expenseCategoryService;
        this.incomeCategoryService = incomeCategoryService;
    }

    @GetMapping("/expense/get/{categoryId}")
    public ResponseEntity<String> getExpenseCategory(@PathVariable int categoryId) {
        Optional<User> optionalUser = ControllersHelper.getUserFromSecurityContextHolder();
        try {
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                Optional<ExpenseCategory> category = expenseCategoryService.getCategoryById(categoryId);
                if (category.isPresent()) {
                    String categoryJson = objectMapper.writeValueAsString(category.get());
                    return ResponseEntity.ok().body(categoryJson);
                }
            }
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            return ResponseEntity.badRequest().body(throwable.getMessage());
        }
        return ResponseEntity.badRequest().body("Could not get Category");
    }

    @PutMapping("/expense/create")
    public ResponseEntity<String> saveExpenseCategory(@RequestBody CreateExpenseCategoryDto expenseCategory) {
        Optional<User> optionalUser = ControllersHelper.getUserFromSecurityContextHolder();
        try {
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                ExpenseCategory category = new ExpenseCategory(
                        user, expenseCategory.name(),
                        expenseCategory.budget(),
                        expenseCategory.description()
                );
                int categoryID = expenseCategoryService.createCategory(category);
                return ResponseEntity.ok(String.valueOf(categoryID));
            }
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            return ResponseEntity.badRequest().body(throwable.getMessage());
        }
        return ResponseEntity.badRequest().body("No user found with the token");
    }

    @DeleteMapping("/expense/delete/{categoryId}")
    public ResponseEntity<String> saveExpenseCategory(@PathVariable int categoryId) {
        Optional<User> optionalUser = ControllersHelper.getUserFromSecurityContextHolder();
        try {
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                expenseCategoryService.deleteCategory(categoryId);
                return ResponseEntity.noContent().build();
            }
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            return ResponseEntity.badRequest().body(throwable.getMessage());
        }
        return ResponseEntity.badRequest().body("No user found with the token");
    }

    @GetMapping("/income/get/{categoryId}")
    public ResponseEntity<String> getIncomeCategory(@PathVariable int categoryId) {
        Optional<User> optionalUser = ControllersHelper.getUserFromSecurityContextHolder();
        try {
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                Optional<IncomeCategory> category = incomeCategoryService.getCategoryById(categoryId);
                if (category.isPresent()) {
                    String categoryJson = objectMapper.writeValueAsString(category.get());
                    return ResponseEntity.ok().body(categoryJson);
                }
            }
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            return ResponseEntity.badRequest().body(throwable.getMessage());
        }
        return ResponseEntity.badRequest().body("Could not get Category");
    }

    @PutMapping("/income/create")
    public ResponseEntity<String> saveIncomeCategory(@RequestBody CreateIncomeCategoryDto incomeCategory) {
        Optional<User> optionalUser = ControllersHelper.getUserFromSecurityContextHolder();
        try {
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                IncomeCategory category = new IncomeCategory(
                        user, incomeCategory.name(),
                        incomeCategory.description()
                );
                int categoryID = incomeCategoryService.createCategory(category);
                return ResponseEntity.ok(String.valueOf(categoryID));
            }
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            return ResponseEntity.badRequest().body(throwable.getMessage());
        }
        return ResponseEntity.badRequest().body("No user found with the token");
    }

    @DeleteMapping("/income/delete/{categoryId}")
    public ResponseEntity<String> saveIncomeCategory(@PathVariable int categoryId) {
        Optional<User> optionalUser = ControllersHelper.getUserFromSecurityContextHolder();
        try {
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                incomeCategoryService.deleteCategory(categoryId);
                return ResponseEntity.noContent().build();
            }
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            return ResponseEntity.badRequest().body(throwable.getMessage());
        }
        return ResponseEntity.badRequest().body("No user found with the token");
    }
}
