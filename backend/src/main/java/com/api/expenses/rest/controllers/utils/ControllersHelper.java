package com.api.expenses.rest.controllers.utils;

import com.api.expenses.rest.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;
import java.util.UUID;

public class ControllersHelper {

    public static Optional<User> getUserFromSecurityContextHolder() {
      Object object =  SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (object instanceof User) {
            return Optional.of((User) object);
        } else {
            return Optional.empty();
        }
    }

    public static UUID getUserIdFromSecurityContextHolder() {
        return getUserFromSecurityContextHolder().map(User::getId).orElse(null);
    }

    public static ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
