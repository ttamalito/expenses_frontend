package com.api.expenses.rest.services;

import com.api.expenses.rest.models.IncomeCategory;
import com.api.expenses.rest.repositories.IncomeCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class IncomeCategoryService {

    private final IncomeCategoryRepository incomeCategoryRepository;

    @Autowired
    public IncomeCategoryService(IncomeCategoryRepository incomeCategoryRepository) {
        this.incomeCategoryRepository = incomeCategoryRepository;
    }

    public boolean categoryExists(int categoryId) {
        return incomeCategoryRepository.existsById(categoryId);
    }

    public Optional<IncomeCategory> getCategoryById(int categoryId) {
        return incomeCategoryRepository.findById(categoryId);
    }

    /**
     * Creates a new income category in the database
     * @param category
     * @return
     */
    public IncomeCategory createCategory(IncomeCategory category) {
        return incomeCategoryRepository.save(category);
    }

    public void deleteCategory(int categoryId) {
        incomeCategoryRepository.deleteById(categoryId);
    }

    public void updateCategory(IncomeCategory category) {
        incomeCategoryRepository.save(category);
    }


}
