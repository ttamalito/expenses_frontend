import React, {useState} from "react";
import {Button, Label} from "@fluentui/react-components";
import types from "../../utils/types";
import createUrlParams from "../../utils/createURLParams";
import ISetUpForm from "../types/ISetUpForm";
import {modifyBudget} from "../requests/modifyBudget";
import {createErrorAlert, defaultShowAlertWrapper, IShowAlertWrapper} from "../../wrappers/IShowAlertWrapper";

/**
 * SetUpForm component
 *
 * @param {Object} props - The properties object
 * @param {Object} props.typesBudget - The budget types object
 * @param {number} props.monthBudget - The initial monthly budget value
 * @returns {JSX.Element} The SetUpForm component
 */
export default function SetUpForm({typesBudget, monthBudget}: ISetUpForm): JSX.Element {

    const [showAlert, setShowAlert] = useState<IShowAlertWrapper>(defaultShowAlertWrapper);
    console.log('The types budget is: ' + JSON.stringify(typesBudget));
    console.log('The month budget is: ' + monthBudget);
    const [monthBudgetValue, setMonthBudgetValue] = useState<number>(monthBudget);
    console.log('The month budget value is: ' + monthBudgetValue);


    const setUpForm = <form onSubmit={(event) => {
        modifyBudget(event, setMonthBudgetValue).then( (responseWrapper) => {
            setShowAlert(responseWrapper);
        }).catch((error) => {
            console.error('There was an error modifying the budget');
            setShowAlert({show: true, alert: createErrorAlert('There was an error modifying the budget')});
        });
    }
    }>
        {/*<label htmlFor="month_budget">Month Budget:</label>*/}
        <h3>Your monthly budget is: {monthBudgetValue ? monthBudgetValue : monthBudget}</h3>
        <br/>
        <Label htmlFor="essential_food_budget" weight={"semibold"}>Essential Food:</Label>
        <input type="number" placeholder={'Essential Food buget'} defaultValue={typesBudget?.essential_food}
               id={'essential_food_budget'} name={types.ESSENTIAL_FOOD}/>
        <br/>
        <Label htmlFor={types.NON_ESSENTIAL_FOOD} weight={"semibold"}>Non Essential Food:</Label>
        <input type="number" placeholder={'Non Essential Food budget'} defaultValue={typesBudget?.non_essential_food}
               id={'non_essential_food'} name={'non_essential_food'}/>
        <br/>
        <Label htmlFor={types.PARTY} weight={"semibold"}>Party Budget:</Label>
        <input type="number" placeholder={'party budget'} defaultValue={typesBudget?.party}
               id={types.PARTY} name={types.PARTY}/>
        <br/>
        <Label htmlFor={types.PHONE} weight={"semibold"}>Phone Budget:</Label>
        <input type="number" placeholder={'phone budget'} defaultValue={typesBudget?.phone}
               id={'phone'} name={types.PHONE}/>
        <br/>
        <Label htmlFor={types.INSURANCE} weight={"semibold"}>Insurance Budget:</Label>
        <input type="number" placeholder={'insurance budget'} defaultValue={typesBudget?.insurance}
               id={'insurance'} name={types.INSURANCE}/>
        <br/>
        <Label htmlFor={types.HOME} weight={"semibold"}>Home Budget:</Label>
        <input type="number" placeholder={'home budget'} defaultValue={typesBudget?.home}
               id={'home'} name={'home'}/>
        <br/>
        <Label htmlFor={types.GIFT} weight={"semibold"}>Gifts Budget:</Label>
        <input type="number" placeholder={'gift budget'} defaultValue={typesBudget?.gift}
               id={'gift'} name={'gift'}/>
        <br/>
        <Label htmlFor={types.RECREATIONAL_PURCHASE} weight={"semibold"}>Recreational Purchases Budget:</Label>
        <input type="number" placeholder={'recreational_purchase budget'}
               defaultValue={typesBudget?.recreational_purchase}
               id={'recreational_purchase'} name={'recreational_purchase'}/>
        <br/>
        <Label htmlFor={types.RENT} weight={"semibold"}>Rent Budget:</Label>
        <input type="number" placeholder={'rent budget'} defaultValue={typesBudget?.rent}
               id={'rent'} name={'rent'}/>
        <br/>
        <Label htmlFor={types.VACATION} weight={"semibold"}>Vacation Budget:</Label>
        <input type="number" placeholder={'vacation budget'} defaultValue={typesBudget?.vacation}
               id={types.VACATION} name={types.VACATION}/>
        <br/>
        <Label htmlFor={types.SAVINGS} weight={"semibold"}>Savings Budget:</Label>
        <input type="number" placeholder={'savings budget'}  defaultValue={typesBudget?.savings}
               id={types.SAVINGS} name={types.SAVINGS}/>
        <br/>

        <Label htmlFor={types.INVESTMENT} weight={"semibold"}>Investement Budget:</Label>
        <input type="number" placeholder={'investment budget'} defaultValue={typesBudget?.investment}
               id={types.INVESTMENT} name={types.INVESTMENT}/>
        <br/>
        <Label htmlFor={types.GYM} weight={"semibold"}>GYM Budget:</Label>
        <input type="number" placeholder={'gym budget'} defaultValue={typesBudget?.gym}
               id={types.GYM} name={types.GYM}/>
        <br/>

        <Label htmlFor={types.MEDICINE} weight={"semibold"}>Medicine Budget:</Label>
        <input type="number" placeholder={'medicine budget'} defaultValue={typesBudget?.medicine}
               id={types.MEDICINE} name={types.MEDICINE}/>
        <br/>

        <Label htmlFor={types.CLOTHES} weight={"semibold"}>Clothes Budget:</Label>
        <input type="number" placeholder={'clothes budget'} defaultValue={typesBudget?.clothes}
               id={types.CLOTHES} name={types.CLOTHES}/>
        <br/>
        <Label htmlFor={types.UNIVERSITY} weight={"semibold"}>University Budget:</Label>
        <input type="number" placeholder={'university budget'} defaultValue={typesBudget?.university}
               id={types.UNIVERSITY} name={types.UNIVERSITY}/>
        <br/>
        <Label htmlFor={types.OTHER} weight={"semibold"}>Other Budget:</Label>
        <input type="number" placeholder={'other budget'} defaultValue={typesBudget?.other}
               id={'other'} name={'other'}/>
        <br/>
        {/*<button type={'submit'}>Change Budget</button>*/}
        <Button type={'submit'}>Change Budget</Button>
    </form>;
    return (
        <>
            {showAlert.show && showAlert.alert}
            <br/>
            {setUpForm}
        </>
    );
} // end of SetUpForm

