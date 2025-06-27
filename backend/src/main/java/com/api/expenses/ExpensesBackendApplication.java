package com.api.expenses;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
@SpringBootApplication
public class ExpensesBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpensesBackendApplication.class, args);
	}

}
