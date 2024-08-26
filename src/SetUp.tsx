import {useEffect, useRef, useState} from "react";
import createUrlParams
    from "./utils/createURLParams";
import types from "./utils/types";
import expensesTypesTypesDeclarations
    from "./utils/expensesTypesTypesDeclarations";
import typesBudgetTypeDeclaration from "./utils/typesBudgetTypeDeclaration";
import React from "react";
import { Button } from "@fluentui/react-components";
import { Label } from "@fluentui/react-components";
import type { ButtonProps } from "@fluentui/react-components";
export default function SetUp() {
    // query the setup
    const [monthBudget, setMonthBudget] = useState(0);
    const [typesBudget, setTypesBudget] = useState<typesBudgetTypeDeclaration>(defualtObjectForTypesBudget);
    const monthBudgetRef = useRef(10);
    const [budgetModifierForm, setBudgetModifierForm] = useState(<form></form>);
    const [percentages, setPercentages] = useState({});
    useEffect(() => querySetUp(setMonthBudget, setTypesBudget, monthBudgetRef), []);

    const setUpForm = <form onSubmit={(event) => {submitSetUp(event)}}>
        {/*<label htmlFor="month_budget">Month Budget:</label>*/}
        <Label htmlFor="month_budget" weight={"semibold"}>Month Budget:</Label>
        <input type="number" placeholder={'Month Budget'} value={monthBudget} id={'month_budget'} name={'monthBudget_static'}/>
        <br/>
        <Label htmlFor="month_budget" weight={"semibold"}>Modify Month Budget:</Label>
        <input type="number" placeholder={'Modify Month Budget'} id={'monthBudget'} name={'monthBudget'}/>
        <br/>
        <Label htmlFor="essential_food_budget" weight={"semibold"}>Essential Food:</Label>
        <input type="number" placeholder={'Essential Food buget'} defaultValue={typesBudget.essential_food}
        id={'essential_food_budget'} name={types.ESSENTIAL_FOOD}/>
        <br/>
        <Label htmlFor={types.NON_ESSENTIAL_FOOD} weight={"semibold"}>Non Essential Food:</Label>
        <input type="number" placeholder={'Non Essential Food budget'} defaultValue={typesBudget.non_essential_food}
        id={'non_essential_food'} name={'non_essential_food'}/>
        <br/>
        <Label htmlFor={types.PARTY} weight={"semibold"}>Party Budget:</Label>
        <input type="number" placeholder={'party budget'} defaultValue={typesBudget.party}
        id={types.PARTY} name={types.PARTY}/>
        <br/>
        <Label htmlFor={types.PHONE} weight={"semibold"}>Phone Budget:</Label>
        <input type="number" placeholder={'phone budget'} defaultValue={typesBudget.phone}
        id={'phone'} name={types.PHONE}/>
        <br/>
        <Label htmlFor={types.INSURANCE} weight={"semibold"}>Insurance Budget:</Label>
        <input type="number" placeholder={'insurance budget'} defaultValue={typesBudget.insurance}
        id={'insurance'} name={types.INSURANCE}/>
        <br/>
        <Label htmlFor={types.HOME} weight={"semibold"}>Home Budget:</Label>
        <input type="number" placeholder={'home budget'} defaultValue={typesBudget.home}
        id={'home'} name={'home'}/>
        <br/>
        <Label htmlFor={types.GIFT} weight={"semibold"}>Gifts Budget:</Label>
        <input type="number" placeholder={'gift budget'} defaultValue={typesBudget.gift}
        id={'gift'} name={'gift'}/>
        <br/>
        <Label htmlFor={types.RECREATIONAL_PURCHASE} weight={"semibold"}>Recreational Purchases Budget:</Label>
        <input type="number" placeholder={'recreational_purchase budget'}
        defaultValue={typesBudget.recreational_purchase}
        id={'recreational_purchase'} name={'recreational_purchase'}/>
        <br/>
        <Label htmlFor={types.RENT} weight={"semibold"}>Rent Budget:</Label>
        <input type="number" placeholder={'rent budget'} defaultValue={typesBudget.rent}
        id={'rent'} name={'rent'}/>
        <br/>
        <Label htmlFor={types.VACATION} weight={"semibold"}>Vacation Budget:</Label>
    <input type="number" placeholder={'vacation budget'} defaultValue={typesBudget.vacation}
        id={types.VACATION} name={types.VACATION}/>
        <br/>
        <Label htmlFor={types.SAVINGS} weight={"semibold"}>Savings Budget:</Label>
        <input type="number" placeholder={'savings budget'}  defaultValue={typesBudget.savings}
        id={types.SAVINGS} name={types.SAVINGS}/>
        <br/>

        <Label htmlFor={types.INVESTMENT} weight={"semibold"}>Investement Budget:</Label>
        <input type="number" placeholder={'investment budget'} defaultValue={typesBudget.investment}
        id={types.INVESTMENT} name={types.INVESTMENT}/>
        <br/>
        <Label htmlFor={types.GYM} weight={"semibold"}>GYM Budget:</Label>
        <input type="number" placeholder={'gym budget'} defaultValue={typesBudget.gym}
        id={types.GYM} name={types.GYM}/>
        <br/>

        <Label htmlFor={types.MEDICINE} weight={"semibold"}>Medicine Budget:</Label>
        <input type="number" placeholder={'medicine budget'} defaultValue={typesBudget.medicine}
        id={types.MEDICINE} name={types.MEDICINE}/>
        <br/>

        <Label htmlFor={types.CLOTHES} weight={"semibold"}>Clothes Budget:</Label>
        <input type="number" placeholder={'clothes budget'} defaultValue={typesBudget.clothes}
        id={types.CLOTHES} name={types.CLOTHES}/>
        <br/>
        <Label htmlFor={types.UNIVERSITY} weight={"semibold"}>University Budget:</Label>
        <input type="number" placeholder={'university budget'} defaultValue={typesBudget.university}
        id={types.UNIVERSITY} name={types.UNIVERSITY}/>
        <br/>
        <Label htmlFor={types.OTHER} weight={"semibold"}>Other Budget:</Label>
        <input type="number" placeholder={'other budget'} defaultValue={typesBudget.other}
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
setTypesBudget: { (value: React.SetStateAction<typesBudgetTypeDeclaration>): void; (arg0: any): void; },
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


const defualtObjectForTypesBudget: typesBudgetTypeDeclaration = {
    cash
        :
        0,
    clothes
        :
        0,
    essential_food
        :
        251,
    gift
        :
        0,
    gym
        :
        40,
    home
        :
        0,
    income
        :
        0,
    insurance
        :
        130,
    investment
        :
        0,
    medicine
        :
        5,
    non_essential_food
        :
        70,
    other
        :
        50,
    party
        :
        0,
    phone
        :
        10,
    recreational_purchase
        :
        15,
    rent
        :
        330,
    savings
        :
        0,
    university
        :
        50,
    vacation
        :
        0,
}
