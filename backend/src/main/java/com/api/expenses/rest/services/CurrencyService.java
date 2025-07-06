package com.api.expenses.rest.services;

import com.api.expenses.rest.repositories.CurrencyRepository;
import com.api.expenses.rest.models.Currency;
import com.api.expenses.rest.models.dtos.CreateCurrencyDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
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

    public List<Currency> getAllCurrencies() {
        return currencyRepository.findAll();
    }

    public Currency createCurrency(CreateCurrencyDto createCurrencyDto) {
        Currency currency = new Currency(0, createCurrencyDto.name(), createCurrencyDto.symbol(), createCurrencyDto.description());
        return currencyRepository.save(currency);
    }

    public void deleteCurrency(int currencyId) {
        currencyRepository.deleteById(currencyId);
    }
}
