package com.api.expenses.rest.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "expenses")
public class Expense extends Transaction {

    @ManyToOne(
            cascade = CascadeType.PERSIST,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name = "category_id",
            referencedColumnName = "id",
            nullable = false
    )
    private ExpenseCategory category;

    public Expense() {
        super();
    }

    public Expense(int id,
                   User user,
                   ExpenseCategory category,
                   float amount,
                   Date date,
                   String description,
                   int month,
                   int year,
                   int week) {
        super(id, user, amount, date,  description, month, year, week);
        this.category =  category;
    }

    public Expense(
                   User user,
                   ExpenseCategory category,
                   float amount,
                   Date date,
                   String description,
                   int month,
                   int year,
                   int week) {
        super( user, amount, date,  description, month, year, week);
        this.category =  category;
    }

    public ExpenseCategory getCategory() {
        return category;
    }

    public void setCategory(ExpenseCategory expenseCategory) {
        this.category = expenseCategory;
    }
}
