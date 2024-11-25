package com.api.expenses.rest.services;

import com.api.expenses.rest.models.Currency;
import com.api.expenses.rest.models.ExpenseCategory;
import com.api.expenses.rest.models.User;
import com.api.expenses.rest.models.requestsModels.AddExpenseRequest;
import com.api.expenses.rest.exceptions.TransactionException;
import com.api.expenses.rest.exceptions.UserException;
import com.api.expenses.rest.models.Expense;
import com.api.expenses.rest.repositories.CurrencyRepository;
import com.api.expenses.rest.repositories.ExpenseCategoryRepository;
import com.api.expenses.rest.repositories.ExpenseRepository;
import com.api.expenses.rest.repositories.UserRepository;
import com.api.expenses.rest.utils.DateUtils;
import jakarta.transaction.TransactionalException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    private final ExpenseCategoryRepository expenseCategoryRepository;

    private final CurrencyRepository currencyRepository;
    private final UserRepository userRepository;

    private final UserService userService;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository,
                          ExpenseCategoryRepository expenseCategoryRepository,
                          CurrencyRepository currencyRepository,
                          UserRepository userRepository,
                          UserService userService) {
        this.expenseRepository = expenseRepository;
        this.expenseCategoryRepository = expenseCategoryRepository;
        this.currencyRepository = currencyRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public List<Expense> getExpensesForAMonthOfAUser(UUID userId, int month, int year) throws UserException {
        userService.getUserById(userId).orElseThrow(() -> new UserException(UserException.UserExceptionType.USER_NOT_FOUND));

        return expenseRepository.findByUserIdAndMonthAndYear(userId, month, year);

    }

    /**
     * Saves an expense
     * @param expenseFromRequest
     * @param userId
     * @throws TransactionException
     */
    public void saveExpense(AddExpenseRequest expenseFromRequest, UUID userId) throws TransactionException {
        User user = userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        ExpenseCategory expenseCategory = expenseCategoryRepository.findById(expenseFromRequest.getCategoryId()).orElseThrow(() ->
                new TransactionException(TransactionException.TransactionExceptionType.CATEGORY_NOT_FOUND));


        Currency currency = currencyRepository.findById(expenseFromRequest.getCurrencyId()).orElseThrow(() ->
                new TransactionException(TransactionException.TransactionExceptionType.CURRENCY_NOT_FOUND));


        Date date = expenseFromRequest.getDate();

        final int week = DateUtils.getWeekOfTheYear(date);
        final int month = DateUtils.getMonthOfTheYear(date);
        final int year = DateUtils.getYearOfTheDate(date);


        Expense expense = new Expense(

                user,
                expenseCategory,
                expenseFromRequest.getAmount(),
                date,
                expenseFromRequest.getDescription(),
                month,
                year,
                week
        );


        expenseRepository.save(expense).getId();
    }

    public List<Expense> getExpensesForAYearOfAUser(UUID userId, int year) throws TransactionException {
        userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        return expenseRepository.findByUserIdAndYear(userId, year);
    }

    public List<Expense> getExpensesForAMonthOfAUserByCategory(UUID userId, int month, int year, int categoryId) throws TransactionException {
        userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        return expenseRepository.findByUserIdAndMonthAndYearAndCategoryId(userId, month, year, categoryId);
    }

    public List<Expense> getExpensesForAWeekOfAUser(UUID userId, int week, int year) throws TransactionException {
        userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        return expenseRepository.findByUserIdAndWeekAndYear(userId, week, year);
    }

    public List<Expense> getAllExpensesOfAUser(UUID userId) throws TransactionException {
        userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        return expenseRepository.findByUserId(userId);
    }

    public List<Expense> getExpensesForAYearOfAUserByCategory(UUID userId, int year, int categoryId) throws TransactionException {
        userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        return expenseRepository.findByUserIdAndYearAndCategoryId(userId, year, categoryId);
    }

    public float getTotalSpentForAMonthOfAUser(UUID userId, int month, int year) throws TransactionException {
        userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        List<Expense> expenses = expenseRepository.findByUserIdAndMonthAndYear(userId, month, year);
        float totalSpent = 0;
        for (Expense expense : expenses) {
            totalSpent += expense.getAmount();
        }
        return totalSpent;
    }

    public float getTotalSpentForAYearOfAUser(UUID userId, int year) throws TransactionException {
        userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        List<Expense> expenses = expenseRepository.findByUserIdAndYear(userId, year);
        float totalSpent = 0;
        for (Expense expense : expenses) {
            totalSpent += expense.getAmount();
        }
        return totalSpent;
    }

    public float getTotalSpentForAWeekOfAUser(UUID userId, int week, int year) throws TransactionException {
        userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        List<Expense> expenses = expenseRepository.findByUserIdAndWeekAndYear(userId, week, year);
        float totalSpent = 0;
        for (Expense expense : expenses) {
            totalSpent += expense.getAmount();
        }
        return totalSpent;
    }

    public float getTotalSpentForAYearOfAUserByCategory(UUID userId, int year, int categoryId) throws TransactionException {
        userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        List<Expense> expenses = expenseRepository.findByUserIdAndYearAndCategoryId(userId, year, categoryId);
        float totalSpent = 0;
        for (Expense expense : expenses) {
            totalSpent += expense.getAmount();
        }
        return totalSpent;
    }

    public float getTotalSpentForAMonthOfAUserByCategory(UUID userId, int month, int year, int categoryId) throws TransactionException {
        userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        List<Expense> expenses = expenseRepository.findByUserIdAndMonthAndYearAndCategoryId(userId, month, year, categoryId);
        float totalSpent = 0;
        for (Expense expense : expenses) {
            totalSpent += expense.getAmount();
        }
        return totalSpent;
    }

    public float getTotalSpentForAWeekOfAUserByCategory(UUID userId, int week, int year, int categoryId) throws TransactionException {
        userService.getUserById(userId).orElseThrow(() -> new TransactionException(TransactionException.TransactionExceptionType.USER_NOT_FOUND));

        List<Expense> expenses = expenseRepository.findByUserIdAndWeekAndYearAndCategoryId(userId, week, year, categoryId);
        float totalSpent = 0;
        for (Expense expense : expenses) {
            totalSpent += expense.getAmount();
        }
        return totalSpent;
    }

    public void deleteExpense(int expenseId) {
        expenseRepository.deleteById(expenseId);
    }

    public void updateExpense(Expense expense) {
        expenseRepository.save(expense);
    }

    public boolean expenseExists(int expenseId) {
        return expenseRepository.existsById(expenseId);
    }

    public Optional<Expense> getExpenseById(int expenseId) {
        return expenseRepository.findById(expenseId);
    }


}
