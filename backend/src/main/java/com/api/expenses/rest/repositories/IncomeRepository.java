package com.api.expenses.rest.repositories;

import com.api.expenses.rest.models.Income;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeRepository extends JpaRepository<Income, Integer> {
}
