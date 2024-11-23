package com.api.expenses.rest.models;

import jakarta.persistence.*;

import java.util.UUID;

@MappedSuperclass
public abstract class AbstractCategory {

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
            //foreignKey = @ForeignKey(name = "fk_category_user_id_"), fk must be unique
    )
    private User user;
    @Column(nullable = false)
    private String name;
    private String description;

    public AbstractCategory() {
    }

    public AbstractCategory(int id, User user, String name, String description) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.description = description;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUserId() {
        return user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
