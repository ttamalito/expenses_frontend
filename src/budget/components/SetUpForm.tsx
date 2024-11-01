import React, {useState} from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
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
        <FormControl>
            <InputLabel htmlFor="essential_food_budget">Essential Food:</InputLabel>
            <input type="number" placeholder={'Essential Food buget'} defaultValue={typesBudget?.essential_food}
                   id={'essential_food_budget'} name={types.ESSENTIAL_FOOD}/>
        </FormControl>

        <br/>
        <FormControl>
            <InputLabel htmlFor={types.NON_ESSENTIAL_FOOD} >Non Essential Food:</InputLabel>
            <input type="number" placeholder={'Non Essential Food budget'} defaultValue={typesBudget?.non_essential_food}
                   id={'non_essential_food'} name={'non_essential_food'}/>
        </FormControl>

        <br/>
        <FormControl>
            <InputLabel htmlFor={types.PARTY}>Party Budget:</InputLabel>
            <input type="number" placeholder={'party budget'} defaultValue={typesBudget?.party}
                   id={types.PARTY} name={types.PARTY}/>
        </FormControl>

        <br/>
        <FormControl>
            <InputLabel htmlFor={types.PHONE} >Phone Budget:</InputLabel>
            <input type="number" placeholder={'phone budget'} defaultValue={typesBudget?.phone}
                   id={'phone'} name={types.PHONE}/>
        </FormControl>

        <br/>
        <FormControl>
            <InputLabel htmlFor={types.INSURANCE}>Insurance Budget:</InputLabel>
            <input type="number" placeholder={'insurance budget'} defaultValue={typesBudget?.insurance}
                   id={'insurance'} name={types.INSURANCE}/>
        </FormControl>


        <br/>
        <FormControl>
            <InputLabel htmlFor={types.HOME}>Home Budget:</InputLabel>
            <input type="number" placeholder={'home budget'} defaultValue={typesBudget?.home}
                   id={'home'} name={'home'}/>
        </FormControl>
        <br/>
            <FormControl>
                <InputLabel htmlFor={types.GIFT} >Gifts Budget:</InputLabel>
                <input type="number" placeholder={'gift budget'} defaultValue={typesBudget?.gift}
                       id={'gift'} name={'gift'}/>
            </FormControl>
        <br/>
        <FormControl>
            <InputLabel htmlFor={types.RECREATIONAL_PURCHASE} >Recreational Purchases Budget:</InputLabel>
            <input type="number" placeholder={'recreational_purchase budget'}
                   defaultValue={typesBudget?.recreational_purchase}
                   id={'recreational_purchase'} name={'recreational_purchase'}/>
        </FormControl>

        <br/>
        <FormControl>
            <InputLabel htmlFor={types.RENT} >Rent Budget:</InputLabel>
            <input type="number" placeholder={'rent budget'} defaultValue={typesBudget?.rent}
                   id={'rent'} name={'rent'}/>
        </FormControl>
        <br/>
        <InputLabel htmlFor={types.VACATION} >Vacation Budget:</InputLabel>
        <input type="number" placeholder={'vacation budget'} defaultValue={typesBudget?.vacation}
               id={types.VACATION} name={types.VACATION}/>
        <br/>
        <FormControl>
            <InputLabel htmlFor={types.SAVINGS} >Savings Budget:</InputLabel>
            <input type="number" placeholder={'savings budget'}  defaultValue={typesBudget?.savings}
                   id={types.SAVINGS} name={types.SAVINGS}/>
        </FormControl>
        <br/>

        <FormControl>
            <InputLabel htmlFor={types.INVESTMENT} >Investement Budget:</InputLabel>
            <input type="number" placeholder={'investment budget'} defaultValue={typesBudget?.investment}
                   id={types.INVESTMENT} name={types.INVESTMENT}/>
        </FormControl>
        <br/>
        <FormControl>
            <InputLabel htmlFor={types.GYM} >GYM Budget:</InputLabel>
            <input type="number" placeholder={'gym budget'} defaultValue={typesBudget?.gym}
                   id={types.GYM} name={types.GYM}/>
        </FormControl>
        <br/>

        <FormControl>
            <InputLabel htmlFor={types.MEDICINE} >Medicine Budget:</InputLabel>
            <input type="number" placeholder={'medicine budget'} defaultValue={typesBudget?.medicine}
                   id={types.MEDICINE} name={types.MEDICINE}/>
        </FormControl>
        <br/>

        <FormControl>
            <InputLabel htmlFor={types.CLOTHES} >Clothes Budget:</InputLabel>
            <input type="number" placeholder={'clothes budget'} defaultValue={typesBudget?.clothes}
                   id={types.CLOTHES} name={types.CLOTHES}/>
        </FormControl>
        <br/>
        <FormControl>
            <InputLabel htmlFor={types.UNIVERSITY} >University Budget:</InputLabel>
            <input type="number" placeholder={'university budget'} defaultValue={typesBudget?.university}
                   id={types.UNIVERSITY} name={types.UNIVERSITY}/>
        </FormControl>
        <br/>
        <FormControl>
            <InputLabel htmlFor={types.OTHER} >Other Budget:</InputLabel>
            <input type="number" placeholder={'other budget'} defaultValue={typesBudget?.other}
                   id={'other'} name={'other'}/>
        </FormControl>
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

