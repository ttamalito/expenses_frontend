package com.api.expenses.rest.models.dtos;

import java.sql.Date;


public record CreateExpenseDto(int categoryId, float amount, int currencyId, Date date, String description) {
}
