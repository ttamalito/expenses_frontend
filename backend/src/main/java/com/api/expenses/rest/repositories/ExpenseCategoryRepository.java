package com.api.expenses.rest.repositories;

import com.api.expenses.rest.models.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Integer> {
}
