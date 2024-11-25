package com.api.expenses.rest.services;

import com.api.expenses.rest.repositories.CurrencyRepository;
import com.api.expenses.rest.models.Currency;

import java.util.Optional;

public class CurrencyService {

    private final CurrencyRepository currencyRepository;

    public CurrencyService(CurrencyRepository currencyRepository) {
        this.currencyRepository = currencyRepository;
    }

    public boolean currencyExists(int currencyId) {
        return currencyRepository.existsById(currencyId);
    }

    public Optional<Currency> getCurrencyById(int currencyId) {
        return currencyRepository.findById(currencyId);
    }


}
