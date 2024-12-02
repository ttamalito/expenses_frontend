package com.api.expenses.rest.models;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(name = "profile_picture")
    private String profilePicture;
    @Column(nullable = false)
    private float monthlyBudget;
    @CreationTimestamp
    @Column(name = "creation_date")
    private Date creationDate;
    @Transient
    private String role;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JsonIgnore
    @OneToMany(
            mappedBy = "user",
            targetEntity = Expense.class,
            fetch = FetchType.LAZY,
            orphanRemoval = true // if an expense is no longer being referenced by a user, it will be removed from the db
    )
    private Set<Expense> expenses = new HashSet<>();

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JsonIgnore
    @OneToMany(
            mappedBy = "user",
            targetEntity = Income.class,
            fetch = FetchType.LAZY,
            orphanRemoval = true // if an income is no longer being referenced by a user, it will be removed from the db
    )
    private Set<Income> incomes = new HashSet<>();

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    //@JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    //@JsonIgnore
    // @JsonIdentityReference(alwaysAsId = true) // this is used to return the id only in foreign key relationships... iguess
    @ManyToOne( // many to one means that this entity will have the foreign key column
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "currency_id",
            referencedColumnName = "id",
            nullable = false
    )
    private Currency currency;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JsonIgnore
    @OneToMany(
            mappedBy = "user", // is the instance variable name we'll use in the ExpenseCategory entitiy to point to the associated User
            targetEntity = ExpenseCategory.class,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private Set<ExpenseCategory> expenseCategories = new HashSet<>();

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JsonIgnore
    @OneToMany(
            mappedBy = "user", // is the instance variable name we'll use in the IncomeCategory entity to point to the associated User
            targetEntity = IncomeCategory.class,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private Set<IncomeCategory> incomeCategories = new HashSet<>();



    public User() {
    }

    public User(
            String username,
            String password,
            String email,
            String role,
            Currency currency,
            String profilePicture
                ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.currency = currency;
        this.profilePicture = profilePicture;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public Set<Expense> getExpenses() {
        return expenses;
    }

    public Set<Income> getIncomes() {
        return incomes;
    }

    public Currency getCurrency() {
        return currency;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public float getMonthlyBudget() {
        return monthlyBudget;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public Set<ExpenseCategory> getExpenseCategories() {
        return expenseCategories;
    }

    public Set<IncomeCategory> getIncomeCategories() {
        return incomeCategories;
    }
}