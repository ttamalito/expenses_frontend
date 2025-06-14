package com.api.expenses.rest.services;

import com.api.expenses.rest.models.ExpenseCategory;
import com.api.expenses.rest.models.dtos.GetBudgetDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BudgetService {

    private final UserService userService;

    @Autowired
    public BudgetService(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get the budget for a user
     * It will return the string representation of a JSON object with the budget for each category <br>
     * The JSON object will have the following format: <br>
     * [ <br>
     * { <br>
     * "id": 1, <br>
     * "name": "category name", <br>
     * "description": "category description", <br>
     * "userId": "user id", <br>
     * "budget": 100.00 <br>
     * }, <br>
     * { <br>
     * "id": 2, <br>
     * "name": "category name", <br>
     * "description": "category description", <br>
     * "userId": "user id", <br>
     * "budget": 200.00 <br>
     * } <br>
     * ] <br>
     *
     * @param userId the user id
     * @return a string representation of a JSON object with the budget for each category
     */
    public String getBudgetForUserAsJsonString(UUID userId) throws JsonProcessingException {
        List<ExpenseCategory> categories = userService.getUserExpenseCategories(userId);
        GetBudgetDto budgetDto = new GetBudgetDto(categories);
        String budgetDtoAsString = new ObjectMapper().writeValueAsString(budgetDto);
        return budgetDtoAsString;
    }


    private String convertExpenseCategoriesToJSON(List<ExpenseCategory> categories) {

        StringBuilder json = new StringBuilder();
        json.append("[");

        for (int i = 0; i < categories.size(); i++) {
            ExpenseCategory category = categories.get(i);
            json.append("{");
            json.append("\"id\":").append(category.getId()).append(",");
            json.append("\"name\":\"").append(category.getName()).append("\",");
            json.append("\"userId\":\"").append(category.getUserId()).append("\",");
            json.append("\"description\":\"").append(category.getDescription()).append("\",");
            json.append("\"budget\":").append(String.format("%.2f", category.getBudget()));
            json.append("}");
            if (i < categories.size() - 1) {
                json.append(",");
            }
        }

        json.append("]");

        return json.toString();
    }
}
