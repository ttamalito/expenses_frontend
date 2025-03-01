package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.AuthenticationHelper;
import com.api.expenses.rest.models.Income;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class IncomesControllerTestsIT {

    private final MockMvc mockMvc;

    @Autowired
    public IncomesControllerTestsIT(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }
    @Test
    @DisplayName("Add income and delete it")
    public void addIncomeAndDeleteIt() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );

        String incomeAsJsonString = new String (Files.readAllBytes(Path.of("src/test/resources/incomes/validIncomeToAdd.json")));

        ResultActions result = mockMvc.perform(post("/incomes/add")
                .header("Authorization",bearerToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(incomeAsJsonString)
        ).andExpect(status().isOk());

        String incomeId = result.andReturn().getResponse().getContentAsString().split(":")[1].replace("\"", "").replace("}", "");

        ResultActions incomeFetchResult = mockMvc.perform(get("/incomes/get/" + incomeId)
                .header("Authorization",bearerToken)
        ).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON));

        String incomeFetchResultString = incomeFetchResult.andReturn().getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        Income income = objectMapper.readValue(incomeFetchResultString, Income.class);

        assertEquals(1000.32f, income.getAmount());
        assertEquals("2025-01-05", income.getDate().toString());
        assertEquals(1, income.getCategoryId());
        assertEquals(3, income.getCurrencyId());
        assertEquals("Test income description", income.getDescription());
        assertEquals(2, income.getWeek());
        assertEquals(2025, income.getYear());
        assertEquals(1, income.getMonth());

        mockMvc.perform(delete("/incomes/delete/" + incomeId)
                .header("Authorization",bearerToken)
        ).andExpect(status().isNoContent());

    }
}
