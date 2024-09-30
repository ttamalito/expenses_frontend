import React, {useEffect, useRef, useState} from "react";
import expensesTypesTypesDeclarations from "../utils/expensesTypesTypesDeclarations";
import typesBudgetTypeDeclaration from "../utils/typesBudgetTypeDeclaration";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import SetUpForm from "./components/SetUpForm";
import ISetUpForm from "./types/ISetUpForm";
import fetchBudget from "./requests/fetchBudget";
import InternalError from "../fallback/InternalError";
import {IErrorWrapper, defaultErrorWrapper} from "../wrappers/IErrorWrapper";
import {IShowAlertWrapper, defaultShowAlertWrapper} from "../wrappers/IShowAlertWrapper";



export default function SetUp() {
    const [budget, setBudget] = useState<ISetUpForm>({typesBudget: undefined, monthBudget: 0});
    const [errorWrapper, setErrorWrapper] = useState<IErrorWrapper>(defaultErrorWrapper);
    const [showAlert, setShowAlert] = useState<IShowAlertWrapper>(defaultShowAlertWrapper);

    const successfullUpdateAlert = <Alert severity="success" icon={<CheckIcon fontSize={'inherit'}/>}>The budget was updated successfully </Alert>;

    useEffect(() => {
        fetchBudget().then(
            (responseWrapper) => {
                console.log('Passing the budget into the state');
                if (responseWrapper.response.ok) {
                    const budget = responseWrapper.data;
                    setBudget(budget);
                } else if (responseWrapper.element !== undefined) {
                    console.error('There was an error querying the budget');
                    setErrorWrapper({element: responseWrapper.element, error: true});
                }

            }
        ).catch((error) => {
            console.error('There was an error querying the setup');
            return <InternalError url={''} error={error} />
        });
    }, [setBudget]);


    const showAlertButton = <button onClick={() => setShowAlert({alert: successfullUpdateAlert, show: true})}>Show Alert</button>;

    const returnHome = <a href={'/'}>Return Home</a>;
    if (errorWrapper.error) {
        return errorWrapper.element;
    }
    return (
        <>
            {returnHome}
            <br/>
            {showAlertButton}
            <br/>
            {showAlert.show && showAlert.alert}
            <h2>Modify your monthly budget</h2>
            {<SetUpForm typesBudget={budget.typesBudget} monthBudget={budget.monthBudget}/>}
        </>
    )
} // end of SetUP





function retrievePercentages(typesBudget: expensesTypesTypesDeclarations) {
    const total: number = Number(Object.values(typesBudget).reduce((accumulator, currentValue) => accumulator + Number(currentValue), 0));
    const percentages: any = {};
    for (const [key, value] of Object.entries(typesBudget)) {
        percentages[key] = (Number(value) / total) * 100;
    }
    return {
        total: total,
        percentages: percentages
    };
}
