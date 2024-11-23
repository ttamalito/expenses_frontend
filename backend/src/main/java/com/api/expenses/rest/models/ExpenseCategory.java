package com.api.expenses.rest.models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "expense_categories")
public class ExpenseCategory extends AbstractCategory {
    @Column(nullable = false)
    private float budget;
    public ExpenseCategory() {
        super();
    }

    public ExpenseCategory(
            int id,
            User user,
            String name,
            float budget,
            String description) {
        super(id, user, name, description);
        this.budget = budget;

    }

    public float getBudget() {
        return budget;
    }

    public void setBudget(float budget) {
        this.budget = budget;
    }

}
