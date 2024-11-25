package com.api.expenses.rest.services;

import com.api.expenses.rest.models.IncomeCategory;
import com.api.expenses.rest.repositories.IncomeCategoryRepository;

import java.util.Optional;

public class IncomeCategoryService {

    private final IncomeCategoryRepository incomeCategoryRepository;

    public IncomeCategoryService(IncomeCategoryRepository incomeCategoryRepository) {
        this.incomeCategoryRepository = incomeCategoryRepository;
    }

    public boolean categoryExists(int categoryId) {
        return incomeCategoryRepository.existsById(categoryId);
    }

    public Optional<IncomeCategory> getCategoryById(int categoryId) {
        return incomeCategoryRepository.findById(categoryId);
    }

    public IncomeCategory saveCategory(IncomeCategory category) {
        return incomeCategoryRepository.save(category);
    }

    public void deleteCategory(int categoryId) {
        incomeCategoryRepository.deleteById(categoryId);
    }

    public void updateCategory(IncomeCategory category) {
        incomeCategoryRepository.save(category);
    }


}
