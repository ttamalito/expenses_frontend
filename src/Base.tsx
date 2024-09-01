import types from "./utils/types";
import {goToLink} from "./utils/goToLinkFromForm";
import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Button
} from "@fluentui/react-components";
import useButtonStyles
    from "./FluentStyles/baseButton";
import { Field, Radio, RadioGroup } from "@fluentui/react-components";
import type { RadioGroupProps } from "@fluentui/react-components";


export default function Base() {
    const buttonStyles = useButtonStyles();
    // setup the maximum for expenses and other settings
    const setUp = <a href={'/setUp'}>Set Up your
        expenses </a>
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
        <Button className={buttonStyles.button}
                type={'submit'}>See
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
            <input type="text"
                   placeholder={'date'}
                   name={'date'}/>
            <br/>


            <br/>
        <Field label="Expense of Income?">
            <RadioGroup layout="horizontal-stacked" name={'transaction'} required={true}>
                <Radio value="expense" label="Expense" />
                <Radio value="income" label="Income" />

            </RadioGroup>
        </Field>
        <Field label="Type of Transaction">
            <RadioGroup layout="horizontal-stacked" name={'type'} required={true}>
                <Radio value={types.ESSENTIAL_FOOD} label="Essential Food" />
                <Radio value={types.NON_ESSENTIAL_FOOD} label="Non Essential Food" />
                <Radio value={types.PARTY} label="Party" />
                <Radio value={types.PHONE} label="Phone" />
                <Radio value={types.INSURANCE} label="Insurance" />
                <Radio value={types.INCOME} label="Income" />
                <Radio value={types.HOME} label="Home" />
                <Radio value={types.RECREATIONAL_PURCHASE} label="Recreational Purchase" />
                <Radio value={types.RENT} label="Rent" />
                <Radio value={types.GIFT} label="Gift" />
                <Radio value={types.VACATION} label="Vacation" />
                <Radio value={types.SAVINGS} label="Savings" />
                <Radio value={types.INVESTMENT} label="Investment" />
                <Radio value={types.GYM} label="Gym" />
                <Radio value={types.MEDICINE} label="Medicine" />
                <Radio value={types.CLOTHES} label="Clothes" />
                <Radio value={types.UNIVERSITY} label="University" />
                <Radio value={types.OTHER} label="Other" />
            </RadioGroup>
        </Field>

        <br/>
        <input type="text"
               placeholder={'notes'}
               name={'notes'}
               autoComplete={'off'}/>
        <br/>


            <Button type={'submit'}>Add
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
        {'Add a transaction'}
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

            fetch(`http://localhost:8080/addExpense`, {
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
