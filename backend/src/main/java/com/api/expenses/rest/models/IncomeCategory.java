package com.api.expenses.rest.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "income_categories")
public class IncomeCategory extends AbstractCategory {
    public IncomeCategory() {
        super();
    }

    public IncomeCategory(int id, User user, String name, String description) {
        super(id, user, name, description);
    }
}
