package com.api.expenses.rest.repositories;

import com.api.expenses.rest.models.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRepository extends JpaRepository<Currency, Integer> {
}
