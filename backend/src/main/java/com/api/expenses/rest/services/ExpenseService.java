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
}
