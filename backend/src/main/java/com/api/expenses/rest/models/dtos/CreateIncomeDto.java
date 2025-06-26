package com.api.expenses.rest.models.dtos;

import java.sql.Date;

public record CreateIncomeDto(int categoryId, float amount, Date date, int currencyId, String description) {
}
