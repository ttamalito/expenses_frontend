import OneExpenseSummaryTypeDeclaration
    from "./utils/types/OneExpenseSummaryType";
import {Button, Field, makeStyles } from "@fluentui/react-components";
import {DatePicker} from "@fluentui/react-datepicker-compat";
import React from "react";
import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent
} from "@fluentui/react-components";
import {modifyOneExpensePath} from "./requests/paths";
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
    //return <div>{expenseForm} {cancelModificationButton}</div>
    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                        exercitationem cumque repellendus eaque est dolor eius expedita
                        nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates
                        in natus iure cumque eaque?
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <Button appearance="primary">Do Something</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );

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

    const url = modifyOneExpensePath(id);

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