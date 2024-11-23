package com.api.expenses.rest.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "currencies")
public class Currency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String symbol;

    @JsonIgnore
    @OneToMany(
            mappedBy = "currency",
            targetEntity = User.class,
            fetch = FetchType.LAZY
    )
    private Set<User> users = new HashSet<>();

    public Currency() {
    }

    public Currency(int id, String name, String symbol) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
    }

    public int getId() {
        return id;
    }


    public String getName() {
        return name;
    }

    public String getSymbol() {
        return symbol;
    }







}
