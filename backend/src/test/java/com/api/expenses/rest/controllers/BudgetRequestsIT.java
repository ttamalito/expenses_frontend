package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.AuthenticationHelper;
import com.api.expenses.rest.models.ExpenseCategory;
import com.api.expenses.rest.models.dtos.GetBudgetDto;
import com.api.expenses.rest.models.dtos.UpdateBudgetDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class BudgetRequestsIT {

    private final MockMvc mockMvc;

    @Autowired
    public BudgetRequestsIT(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    @DisplayName("Modify the budget")
    public void modifyBudget() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );

        String categoryAsString = new String (Files.readAllBytes(Path.of("src/test/resources/budget/createCategories.json")));

        ResultActions result = mockMvc.perform(put("/category/expense/create")
                .header("Authorization",bearerToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(categoryAsString)
        ).andExpect(status().isOk());

        String categoryId1 = result.andReturn().getResponse().getContentAsString();
        int categoryId1Int = Integer.parseInt(categoryId1);

        ResultActions result2 = mockMvc.perform(put("/category/expense/create")
                .header("Authorization",bearerToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(categoryAsString)
        ).andExpect(status().isOk());

        String categoryId2 = result2.andReturn().getResponse().getContentAsString();
        int categoryId2Int = Integer.parseInt(categoryId2);

        List<UpdateBudgetDto> newBudgets = new ArrayList<>();
        newBudgets.add(new UpdateBudgetDto(categoryId1Int, 1f));
        newBudgets.add(new UpdateBudgetDto(categoryId2Int, 100f));

        String json = new ObjectMapper().writeValueAsString(newBudgets);

        ResultActions modifyBudgetFetchResult = mockMvc.perform(post("/budget/modify")
                .header("Authorization",bearerToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
        ).andExpect(status().isNoContent());

        ResultActions budgetFetchResult = mockMvc.perform(get("/budget")
                .header("Authorization",bearerToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
        ).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON));

        String newBudgetAsString = budgetFetchResult.andReturn().getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        GetBudgetDto budgetDto = objectMapper.readValue(newBudgetAsString, GetBudgetDto.class);

        List<ExpenseCategory> categories = budgetDto.budget();
        for (ExpenseCategory expenseCategory : categories) {
            if (expenseCategory.getId() == categoryId1Int) {
                assertEquals(1f, expenseCategory.getBudget());
            } else if (expenseCategory.getId() == categoryId2Int) {
                assertEquals(100f, expenseCategory.getBudget());
            }
        }
        mockMvc.perform(delete("/category/expense/delete/" + categoryId1)
                .header("Authorization",bearerToken)
        ).andExpect(status().isNoContent());
        mockMvc.perform(delete("/category/expense/delete/" + categoryId2)
                .header("Authorization",bearerToken)
        ).andExpect(status().isNoContent());
    }

}
