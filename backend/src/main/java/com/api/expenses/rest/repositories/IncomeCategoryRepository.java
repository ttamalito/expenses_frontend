package com.api.expenses.rest.repositories;

import com.api.expenses.rest.models.IncomeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface IncomeCategoryRepository extends JpaRepository<IncomeCategory, Integer> {

    @Query(value = "SELECT * FROM income_categories WHERE user_id = ?1", nativeQuery = true)
    public List<IncomeCategory> findByUserId(UUID userId);
}
