package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.ControllersHelper;
import com.api.expenses.rest.exceptions.TransactionException;
import com.api.expenses.rest.exceptions.UserException;
import com.api.expenses.rest.models.Expense;
import com.api.expenses.rest.models.User;
import com.api.expenses.rest.models.requestsModels.AddExpenseRequest;
import com.api.expenses.rest.services.ExpenseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.transaction.TransactionalException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/expenses", produces = { MediaType.APPLICATION_JSON_VALUE })
public class ExpensesController {

    private final ExpenseService expenseService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public ExpensesController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addExpense(@RequestBody AddExpenseRequest expense) {
        User user = null;
        try {
            user = ControllersHelper.getUserFromSecurityContextHolder().orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));
        } catch (TransactionException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        try {
            expenseService.saveExpense(expense, user.getId());
            return ResponseEntity.ok().build();
        } catch (TransactionException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/monthly/{month}/{year}")
    public ResponseEntity<String> getExpensesForAMonth(@PathVariable int month, @PathVariable int year) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try {
            List<Expense> expenses = expenseService.getExpensesForAMonthOfAUser(user.getId(), (month), (year));
            String expensesJson = objectMapper.writeValueAsString(expenses);
            return ResponseEntity.ok().body(expensesJson);
        } catch (UserException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/single-type/{month}/{year}")
    public ResponseEntity<String> getExpensesOfATypeForAMonth(@PathVariable int month, @PathVariable int year, @RequestParam int categoryId) {
        UUID userId = getUserId();

        try {
            List<Expense> expenses = expenseService.getExpensesForAMonthOfAUserByCategory(userId, month, year, categoryId);
            String expensesJson = objectMapper.writeValueAsString(expenses);
            return ResponseEntity.ok().body(expensesJson);
        } catch (TransactionException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/yearly/{year}")
    public ResponseEntity<String> getExpensesForAYear(@PathVariable int year) {
        UUID userId = getUserId();

        try {
            List<Expense> expenses = expenseService.getExpensesForAYearOfAUser(userId, (year));
            String expensesJson = objectMapper.writeValueAsString(expenses);
            return ResponseEntity.ok().body(expensesJson);
        } catch (Exception e) {
            return handleException(e);
        }
    }
    @GetMapping("/single-type")
    public ResponseEntity<String> getExpensesForAYearOfAType(@RequestParam int year, @RequestParam int categoryId) {
        UUID userId = getUserId();

        try {
            List<Expense> expenses = expenseService.getExpensesForAYearOfAUserByCategory(userId, year, categoryId);
            String expensesJson = objectMapper.writeValueAsString(expenses);
            return ResponseEntity.ok().body(expensesJson);
        } catch (Exception e) {
            return handleException(e);
        }
    }
    @GetMapping("/total-spent")
    public ResponseEntity<String> getTotalSpentOnAYear(@RequestParam int year) {
        // Get total spent on a year
        return null;
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

    private UUID getUserId() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getId();
    }

    private ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
