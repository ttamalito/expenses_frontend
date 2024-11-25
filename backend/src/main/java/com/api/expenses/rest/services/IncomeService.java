package com.api.expenses.rest.services;

import com.api.expenses.rest.models.Income;
import com.api.expenses.rest.repositories.IncomeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;

    public IncomeService(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    public boolean incomeExists(int incomeId) {
        return incomeRepository.existsById(incomeId);
    }

    public Optional<Income> getIncomeById(int incomeId) {
        return incomeRepository.findById(incomeId);
    }

    public Income saveIncome(Income income) {
        return incomeRepository.save(income);
    }

    public void deleteIncome(int incomeId) {
        incomeRepository.deleteById(incomeId);
    }

    public void updateIncome(Income income) {
        incomeRepository.save(income);
    }

    public List<Income> getIncomesForAMonthOfAUser(UUID userId, int month, int year) {
        return incomeRepository.findByUserIdAndMonthAndYear(userId, month, year);
    }

    public List<Income> getIncomesForAYearOfAUser(UUID userId, int year) {
        return incomeRepository.findByUserIdAndYear(userId, year);
    }

    public float getTotalEarnedForAYearForAUser(UUID userId, int year) {
        List<Income> incomes = getIncomesForAYearOfAUser(userId, year);
        float total = 0;
        for (Income income : incomes) {
            total += income.getAmount();
        }
        return total;
    }

    public float getTotalEarnedForAMonthForAUser(UUID userId, int month, int year) {
        List<Income> incomes = getIncomesForAMonthOfAUser(userId, month, year);
        float total = 0;
        for (Income income : incomes) {
            total += income.getAmount();
        }
        return total;
    }

    public List<Float> getTotalEarnedInAYearInAMonthlyBasis(UUID userId, int year) {
        List<Float> totals = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            float total = getTotalEarnedForAMonthForAUser(userId, i, year);
            totals.add(total);
//            System.out.println("Month: " + i + " Total: " + total);
        }
        return totals;
    }

    public List<Income> getIncomesForAMonthOfAUserByCategory(UUID userId, int month, int year, int categoryId) {
        return incomeRepository.findByUserIdAndMonthAndYearAndCategoryId(userId, month, year, categoryId);
    }

    public List<Income> getIncomesForAWeekOfAUser(UUID userId, int week, int year) {
        return incomeRepository.findByUserIdAndWeekAndYear(userId, week, year);
    }

    public List<Income> getAllIncomesOfAUser(UUID userId) {
        return incomeRepository.findByUserId(userId);
    }
}
