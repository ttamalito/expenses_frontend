package com.api.expenses.rest.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "expense_categories")
public class ExpenseCategory extends AbstractCategory {
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

    public float getBudget() {
        return budget;
    }

    public void setBudget(float budget) {
        this.budget = budget;
    }

}
