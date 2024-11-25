package com.api.expenses.rest.services;

import com.api.expenses.rest.models.ExpenseCategory;
import com.api.expenses.rest.repositories.ExpenseCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ExpenseCategoryService {

    private final ExpenseCategoryRepository expenseCategoryRepository;

    public ExpenseCategoryService(ExpenseCategoryRepository expenseCategoryRepository) {
        this.expenseCategoryRepository = expenseCategoryRepository;
    }

    public boolean categoryExists(int categoryId) {
        return expenseCategoryRepository.existsById(categoryId);
    }

    public Optional<ExpenseCategory> getCategoryById(int categoryId) {
        return expenseCategoryRepository.findById(categoryId);
    }

    public ExpenseCategory saveCategory(ExpenseCategory category) {
        return expenseCategoryRepository.save(category);
    }

    public void deleteCategory(int categoryId) {
        expenseCategoryRepository.deleteById(categoryId);
    }


    public void updateCategory(ExpenseCategory category) {
        expenseCategoryRepository.save(category);
    }
}
