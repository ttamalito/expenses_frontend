package com.api.expenses.rest.repositories;

import com.api.expenses.rest.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
