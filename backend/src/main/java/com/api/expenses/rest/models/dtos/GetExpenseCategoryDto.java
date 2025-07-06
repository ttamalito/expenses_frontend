package com.api.expenses.rest.models.dtos;

import java.util.UUID;

public record GetExpenseCategoryDto(int id, UUID userId, String name, String description, float budget) {
}
