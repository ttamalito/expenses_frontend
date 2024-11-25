package com.api.expenses.rest.repositories;

import com.api.expenses.rest.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    public List<Expense> findByUserIdAndMonthAndYear(UUID userId, int month, int year);

    public List<Expense> findByUserIdAndYear(UUID userId, int year);

    public List<Expense> findByUserIdAndMonthAndYearAndCategoryId(UUID userId, int month, int year, int categoryId);

    public List<Expense> findByUserIdAndWeekAndYear(UUID userId, int week, int year);

    public List<Expense> findByUserId(UUID userId);

    public List<Expense> findByUserIdAndYearAndCategoryId(UUID userId, int year, int categoryId);

    public List<Expense> findByUserIdAndWeekAndYearAndCategoryId(UUID userId, int week, int year, int categoryId);

}
