package com.api.expenses.rest.models;

import jakarta.persistence.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
import java.util.UUID;

@MappedSuperclass // Abstract class is not mapped, but its subclasses are
public abstract class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "id",
            nullable = false
    )
    private User user;

    @Column(nullable = false)
    private float amount;

    //private Currency currency;
    @Column(nullable = false)
    private Date date;
    private String description;
    @Column(nullable = false)
    private int month;
    @Column(nullable = false)
    private int year;
    @Column(nullable = false)
    private int week;
    @UpdateTimestamp
    private Date lastUpdate;

    public Transaction() {
    }

    public Transaction(int id, User user,
                       float amount,
                       Date date,
                       String description,
                       int month,
                       int year,
                       int week) {
        this.id = id;
        this.user = user;
        this.amount = amount;
        this.date = date;
        this.description = description;
        this.month = month;
        this.year = year;
        this.week = week;
    }

    public Transaction(User user,
                       float amount,
                       Date date,
                       String description,
                       int month,
                       int year,
                       int week) {
        this.id = id;
        this.user = user;
        this.amount = amount;
        this.date = date;
        this.description = description;
        this.month = month;
        this.year = year;
        this.week = week;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User userId) {
        this.user = userId;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getWeek() {
        return week;
    }

    public void setWeek(int week) {
        this.week = week;
    }

    public Date getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Date lastUpdate) {
        this.lastUpdate = lastUpdate;
    }


}
