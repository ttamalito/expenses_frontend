
import React from "react";
import OneExpenseSummaryTypeDeclaration from "../../../expensesComponents/utils/types/OneExpenseSummaryType";
import {modifyOneExpensePath} from "../../../expensesComponents/requests/paths";

interface IEditExpenseFormProps {
    expense?: OneExpenseSummaryTypeDeclaration
}

export default function EditExpenseForm({expense}: IEditExpenseFormProps) {

    const expenseForm = <form onSubmit={(event) =>
        modifyExpense(event, expense?._id)}>
        <input type="text" placeholder={'amount'} name={'amount'} defaultValue={expense?.amount}/>
        <br/>

        <input type={'date'} placeholder={'date'} name={'date'} defaultValue={expense?.date}/>
        <input type="text" placeholder={'type'} name={'type'} defaultValue={expense?.type}
               readOnly={true}/>
        <br/>
        <input type="text" placeholder={'notes'} name={'notes'} defaultValue={expense?.notes}/>
        <br/>
    </form>

    return (
        <>{expenseForm}</>

    );

}


function modifyExpense(event: React.FormEvent<HTMLFormElement>, id?: string) {
    event.preventDefault();
    console.log('modifying expense');
    const formData = new FormData(event.currentTarget);

    // create the urlParams
    const urlData = new URLSearchParams();
    for (const pair of formData) {
        console.log(pair[0], pair[1]);
        urlData.append(pair[0], pair[1].toString());
    }

    const url = modifyOneExpensePath(id as string);

    fetch(url, {
        method: 'POST',
        redirect: 'follow',
        body: urlData,
        credentials: 'include'
    }).then(response => {
        if (response.ok) {
            alert('Expense modified successfully - Reload page to see changes');
        } else {
            alert('There was an error modifying the expense - see backend logs');
        }
    })
}