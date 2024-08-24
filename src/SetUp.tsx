import {useEffect, useRef, useState} from "react";
import createUrlParams
    from "./utils/createURLParams";
import types from "./utils/types";
import expensesTypesTypesDeclarations
    from "./utils/expensesTypesTypesDeclarations";
import React from "react";
import { Button } from "@fluentui/react-components";
import type { ButtonProps } from "@fluentui/react-components";
export default function SetUp() {
    // query the setup
    const [monthBudget, setMonthBudget] = useState(0);
    const [typesBudget, setTypesBudget] = useState<expensesTypesTypesDeclarations>();
    const monthBudgetRef = useRef(10);
    const [budgetModifierForm, setBudgetModifierForm] = useState(<form></form>);
    const [percentages, setPercentages] = useState({});
    useEffect(() => querySetUp(setMonthBudget, setTypesBudget, monthBudgetRef), []);

    const setUpForm = <form onSubmit={(event) => {submitSetUp(event)}}>
        <label htmlFor="month_budget">Month Budget:</label>
        <input type="number" placeholder={'Month Budget'} value={monthBudget} id={'month_budget'} name={'monthBudget_static'}/>
        <br/>
        <label htmlFor="monthBudget">Modify Month Budget:</label>
        <input type="number" placeholder={'Modify Month Budget'} id={'monthBudget'} name={'monthBudget'}/>
        <br/>
        <label htmlFor="essential_food_budget">Essential Food</label>
        <input type="number" placeholder={'Essential Food buget'} defaultValue={typesBudget?.ESSENTIAL_FOOD}
        id={'essential_food_budget'} name={'essential_food'}/>
        <br/>
        <label htmlFor="non_essential_food">Non Essential Food</label>
        <input type="number" placeholder={'Non Essential Food budget'} defaultValue={typesBudget?.NON_ESSENTIAL_FOOD}
        id={'non_essential_food'} name={'non_essential_food'}/>
        <br/>
        <label htmlFor="party">Party Budget</label>
        <input type="number" placeholder={'party budget'} defaultValue={typesBudget?.PARTY}
        id={'party'} name={'party'}/>
        <br/>
        <label htmlFor="phone">Phone Budget</label>
        <input type="number" placeholder={'phone budget'} defaultValue={typesBudget?.PHONE}
        id={'phone'} name={'phone'}/>
        <br/>
        <label htmlFor="insurance">Insurance Budget</label>
        <input type="number" placeholder={'insurance budget'} defaultValue={typesBudget?.INSURANCE}
        id={'insurance'} name={'insurance'}/>
        <br/>
        <label htmlFor="home">Home Budget</label>
        <input type="number" placeholder={'home budget'} defaultValue={typesBudget?.HOME}
        id={'home'} name={'home'}/>
        <br/>
        <label htmlFor="gift">Gifts Budget</label>
        <input type="number" placeholder={'gift budget'} defaultValue={typesBudget?.GIFT}
        id={'gift'} name={'gift'}/>
        <br/>
        <label htmlFor="recreational_purchase">Recreational Purchases Budget</label>
        <input type="number" placeholder={'recreational_purchase budget'}
        defaultValue={typesBudget?.RECREATIONAL_PURCHASE}
        id={'recreational_purchase'} name={'recreational_purchase'}/>
        <br/>
        <label htmlFor="rent">Rent Budget</label>
        <input type="number" placeholder={'rent budget'} defaultValue={typesBudget?.RENT}
        id={'rent'} name={'rent'}/>
        <br/>
        <label htmlFor={types.VACATION}>Vacation Budget</label>
    <input type="number" placeholder={'vacation budget'} defaultValue={typesBudget?.VACATION}
        id={types.VACATION} name={types.VACATION}/>
        <br/>
        <label htmlFor={types.SAVINGS}>Savings Budget</label>
        <input type="number" placeholder={'savings budget'}  defaultValue={typesBudget?.SAVINGS}
        id={types.SAVINGS} name={types.SAVINGS}/>
        <br/>

        <label htmlFor={types.INVESTMENT}>Investment Budget</label>
        <input type="number" placeholder={'investment budget'} defaultValue={typesBudget?.INVESTMENT}
        id={types.INVESTMENT} name={types.INVESTMENT}/>
        <br/>

        <label htmlFor={types.GYM}>Gym Budget</label>
        <input type="number" placeholder={'gym budget'} defaultValue={typesBudget?.GYM}
        id={types.GYM} name={types.GYM}/>
        <br/>

        <label htmlFor={types.MEDICINE}>Medicine Budget</label>
        <input type="number" placeholder={'medicine budget'} defaultValue={typesBudget?.MEDICINE}
        id={types.MEDICINE} name={types.MEDICINE}/>
        <br/>

        <label htmlFor={types.CLOTHES}>Clothes Budget</label>
        <input type="number" placeholder={'clothes budget'} defaultValue={typesBudget?.CLOTHES}
        id={types.CLOTHES} name={types.CLOTHES}/>
        <br/>

        <label htmlFor={types.UNIVERSITY}>University Budget</label>
        <input type="number" placeholder={'university budget'} defaultValue={typesBudget?.UNIVERSITY}
        id={types.UNIVERSITY} name={types.UNIVERSITY}/>
        <br/>

        <label htmlFor="other">Other Budget</label>
        <input type="number" placeholder={'other budget'} defaultValue={typesBudget?.OTHER}
        id={'other'} name={'other'}/>
        <br/>
        {/*<button type={'submit'}>Change Budget</button>*/}
        <Button type={'submit'}>Change Budget</Button>
    </form>;

    const returnHome = <a href={'/'}>Return Home</a>;
    return (
        <>
            {returnHome}
            <br/>
            <br/>
            This is to set up your monthly budget of 2024
            <br/>
            <br/>
            {setUpForm}
        </>
    )
} // end of SetUP


