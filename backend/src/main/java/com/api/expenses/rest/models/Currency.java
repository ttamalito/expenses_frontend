package com.api.expenses.rest.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "currencies")
// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id"), used to return the id only in foreign key relationships... iguess
public class Currency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String symbol;

    @Column(nullable = false)
    private String code;

    /*
    Here the Currency class owns the relationship.
    It has a set of all users that use this currency.

     */
//    @JsonIgnore
//    @OneToMany(
//            mappedBy = "currency", // is the instance variable name we'll use in User entity to point to the associated Currency
//            targetEntity = User.class,
//            fetch = FetchType.LAZY
//    )
//    private Set<User> users = new HashSet<>();

    public Currency() {
    }

    public Currency(int id, String name, String symbol, String code) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.code = code;
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

    public String getCode() {
        return code;
    }







}
