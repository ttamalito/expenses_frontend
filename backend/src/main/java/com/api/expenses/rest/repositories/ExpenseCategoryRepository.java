package com.api.expenses.rest.repositories;

import com.api.expenses.rest.models.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Integer> {

    @Query(value = "SELECT * FROM expense_categories WHERE user_id = ?1", nativeQuery = true)
    public List<ExpenseCategory> findByUserId(UUID userId);
}
