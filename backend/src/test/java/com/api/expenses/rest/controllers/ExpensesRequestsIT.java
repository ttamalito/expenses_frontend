package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.AuthenticationHelper;
import com.api.expenses.rest.models.Expense;
import com.api.expenses.rest.models.requestsModels.AddExpenseRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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
        ObjectMapper objectMapper = new ObjectMapper();
        List<AddExpenseRequest> expenses = new ArrayList<>();
        List<Integer> expenseIds = sendAndSaveExpenses(bearerToken, "src/test/resources/expensesForAMonth.json", expenses);
        // TODO: add a request with an expense that is not in the month and year
        // this needs to be done in a different json file.

        ResultActions savedExpense = mockMvc.perform(MockMvcRequestBuilders.get("/expenses/monthly/1/2025")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk());
        String expensesJson = savedExpense.andReturn().getResponse().getContentAsString();
        List<Expense> expensesFromServer = objectMapper.readValue(expensesJson, objectMapper.getTypeFactory().constructCollectionType(List.class, Expense.class));

        assertEquals(expenses.size(), expensesFromServer.size());
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

    @DisplayName("Expenses for a single month and a single category")
    @Test
    public void getExpensesForAMonthAndACategory() throws Exception {        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                    "coding.tamalito@gmail.com"),
            Optional.empty(),
            "123456"
    );
        ObjectMapper objectMapper = new ObjectMapper();
        List<AddExpenseRequest> expensesToBeQueried = new ArrayList<>();
        List<Integer> expenseIds = sendAndSaveExpenses(bearerToken,
                "src/test/resources/expensesOfATypeForAMonthFiles/expensesToBeQueried.json", expensesToBeQueried);

        // add expenses that should not be queried
        List<AddExpenseRequest> expensesToSendAndIgnore = new ArrayList<>();
        List<Integer> expenseIdsToIgnore = sendAndSaveExpenses(bearerToken,
                "src/test/resources/expensesOfATypeForAMonthFiles/expensesOfATypeForAMonth.json", expensesToSendAndIgnore);

        // query the expenses
        ResultActions savedExpense = mockMvc.perform(MockMvcRequestBuilders.get("/expenses/single-type/1/2025?categoryId=8")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk());
        String expensesJson = savedExpense.andReturn().getResponse().getContentAsString();
        List<Expense> expensesFromServer = objectMapper.readValue(expensesJson, objectMapper.getTypeFactory().constructCollectionType(List.class, Expense.class));
        assertEquals(expensesToBeQueried.size(), expensesFromServer.size()); // should be 2

        // compare the expeses that were sent to the server with the ones that were received
        for (int i = 0; i < expensesToBeQueried.size(); i++) {
            int expenseId = expenseIds.get(i);
            AddExpenseRequest sentExpense = expensesToBeQueried.get(i);
            Optional<Expense> receivedExpenseOptional = expensesFromServer.stream().filter(expense -> expense.getId() == expenseId).findAny();
            assertTrue(receivedExpenseOptional.isPresent());
            Expense receivedExpense = receivedExpenseOptional.get();
            assertEquals(sentExpense.getAmount(), receivedExpense.getAmount());
            assertEquals(sentExpense.getCategoryId(), receivedExpense.getCategory().getId());
            assertEquals(sentExpense.getDate().toString(), receivedExpense.getDate().toString());
            assertEquals(sentExpense.getDescription(), receivedExpense.getDescription());
            assertEquals(1, receivedExpense.getMonth());
            assertEquals(2025, receivedExpense.getYear());
        }

        // delete the expenses
        for (int expenseId : expenseIds) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
        for (int expenseId : expenseIdsToIgnore) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }

    }

    @DisplayName("Expenses for a single year")
    @Test
    public void getExpensesForAYear() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );
        ObjectMapper objectMapper = new ObjectMapper();
        List<AddExpenseRequest> expensesToBeQueried = new ArrayList<>();
        List<Integer> expenseIds = sendAndSaveExpenses(bearerToken,
                "src/test/resources/getExpensesForAYear/expensesToBeQueried.json", expensesToBeQueried);

        // add expenses that should not be queried
        List<AddExpenseRequest> expensesToSendAndIgnore = new ArrayList<>();
        List<Integer> expenseIdsToIgnore = sendAndSaveExpenses(bearerToken,
                "src/test/resources/getExpensesForAYear/expensesForAYear.json", expensesToSendAndIgnore);

        // query the expenses
        ResultActions savedExpense = mockMvc.perform(MockMvcRequestBuilders.get("/expenses/yearly/2025")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk());
        String expensesJson = savedExpense.andReturn().getResponse().getContentAsString();
        List<Expense> expensesFromServer = objectMapper.readValue(expensesJson, objectMapper.getTypeFactory().constructCollectionType(List.class, Expense.class));
        assertEquals(expensesToBeQueried.size(), expensesFromServer.size()); // should be 2

        // compare the expeses that were sent to the server with the ones that were received
        for (int i = 0; i < expensesToBeQueried.size(); i++) {
            int expenseId = expenseIds.get(i);
            AddExpenseRequest sentExpense = expensesToBeQueried.get(i);
            Optional<Expense> receivedExpenseOptional = expensesFromServer.stream().filter(expense -> expense.getId() == expenseId).findAny();
            assertTrue(receivedExpenseOptional.isPresent());
            Expense receivedExpense = receivedExpenseOptional.get();
            assertEquals(sentExpense.getAmount(), receivedExpense.getAmount());
            assertEquals(sentExpense.getCategoryId(), receivedExpense.getCategory().getId());
            assertEquals(sentExpense.getDate().toString(), receivedExpense.getDate().toString());
            assertEquals(sentExpense.getDescription(), receivedExpense.getDescription());
            if (sentExpense.getAmount() == 102) {
                assertEquals(9, receivedExpense.getMonth());
            } else {
                assertEquals(11, receivedExpense.getMonth());
            }
            assertEquals(2025, receivedExpense.getYear());
        }

        // delete the expenses
        for (int expenseId : expenseIds) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
        for (int expenseId : expenseIdsToIgnore) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
    }

    @DisplayName("Expenses of a type for a single year")
    @Test
    public void getExpensesOfATypeForAYear() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );
        ObjectMapper objectMapper = new ObjectMapper();
        List<AddExpenseRequest> expensesToBeQueried = new ArrayList<>();
        List<Integer> expenseIds = sendAndSaveExpenses(bearerToken,
                "src/test/resources/expensesForAYearOfAType/expensesToBeQueried.json", expensesToBeQueried);

        // add expenses that should not be queried
        List<AddExpenseRequest> expensesToSendAndIgnore = new ArrayList<>();
        List<Integer> expenseIdsToIgnore = sendAndSaveExpenses(bearerToken,
                "src/test/resources/expensesForAYearOfAType/expensesOfATypeForAYear.json", expensesToSendAndIgnore);

        // query the expenses
        ResultActions savedExpense = mockMvc.perform(MockMvcRequestBuilders.get("/expenses/single-type?year=2025&categoryId=8")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk());
        String expensesJson = savedExpense.andReturn().getResponse().getContentAsString();
        List<Expense> expensesFromServer = objectMapper.readValue(expensesJson, objectMapper.getTypeFactory().constructCollectionType(List.class, Expense.class));
        assertEquals(expensesToBeQueried.size(), expensesFromServer.size()); // should be 2

        // compare the expeses that were sent to the server with the ones that were received
        for (int i = 0; i < expensesToBeQueried.size(); i++) {
            int expenseId = expenseIds.get(i);
            AddExpenseRequest sentExpense = expensesToBeQueried.get(i);
            Optional<Expense> receivedExpenseOptional = expensesFromServer.stream().filter(expense -> expense.getId() == expenseId).findAny();
            assertTrue(receivedExpenseOptional.isPresent());
            Expense receivedExpense = receivedExpenseOptional.get();
            assertEquals(sentExpense.getAmount(), receivedExpense.getAmount());
            assertEquals(sentExpense.getCategoryId(), receivedExpense.getCategory().getId());
            assertEquals(sentExpense.getDate().toString(), receivedExpense.getDate().toString());
            assertEquals(sentExpense.getDescription(), receivedExpense.getDescription());
            if (sentExpense.getAmount() == 102) {
                assertEquals(9, receivedExpense.getMonth());
            } else {
                assertEquals(11, receivedExpense.getMonth());
            }
            assertEquals(2025, receivedExpense.getYear());
        }

        // delete the expenses
        for (int expenseId : expenseIds) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
        for (int expenseId : expenseIdsToIgnore) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
    }

    @DisplayName("Total spent on a year without decimals")
    @Test
    public void getTotalSpentOnAYear() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );
        List<AddExpenseRequest> expensesForTheYear = new ArrayList<>();
        List<Integer> expenseIds = sendAndSaveExpenses(bearerToken,
                "src/test/resources/totalSpentOnYear.json", expensesForTheYear);

        ResultActions savedExpense = mockMvc.perform(MockMvcRequestBuilders.get("/expenses/total-spent?year=2025")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(content().json("{\"totalSpent\": 400.0}"));

        String totalSpentJson = savedExpense.andReturn().getResponse().getContentAsString();
        assertEquals("{\"totalSpent\":400.0}", totalSpentJson);

        // delete the expenses
        for (int expenseId : expenseIds) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
    }

    @DisplayName("Total spent on a year with decimals")
    @Test
    public void getTotalSpentOnAYearWithDecimals() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );
        List<AddExpenseRequest> expensesForTheYear = new ArrayList<>();
        List<Integer> expenseIds = sendAndSaveExpenses(bearerToken,
                "src/test/resources/totalSpentOnAYearWithDecimals.json", expensesForTheYear);

        ResultActions savedExpense = mockMvc.perform(MockMvcRequestBuilders.get("/expenses/total-spent?year=2025")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(content().json("{\"totalSpent\": 409.81}"));

        String totalSpentJson = savedExpense.andReturn().getResponse().getContentAsString();
        assertEquals("{\"totalSpent\":409.81}", totalSpentJson);

        // delete the expenses
        for (int expenseId : expenseIds) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
    }

    @DisplayName("Total spent on a month with decimals")
    @Test
    public void getTotalSpentOnAMonthWithDecimals() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );
        List<AddExpenseRequest> expensesSentToServer = new ArrayList<>();
        List<Integer> expenseIds = sendAndSaveExpenses(bearerToken,
                "src/test/resources/totalSpentMonthlyWithDecimals.json", expensesSentToServer);

        ResultActions savedExpense = mockMvc.perform(MockMvcRequestBuilders.get("/expenses/total-spent/monthly?year=2025&month=6")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(content().json("{\"totalSpent\": 409.81}"));

        String totalSpentJson = savedExpense.andReturn().getResponse().getContentAsString();
        assertEquals("{\"totalSpent\":409.81}", totalSpentJson);

        // delete the expenses
        for (int expenseId : expenseIds) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
    }

    @DisplayName("Total spent on a month in a category")
    @Test
    public void getTotalSpentOnAMonthInACategory() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );
        List<AddExpenseRequest> expensesSentToServer = new ArrayList<>();
        List<Integer> expenseIds = sendAndSaveExpenses(bearerToken,
                "src/test/resources/totalSpentMonthlyOnACategory.json", expensesSentToServer);

        ResultActions savedExpense = mockMvc.perform(MockMvcRequestBuilders.get("/expenses/total-spent/monthly/7?year=2025&month=6")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(content().json("{\"totalSpent\": 200.32}"));

        String totalSpentJson = savedExpense.andReturn().getResponse().getContentAsString();
        assertEquals("{\"totalSpent\":200.32}", totalSpentJson);

        // delete the expenses
        for (int expenseId : expenseIds) {
            mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                            .header("Authorization", bearerToken))
                    .andExpect(status().isNoContent());
        }
    }

    @DisplayName("Modify an expense")
    @Test
    public void modifyExpense() throws Exception {
        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of(
                        "coding.tamalito@gmail.com"),
                Optional.empty(),
                "123456"
        );

        String json = new String(Files.readAllBytes(Path.of("src/test/resources/expenses/expense.json")));

        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/expenses/add")
                        .header("Authorization", bearerToken)
                        .contentType("application/json")
                        .content(json))
                .andExpect(status().isOk());
        String expenseId = result.andReturn().getResponse().getContentAsString();

        ResultActions expensesForTheMonthResult = mockMvc.perform(MockMvcRequestBuilders.get("/expenses/monthly/1/2025")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk());
        String expensesForTheMonthJson = expensesForTheMonthResult.andReturn().getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        List<Expense> expensesForTheMonth = objectMapper.readValue(expensesForTheMonthJson, objectMapper.getTypeFactory().constructCollectionType(List.class, Expense.class));

        assertEquals(1, expensesForTheMonth.size());
        Expense expense = expensesForTheMonth.get(0);
        expense.setAmount(205.10f);
        expense.setDescription("Modified description");


        mockMvc.perform(MockMvcRequestBuilders.post("/expenses/modify")
                        .header("Authorization", bearerToken)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(expense)))
                .andExpect(status().isNoContent());



        expensesForTheMonthResult = mockMvc.perform(MockMvcRequestBuilders.get("/expenses/monthly/1/2025")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk());

        expensesForTheMonthJson = expensesForTheMonthResult.andReturn().getResponse().getContentAsString();
        expensesForTheMonth = objectMapper.readValue(expensesForTheMonthJson, objectMapper.getTypeFactory().constructCollectionType(List.class, Expense.class));
        assertEquals(1, expensesForTheMonth.size());
        Expense modifiedExpense = expensesForTheMonth.get(0);
        assertEquals(205.10f, modifiedExpense.getAmount());
        assertEquals("Modified description", modifiedExpense.getDescription());

        mockMvc.perform(MockMvcRequestBuilders.delete("/expenses/delete?expenseId=" + expenseId)
                        .header("Authorization", bearerToken))
                .andExpect(status().isNoContent());
    }
    // TODO: add test to modify the category of an expense



    /**
     * Reads the expenses from a file and sends them to the server
     * It populates the expenses list with the expenses that were sent to the server
     *
     * @param bearerToken          the token to authenticate the user
     * @param pathToListOfExpenses the path to the file that contains the expenses
     * @param expenses             the list of expenses that will be populated with the expenses that were sent to the server
     * @return the ids of the expenses that were sent to the server
     * @throws IOException
     */
    private List<Integer> sendAndSaveExpenses(String bearerToken, String pathToListOfExpenses, List<AddExpenseRequest> expenses) throws Exception {
        String expensesAsJson = new String(Files.readAllBytes(Path.of(pathToListOfExpenses)));
        ObjectMapper objectMapper = new ObjectMapper();
        List<AddExpenseRequest> serializedExpenses = objectMapper.readValue(expensesAsJson, objectMapper.getTypeFactory().constructCollectionType(List.class, AddExpenseRequest.class));
        expenses.addAll(serializedExpenses);

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
        return expenseIds;
    }


}
