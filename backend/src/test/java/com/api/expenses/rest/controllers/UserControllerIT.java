package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.AuthenticationHelper;
import com.api.expenses.rest.models.Role;
import com.api.expenses.rest.models.User;
import com.api.expenses.rest.models.dtos.UpdateUserDto;
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

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerIT {
    private final MockMvc mockMvc;

    @Autowired
    public UserControllerIT(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    @DisplayName("Create, Read, update and delete user")
    public void crudUser() throws Exception {
        String createUserDtoJson = new String (Files.readAllBytes(Path.of("src/test/resources/user/createUser/createUserDto.json")));
        String jwtToken = mockMvc.perform(MockMvcRequestBuilders.post("/auth/signup")
                        .contentType("application/json")
                        .content(createUserDtoJson))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString().split(":")[1].replace("\"", "").replace("}", "");

        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of("test@test.com"), Optional.empty(), "test");

        ResultActions result = mockMvc.perform(get("/user/test")
                .header("Authorization",bearerToken)
        ).andExpect(status().isOk());

        String user = result.andReturn().getResponse().getContentAsString();
        User testUser = new ObjectMapper().readValue(user, User.class);

        assertEquals("test", testUser.getUsername());
        assertEquals("test@test.com", testUser.getEmail());
        assertEquals(Role.USER, testUser.getRole());
        assertEquals(1, testUser.getCurrencyId());
        UpdateUserDto updateUserDto = new UpdateUserDto("Testing", "Testing", 2);
        String updateUserDtoJson = new ObjectMapper().writeValueAsString(updateUserDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/user/update/test")
                        .header("Authorization",bearerToken)
        .contentType("application/json")
                .content(updateUserDtoJson)).andExpect(status().isOk());

        ResultActions result2 = mockMvc.perform(get("/user/test")
                .header("Authorization",bearerToken)
        ).andExpect(status().isOk());

        String user2 = result2.andReturn().getResponse().getContentAsString();
        User testUser2 = new ObjectMapper().readValue(user2, User.class);

        assertEquals("test", testUser2.getUsername());
        assertEquals("test@test.com", testUser2.getEmail());
        assertEquals(Role.USER, testUser2.getRole());
        assertEquals(1, testUser2.getCurrencyId()); // TODO: Currency cannot be updated yet, handle it later
        assertEquals("Testing", testUser2.getFirstName());
        assertEquals("Testing", testUser2.getLastName());

        mockMvc.perform(MockMvcRequestBuilders.delete("/user/delete/test")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk());
    }
}
