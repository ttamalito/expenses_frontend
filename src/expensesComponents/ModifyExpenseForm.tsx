import OneExpenseSummaryTypeDeclaration
    from "./utils/types/OneExpenseSummaryType";
import React from "react";
import { Button } from "@fluentui/react-components";
interface IExpense {
    expense: OneExpenseSummaryTypeDeclaration
    setShowModifyForm: (cancelModification: boolean) => void
}

export default function ModifyExpenseForm({expense, setShowModifyForm}: IExpense) {
    const expenseForm =  <form>
        <input type="text" placeholder={'amount'} name={'amount'} defaultValue={expense.amount}/>
        <br/>
        <input type="text" placeholder={'date'} name={'date'} defaultValue={expense.date}/>
        <br/>
        <input type="text" placeholder={'type'} name={'type'} defaultValue={expense.type} readOnly={true}/>
        <br/>
        <input type="text" placeholder={'notes'} name={'notes'} defaultValue={expense.notes}/>
        <br/>
        <Button type={'submit'}>Modify</Button>
    </form>

    const cancelModificationButton = <Button onClick={() => {setShowModifyForm(false)}}>Cancel</Button>
    return <div>{expenseForm} {cancelModificationButton}</div>

}


function modifyExpense(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('modifying expense');
}