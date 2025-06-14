package com.api.expenses.rest.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "expense_categories")
public class ExpenseCategory extends AbstractCategory implements Serializable {
    @Column(nullable = false)
    private float budget;

    @JsonIgnore
    @OneToMany(
            mappedBy = "category", // is the instance variable name we'll use in Expense entity to point to the associated ExpenseCategory
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            targetEntity = Expense.class
    )
    private List<Expense> expenses = new ArrayList<>();
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
    public ExpenseCategory(
            User user,
            String name,
            float budget,
            String description) {
        super(user, name, description);
        this.budget = budget;
    }

    public float getBudget() {
        return budget;
    }

    public void setBudget(float budget) {
        this.budget = budget;
    }

    public boolean onlyBudgetWasModified(ExpenseCategory category) {
        return this.getName().equals(category.getName()) &&
                this.getDescription().equals(category.getDescription()) &&
                this.getId() == category.getId() &&
                this.getUserId().equals(category.getUserId());
    }

}
