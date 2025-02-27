package com.api.expenses.rest.models;


import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Date;

@Entity
@Table(name = "incomes")
public class Income extends Transaction implements Serializable {

    @ManyToOne(
            cascade = CascadeType.PERSIST,
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "category_id",
            referencedColumnName = "id",
            nullable = false
    )
    private IncomeCategory category;


    public Income() {
        super();
    }

    public Income(int id, User user,
                   IncomeCategory category,
                   float amount,
                   Date date,
                   String description,
                   int month,
                   int year,
                   int week) {
        super(id, user, amount, date,  description, month, year, week);
        this.category = category;
    }

    public IncomeCategory getCategory() {
        return category;
    }

    public void setCategory(IncomeCategory category) {
        this.category = category;
    }
}
