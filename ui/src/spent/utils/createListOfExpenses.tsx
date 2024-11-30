import React from "react";

/**
 * Creates a list of expenses from the given array of expenses.
 *
 * @param {Array} expenses - An array of expenses to be converted into a list.
 * @return {{JSX.Element}, number} A JSX element representing the list of expenses and the total spent.
 */
export function createListOfExpenses(expenses: any[]) {
    let totalSpent = 0;
    const list = <ul>
        {expenses.map( expense =>

            {
                // add it to the total spent
                const spent = parseFloat(expense.amount);
                console.log(expense.amount);
                console.log(expense._id);
                totalSpent += spent;
                const total = `Amount: ${expense.amount}`;
                const type = `Type: ${expense.type}`;
                const notes = `Notes: ${expense.notes}`;
                const date = `Date: ${expense.date}`;
                const div = <div>{total} {type} {notes} {date}</div>
                return <li key={expense._id}>{div}</li>}
        )}
    </ul>;
    return {list: list, totalSpent: totalSpent};
}