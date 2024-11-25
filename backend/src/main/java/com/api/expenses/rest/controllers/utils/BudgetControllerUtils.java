package com.api.expenses.rest.controllers.utils;

import com.api.expenses.rest.models.ExpenseCategory;

import java.util.List;

public class BudgetControllerUtils {


    public static String convertExpenseCategoriesToJSON(List<ExpenseCategory> categories) {

        StringBuilder json = new StringBuilder();
        json.append("[");

        for (int i = 0; i < categories.size(); i++) {
            ExpenseCategory category = categories.get(i);
            json.append("{");
            json.append("\"id\":").append(category.getId()).append(",");
            json.append("\"name\":\"").append(category.getName()).append("\",");
            json.append("\"description\":\"").append(category.getDescription()).append("\",");
            json.append("\"budget\":").append(category.getBudget());
            json.append("}");
            if (i < categories.size() - 1) {
                json.append(",");
            }
        }

        json.append("]");

        return json.toString();
    }


}
