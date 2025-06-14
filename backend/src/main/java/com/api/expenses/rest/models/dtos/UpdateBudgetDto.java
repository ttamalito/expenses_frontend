package com.api.expenses.rest.models.dtos;

public record UpdateBudgetDto(int categoryId, Float newBudget) {
}
