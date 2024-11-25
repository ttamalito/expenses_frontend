package com.api.expenses.rest.repositories;

import com.api.expenses.rest.models.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Integer> {

    public List<ExpenseCategory> findAllByUserId(UUID userId);
}
