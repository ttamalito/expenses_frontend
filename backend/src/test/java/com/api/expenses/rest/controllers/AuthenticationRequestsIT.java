package com.api.expenses.rest.controllers;

import com.api.expenses.rest.controllers.utils.AuthenticationHelper;
import com.api.expenses.rest.models.requestsModels.UserSignupRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Optional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthenticationRequestsIT {

    private final MockMvc mockMvc;

    @Autowired
    public AuthenticationRequestsIT(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    public void testPing() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/auth/ping"))
                .andExpect(status().isOk())
                .andExpect(content().string("Pong"));
    }

//    @DisplayName("POST /auth/login")
//    @Test
//    public void testLoginAndLogOut() throws Exception {
//
//        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of("coding.tamalito@gmail.com"), Optional.empty(), "123456");
//        this.mockMvc.perform(MockMvcRequestBuilders.post("/auth/logout")
//                .header("Authorization", bearerToken))
//                .andExpect(status().isOk());
//    }

    @Test
    public void signUp() throws Exception {
        UserSignupRequest userSignupRequest = new UserSignupRequest("test", "test", "test", "test@test.com");
        String json = new ObjectMapper().writeValueAsString(userSignupRequest);
        String jwtToken = mockMvc.perform(MockMvcRequestBuilders.post("/auth/signup")
                .contentType("application/json")
                .content(json))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString().split(":")[1].replace("\"", "").replace("}", "");

        String bearerToken = AuthenticationHelper.loginUser(mockMvc, Optional.of("test@test.com"), Optional.empty(), "test");


        mockMvc.perform(MockMvcRequestBuilders.delete("/user/delete/test")
                .header("Authorization", bearerToken))
                .andExpect(status().isOk());
    }


}
