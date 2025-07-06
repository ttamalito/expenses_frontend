package com.api.expenses.rest.models.dtos;

import java.util.UUID;

public record GetIncomeCategoryDto(int id, UUID userId, String name, String description) {
}
