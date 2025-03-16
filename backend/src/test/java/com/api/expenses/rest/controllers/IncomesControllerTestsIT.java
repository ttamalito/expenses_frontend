package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.AuthenticationHelper;
import com.api.expenses.rest.models.Income;
import com.api.expenses.rest.models.requestsModels.AddIncomeRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.IOException;
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


    @Test
    @DisplayName("Test total earned in a year")
    public void totalEarnedInAYearTest() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );
        List<AddIncomeRequest> incomeRequestList = new ArrayList<>();
        List<Integer> incomesIds = sendAndSaveIncomes(bearerToken,
                "src/test/resources/incomes/totalEarnedYear/totalEarnedYear.json", incomeRequestList);

        ResultActions savedExpense = mockMvc.perform(MockMvcRequestBuilders.get("/incomes/total-earned/year?year=2025")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(content().json("{\"total\": 1002.49}"));

        String totalSpentJson = savedExpense.andReturn().getResponse().getContentAsString();
        assertEquals("{\"total\": 1002.49}", totalSpentJson);

        // delete the incomes
        for (int incomeId : incomesIds) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/incomes/delete/" + incomeId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
    }

    @Test
    @DisplayName("Test total earned in a month")
    public void totalEarnedInAMonthTest() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );
        List<AddIncomeRequest> incomeRequestList = new ArrayList<>();
        List<Integer> incomesIds = sendAndSaveIncomes(bearerToken,
                "src/test/resources/incomes/totalEarnedMonth/totalEarnedMonth.json", incomeRequestList);

        ResultActions savedExpense = mockMvc.perform(MockMvcRequestBuilders.get("/incomes/total-earned/month?year=2025&month=1")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(content().json("{\"total\": 1002.49}"));

        String totalSpentJson = savedExpense.andReturn().getResponse().getContentAsString();
        assertEquals("{\"total\": 1002.49}", totalSpentJson);

        // delete the incomes
        for (int incomeId : incomesIds) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/incomes/delete/" + incomeId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
    }

    /**
     * Reads the incomes from a file and sends them to the server
     * It populates the incomes list with the incomes that were sent to the server
     *
     * @param bearerToken          the token to authenticate the user
     * @param pathToListOfIncomes the path to the file that contains the incomes
     * @param incomes             the list of incomes that will be populated with the incomes that were sent to the server
     * @return the ids of the incomes that were sent to the server
     * @throws IOException
     */
    private List<Integer> sendAndSaveIncomes(String bearerToken, String pathToListOfIncomes, List<AddIncomeRequest> incomes) throws Exception {
        String expensesAsJson = new String(Files.readAllBytes(Path.of(pathToListOfIncomes)));
        ObjectMapper objectMapper = new ObjectMapper();
        List<AddIncomeRequest> serializedIncomes = objectMapper.readValue(expensesAsJson, objectMapper.getTypeFactory().constructCollectionType(List.class, AddIncomeRequest.class));
        incomes.addAll(serializedIncomes);

        List<Integer> incomesIds = new ArrayList<>();
        for (AddIncomeRequest income : incomes) {
            ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/incomes/add")
                            .header("Authorization", bearerToken)
                            .contentType("application/json")
                            .content(objectMapper.writeValueAsString(income)))
                    .andExpect(status().isOk());
            String incomeId = result.andReturn().getResponse().getContentAsString().split(":")[1].replace("\"", "").replace("}", "").replace(" ", "");
            incomesIds.add(Integer.parseInt(incomeId));
        }
        return incomesIds;
    }
}
