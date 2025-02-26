package com.api.expenses.rest.exceptions;

public class TransactionException extends Exception {
    public enum TransactionExceptionType {
        USER_NOT_FOUND("User not found in the database for the transaction"),
        CATEGORY_NOT_FOUND("Category not found in the database for the transaction"),
        CURRENCY_NOT_FOUND("Currency not found in the database for the transaction"),
        NEGATIVE_AMOUNT("Amount cannot be negative"),

        UNAUTHORIZED("User is trying to modify an expense that does not belong to him"),
        EXPENSE_NOT_FOUND("Expense not found in the database");

        private String message;

        TransactionExceptionType(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

    }

    private final TransactionExceptionType type;

    public TransactionException(TransactionExceptionType type) {
        super(type.getMessage());
        this.type = type;
    }

    public TransactionExceptionType getType() {
        return type;
    }
}
