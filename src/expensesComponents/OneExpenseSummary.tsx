import React from 'react';
import OneExpenseSummaryTypeDeclaration
    from "./utils/types/OneExpenseSummaryType";

interface IExpense {
    expense: OneExpenseSummaryTypeDeclaration
}

export default function OneExpenseSummary({expense}: IExpense) {


    const total = `Amount: ${expense.amount}`;
    const type = `Type: ${expense.type}`;
    const notes = `Notes: ${expense.notes}`;
    const date = `Date: ${expense.date}`;
    const div = <div>{total} {type} {notes} {date}</div>
    const id = expense._id;
    return div;
}