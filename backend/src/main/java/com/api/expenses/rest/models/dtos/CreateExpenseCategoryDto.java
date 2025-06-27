package com.api.expenses.rest.models.dtos;

public record CreateExpenseCategoryDto(String description, String name, Float budget) {
}