/**
 * Queries the setup values from the backend
 * @param setMonthBudget
 * @param setTypesBudget
 * @param monthBudgetRef
 */
function querySetUp(setMonthBudget: React.Dispatch<React.SetStateAction<number>>, 
setTypesBudget: { (value: React.SetStateAction<expensesTypesTypesDeclarations | undefined>): void; (arg0: any): void; }, 
monthBudgetRef: React.MutableRefObject<number>) {

    // send the request
    fetch(`http://localhost:8080/getSetUp/2024`, {
        method: 'GET',
    }).then(res => {
        console.log(res);
        // get the data
        res.json().then(data => {
            if (data.result) {
                console.log(data);

                monthBudgetRef.current = data.setUp.monthBudget;
                setTypesBudget(data.setUp.typesBudget);
                const result = retrievePercentages(data.setUp.typesBudget);
                setMonthBudget(result.total);
                console.log(result.percentages);
            } // the query was successful

        })
    }).catch(err => console.error(err))

} // end of querySetUP

/**
 * Submits the data to change the set up
 * @param event
 */
function submitSetUp(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault();

const urlData = createUrlParams(event.nativeEvent.srcElement);

fetch(`http://localhost:8080/modifySetUp/2024`, {
    method: 'POST',
    body: urlData
}).then(res => {
    console.log(res);
    // get the data
    res.json().then(data => {
        if (data.result) {
            // all good
            window.location.href = '/'; // go to the homepage
        }
        else {
            alert('Something went wrong... check the backend!')
        }
    })
}).catch(err => console.error(err));
}




function retrievePercentages(typesBudget: expensesTypesTypesDeclarations) {
    const total:number = Number(Object.values(typesBudget).reduce((accumulator, currentValue) => accumulator + Number(currentValue), 0));
    const percentages: any = {};
    for (const [key, value] of Object.entries(typesBudget)) {
        percentages[key] = (Number(value) / total) * 100;
    }
    return {
        total: total,
        percentages: percentages
    };
}

