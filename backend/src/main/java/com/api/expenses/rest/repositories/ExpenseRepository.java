package com.api.expenses.rest.repositories;

import com.api.expenses.rest.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
}
