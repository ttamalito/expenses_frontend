import types from "./utils/types";
import {goToLink} from "./utils/goToLinkFromForm";
import React from "react";
import {
    Button,
    Field,
    makeStyles,
    Radio,
    RadioGroup,
    Dropdown,
    Input,
    Option,
    Select,
    InfoLabel
} from "@fluentui/react-components";
import {ReceiptMoneyRegular, EyeRegular} from "@fluentui/react-icons";
import useButtonStyles from "./FluentStyles/baseButton";
import {DatePicker} from "@fluentui/react-datepicker-compat";
import ExpensesTypesTypesDeclarations from "./utils/expensesTypesTypesDeclarations";

const useDateStyles = makeStyles({
    control: {
        maxWidth: "300px",
    },
});

export default function Base() {
    const buttonStyles = useButtonStyles();

    let typeKey: keyof ExpensesTypesTypesDeclarations;
    const keysOfTypesOfTransactions : (keyof ExpensesTypesTypesDeclarations)[] = [
    ];
    const typesOfTransactions = [];

    for (typeKey in types) {
        keysOfTypesOfTransactions.push(typeKey);
        typesOfTransactions.push(types[typeKey]);
    }


    const dateStyles = useDateStyles();
    // setup the maximum for expenses and other settings
    const setUp = <a href={'/budget/setup'}>Modify your budget</a>
    // view the expenses
    const h2 = <h2>See expenses for a specific
        month</h2>
    const getExpenseForMonth = <form
        onSubmit={(event) => {
            expenseForAMonth(event)
        }}
    >
        <input type="number" placeholder={'month'}
               name={'month'}/>
        <input type="number" placeholder={'year'}
               name={'year'}/>
        <Button
                type={'submit'} icon={<EyeRegular />}>See
            Expenses</Button>
    </form>

    // add an expense
    const form = <form onSubmit={(event) => {
        submitData(event)
    }}>


        <input type="text"
               placeholder={'amount'}
               name={'amount'}
               autoComplete={'off'}/>
        <br/>
        <input type="number"
               placeholder={'month'}
               name={'month'}/>
        <input type="number"
               placeholder={'year'}
               name={'year'}/>
        <br/>
        <Field label="Select a date">
            <DatePicker
                className={dateStyles.control}
                placeholder="Select a date..."
                name={'date'}
            />
        </Field>
        <br/>

        <Field label="Expense of Income?">
            <RadioGroup layout="horizontal-stacked" name={'transaction'} required={true}>
                <Radio value="expense" label="Expense"/>
                <Radio value="income" label="Income"/>

            </RadioGroup>
        </Field>
        <br/>
        <InfoLabel info="Select one of the transaction types of the list down below" htmlFor={"transaction-type"}>
            Type of Transaction
        </InfoLabel>
        <Select name={'type'} size={"small"} id={"transaction-type"} style={{ width: '200px' }}>
            {keysOfTypesOfTransactions.map((option) => (
                <option key={option.valueOf()} value={types[option]}>
                    {option.valueOf()}
                </option>
            ))}
        </Select>
        <br/>
        <input type="text"
               placeholder={'notes'}
               name={'notes'}
               autoComplete={'off'}/>
        <br/>


        <Button type={'submit'} icon={<ReceiptMoneyRegular />}>Add
            Expense</Button>


    </form>

    const yearlySummary =
        <form onSubmit={(event) => {
            goToLink(event, 'year', 'summary');
        }}>
            <label htmlFor="year">Go To Yearly
                Summary</label>
            <br/>
            <input type="number" placeholder={'year'}
                   name={'year'}/>
            <Button type={'submit'}> Go to
                Summary</Button>
        </form>


    return (
        <div className="App">
            <h1>Expenses Manager</h1>
            {setUp}
            {h2}
            <br/>
            {getExpenseForMonth}
            <br/>
            {yearlySummary}
            <br/>
            <h2 style={{color: 'black', fontSize: '24px', margin: '20px 0'}}>Add an expense</h2>
            {form}
        </div>
    );
}

function expenseForAMonth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const urlData = createUrlParams(event.currentTarget);
    const month = urlData.get('month');
    const year = urlData.get('year');
    window.location.href = `/expensesMonth/${month}/${year}`
}

function submitData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const urlData = createUrlParams(event.currentTarget);
    // log the urlData
    for (const pair of urlData) {
        console.log(pair[0], pair[1]);
    }
    fetch(`http://localhost:8080/addExpense`, { //addExpense
        method: "POST",
        body: urlData,
    }).then(res => {
        console.log(res);

        // get the data
        res.json().then(data => {
            console.log(data);
            if (data.result) {
                // allgucci
                alert('Your expense was recorded');
                (event.target as HTMLFormElement).reset();
            }
        })
    }).catch(err => console.error(err));
} // end of submitdata

function createUrlParams(form:
                             HTMLFormElement) {
    // get the form data
    const formData = new FormData(form);

    // create the urlParams
    const urlData = new URLSearchParams();
    for (const pair of formData) {
        console.log(pair[0], pair[1]);
        const pair1 = pair[1].toString();
        urlData.append(pair[0], pair1);
    }

    return urlData;
}
