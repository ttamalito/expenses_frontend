import React from "react";
import OneExpenseSummaryTypeDeclaration from "../../expensesComponents/utils/types/OneExpenseSummaryType";
import {IExpenseItem} from "./types";
import {CalendarDateRegular, DocumentRegular, PeopleRegular, MoneyFilled} from "@fluentui/react-icons";

/**
 * This function transforms an array of expense summaries into a format suitable for a data grid component.
 * It calculates the total amount spent and populates an array of expense items with relevant information.
 *
 * @param expenses - An array of expense summaries, each containing details such as amount, type, date, etc.
 * @returns An array of expense items, each containing the transformed data for display in the data grid.
 */
export function createExpensesForDataGrid(expenses: OneExpenseSummaryTypeDeclaration[]): IExpenseItem[] {
    let totalSpent = 0;
    const items = expenses.map(expense => {

            // add it to the total spent
            const spent = parseFloat(expense.amount);
            console.log(expense.amount);
            console.log(expense._id);
            totalSpent += spent;
            const total = `Amount: ${expense.amount}`;
            const type = `Type: ${expense.type}`;
            const notes = `Notes: ${expense.notes}`;
            const date = `Date: ${expense.date}`;
            const item: IExpenseItem = {
                id: expense._id,
                amount: {label: spent, icon: <MoneyFilled/>},
                type: {label: expense.type, icon: <PeopleRegular/>},
                date: {label: expense.date, icon: <CalendarDateRegular/>},
                lastUpdated: {label: "7h ago", timestamp: 1},
            }
            return item;
        }
    );

    return items;

}