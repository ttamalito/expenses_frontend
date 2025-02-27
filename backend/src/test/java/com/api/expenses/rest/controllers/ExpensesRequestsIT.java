package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.AuthenticationHelper;
import com.api.expenses.rest.models.Expense;
import com.api.expenses.rest.models.requestsModels.AddExpenseRequest;
import com.api.expenses.rest.models.requestsModels.UserSignupRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ExpensesRequestsIT {

    private final MockMvc mockMvc;

    @Autowired
    public ExpensesRequestsIT(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    public void addAndDeleteValidExpense() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );

        String json = new String(Files.readAllBytes(Path.of("src/test/resources/validExpenseToAdd.json")));

        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/expenses/add")
                .header("Authorization", bearerToken)
                .contentType("application/json")
                .content(json))
                .andExpect(status().isOk());
        String expenseId = result.andReturn().getResponse().getContentAsString();
        System.out.println("Expense ID: " + expenseId);

        mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                .header("Authorization", bearerToken))
                .andExpect(status().isNoContent());
    }

    @DisplayName("Expenses for a single month")
    @Test
    public void getExpensesForAMonth() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );
        String json = new String(Files.readAllBytes(Path.of("src/test/resources/expensesForAMonth.json")));
        ObjectMapper objectMapper = new ObjectMapper();
        List<AddExpenseRequest> expenses = objectMapper.readValue(json, objectMapper.getTypeFactory().constructCollectionType(List.class, AddExpenseRequest.class));

        List<Integer> expenseIds = new ArrayList<>();
        for (AddExpenseRequest expense : expenses) {
            ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/expenses/add")
                            .header("Authorization", bearerToken)
                            .contentType("application/json")
                            .content(objectMapper.writeValueAsString(expense)))
                    .andExpect(status().isOk());
            String expenseId = result.andReturn().getResponse().getContentAsString();
            expenseIds.add(Integer.parseInt(expenseId));
        }

        ResultActions savedExpense = mockMvc.perform(MockMvcRequestBuilders.get("/expenses/monthly/1/2025")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk());
        String expensesJson = savedExpense.andReturn().getResponse().getContentAsString();
        List<Expense> expensesFromServer = objectMapper.readValue(expensesJson, objectMapper.getTypeFactory().constructCollectionType(List.class, Expense.class));

        assertTrue(expenses.size() == expensesFromServer.size());
        // compare the expeses that were sent to the server with the ones that were received
        for (int i = 0; i < expenses.size(); i++) {
            int expenseId = expenseIds.get(i);
            AddExpenseRequest sentExpense = expenses.get(i);
            Optional<Expense> receivedExpenseOptional = expensesFromServer.stream().filter(expense -> expense.getId() == expenseId).findAny();
            assertTrue(receivedExpenseOptional.isPresent());
            Expense receivedExpense = receivedExpenseOptional.get();
            assertEquals(sentExpense.getAmount(), receivedExpense.getAmount());
            assertEquals(sentExpense.getCategoryId(), receivedExpense.getCategory().getId());
            assertEquals(sentExpense.getDate().toString(), receivedExpense.getDate().toString());
            assertEquals(sentExpense.getDescription(), receivedExpense.getDescription());
            assertTrue(1 == receivedExpense.getMonth());
            assertTrue(2025 == receivedExpense.getYear());
            assertTrue(receivedExpense.getWeek() > 0);
        }

        for (int expenseId : expenseIds) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
    }

}
