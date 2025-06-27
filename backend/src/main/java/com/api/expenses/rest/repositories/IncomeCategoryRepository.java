package com.api.expenses.rest.repositories;

import com.api.expenses.rest.models.IncomeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeCategoryRepository extends JpaRepository<IncomeCategory, Integer> {
}
