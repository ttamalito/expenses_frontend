package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.AuthenticationHelper;
import com.api.expenses.rest.models.ExpenseCategory;
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
import java.util.Optional;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class CategoriesControllerIT {
    private final MockMvc mockMvc;

    @Autowired
    public CategoriesControllerIT(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    @DisplayName("Add Expense Category and Delete it")
    public void addExpenseCategoryAndDeleteIt() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );

        String categoryAsString = new String (Files.readAllBytes(Path.of("src/test/resources/categories/expense/validCategory.json")));

        ResultActions result = mockMvc.perform(put("/category/expense/create")
                .header("Authorization",bearerToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(categoryAsString)
        ).andExpect(status().isOk());

        String categoryId = result.andReturn().getResponse().getContentAsString();

        ResultActions categoryFetchResult = mockMvc.perform(get("/category/expense/get/" + categoryId)
                .header("Authorization",bearerToken)
        ).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON));

        String categoryFetchResultString = categoryFetchResult.andReturn().getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        ExpenseCategory expenseCategory = objectMapper.readValue(categoryFetchResultString, ExpenseCategory.class);

        assertEquals(1500.25f, expenseCategory.getBudget());
        assertEquals("Test description", expenseCategory.getDescription());
        assertEquals("Category to delete", expenseCategory.getName());
        assertEquals(categoryId, String.valueOf(expenseCategory.getId()));
        assertEquals("d229217c-d721-4116-9cd2-3dfe03360439", expenseCategory.getUserId().toString());

        mockMvc.perform(delete("/category/expense/delete/" + categoryId)
                .header("Authorization",bearerToken)
        ).andExpect(status().isNoContent());
    }
}
