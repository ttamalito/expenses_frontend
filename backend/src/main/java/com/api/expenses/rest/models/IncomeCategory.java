package com.api.expenses.rest.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "income_categories")
public class IncomeCategory extends AbstractCategory {

    @JsonIgnore
    @OneToMany(
            mappedBy = "category", // is the instance variable name we'll use in Income entity to point to the associated IncomeCategory
            targetEntity = Income.class,
            fetch = FetchType.LAZY
    )
    Set<Income> incomes = new HashSet<>();
    public IncomeCategory() {
        super();
    }

    public IncomeCategory(int id, User user, String name, String description) {
        super(id, user, name, description);
    }

    public IncomeCategory(User user, String name, String description) {
        super(user, name, description);
    }
}
