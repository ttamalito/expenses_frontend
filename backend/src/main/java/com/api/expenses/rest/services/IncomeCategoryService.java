package com.api.expenses.rest.services;

import com.api.expenses.rest.models.IncomeCategory;
import com.api.expenses.rest.repositories.IncomeCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
     * Gets all income categories for a specific user
     * @param userId the ID of the user
     * @return a list of income categories
     */
    public List<IncomeCategory> getCategoriesForUser(UUID userId) {
        return incomeCategoryRepository.findByUserId(userId);
    }

    /**
     * Creates a new income category in the database
     * @param category
     * @return the id of the created category
     */
    public int createCategory(IncomeCategory category) {
        return incomeCategoryRepository.save(category).getId();
    }

    public void deleteCategory(int categoryId) {
        incomeCategoryRepository.deleteById(categoryId);
    }

    public void updateCategory(IncomeCategory category) {
        incomeCategoryRepository.save(category);
    }


}
