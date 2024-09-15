import OneExpenseSummaryTypeDeclaration
    from "./utils/types/OneExpenseSummaryType";
import {Button, Field, makeStyles } from "@fluentui/react-components";
import {DatePicker} from "@fluentui/react-datepicker-compat";
import React from "react";
interface IExpense {
    expense: OneExpenseSummaryTypeDeclaration
    setShowModifyForm: (cancelModification: boolean) => void
}
const useDateStyles = makeStyles({
    control: {
        maxWidth: "300px",
    },
});
export default function ModifyExpenseForm({expense, setShowModifyForm}: IExpense) {
    const dateStyles = useDateStyles();

    const expenseForm =  <form onSubmit={(event) =>
        modifyExpense(event, expense._id)} >
        <input type="text" placeholder={'amount'} name={'amount'} defaultValue={expense.amount}/>
        <br/>
        <Field label="Change the date">
            <DatePicker
                className={dateStyles.control}
                placeholder="Select a date..."
                name={'date'}
                value={new Date(expense.date)}
            />
        </Field>
        <input type="text" placeholder={'type'} name={'type'} defaultValue={expense.type} readOnly={true}/>
        <br/>
        <input type="text" placeholder={'notes'} name={'notes'} defaultValue={expense.notes}/>
        <br/>
        <Button type={'submit'}>Modify</Button>
    </form>

    const cancelModificationButton = <Button onClick={() => {setShowModifyForm(false)}}>Cancel</Button>
    return <div>{expenseForm} {cancelModificationButton}</div>

}


function modifyExpense(event: React.FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    console.log('modifying expense');
    const formData = new FormData(event.currentTarget);

    // create the urlParams
    const urlData = new URLSearchParams();
    for (const pair of formData) {
        console.log(pair[0], pair[1]);
        urlData.append(pair[0], pair[1].toString());
    }
    fetch('http://localhost:8080/expenses/modify' + '?id=' + id, {
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