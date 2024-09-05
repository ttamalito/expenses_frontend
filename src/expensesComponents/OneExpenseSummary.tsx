import React from 'react';
import OneExpenseSummaryTypeDeclaration
    from "./utils/types/OneExpenseSummaryType";
import {Button} from "@fluentui/react-components";
import ModifyExpenseForm
    from "./ModifyExpenseForm";

interface IExpense {
    expense: OneExpenseSummaryTypeDeclaration
}

export default function OneExpenseSummary({expense}: IExpense) {

    const [showModifyForm, setShowModifyForm] = React.useState(false);

    const modifyExpenseButton = <Button onClick={() => {setShowModifyForm(true) }}>Modify Expense</Button>


    const total = `Amount: ${expense.amount}`;
    const type = `Type: ${expense.type}`;
    const notes = `Notes: ${expense.notes}`;
    const date = `Date: ${expense.date}`;
    const div = <div>{total} {type} {notes} {date} <br/> {modifyExpenseButton} </div>
    const id = expense._id;
    return showModifyForm ? <ModifyExpenseForm expense={expense} setShowModifyForm={setShowModifyForm}/> : div;
}



