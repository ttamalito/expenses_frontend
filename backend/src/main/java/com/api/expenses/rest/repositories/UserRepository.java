package com.api.expenses.rest.repositories;

import com.api.expenses.rest.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    public Optional<User> findByUsername(String username);

    public Optional<User> findByEmail(String email);
}
