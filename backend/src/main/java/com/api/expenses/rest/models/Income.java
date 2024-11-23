package com.api.expenses.rest.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.sql.Date;
import java.util.UUID;

@Entity
@Table(name = "incomes")
public class Income extends Transaction {
    public Income() {
        super();
    }

    public Income(int id, User user,
                   AbstractCategory category,
                   float amount,
                   Date date,
                   String description,
                   int month,
                   int year,
                   int week) {
        super(id, user, category, amount, date,  description, month, year, week);
    }
}
