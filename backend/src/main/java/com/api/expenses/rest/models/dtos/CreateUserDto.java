package com.api.expenses.rest.models.dtos;

public record CreateUserDto(String username, String password, String confirmPassword, String email) {
}
