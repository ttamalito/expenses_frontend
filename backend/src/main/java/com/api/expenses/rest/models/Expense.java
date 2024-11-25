package com.api.expenses.rest.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.sql.Date;
import java.util.UUID;

@Entity
@Table(name = "expenses")
public class Expense extends Transaction {
    public Expense() {
        super();
    }

    public Expense(int id,
                   User user,
                   AbstractCategory category,
                   float amount,
                   Date date,
                   String description,
                   int month,
                   int year,
                   int week) {
        super(id, user, category, amount, date,  description, month, year, week);
    }

    public Expense(
                   User user,
                   AbstractCategory category,
                   float amount,
                   Date date,
                   String description,
                   int month,
                   int year,
                   int week) {
        super( user, category, amount, date,  description, month, year, week);
    }
}
