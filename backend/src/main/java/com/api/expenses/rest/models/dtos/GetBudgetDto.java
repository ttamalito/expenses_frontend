package com.api.expenses.rest.models.dtos;

import com.api.expenses.rest.models.ExpenseCategory;

import java.util.List;

public record GetBudgetDto(List<ExpenseCategory> budget) {
}
