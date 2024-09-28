import React, {useEffect, useRef, useState} from "react";
import expensesTypesTypesDeclarations from "../utils/expensesTypesTypesDeclarations";
import typesBudgetTypeDeclaration from "../utils/typesBudgetTypeDeclaration";

import SetUpForm from "./components/SetUpForm";
import ISetUpForm from "./types/ISetUpForm";

export default function SetUp() {
    // query the setup
    const [monthBudget, setMonthBudget] = useState(0);
    const [typesBudget, setTypesBudget] = useState<typesBudgetTypeDeclaration | undefined>(undefined);
    const monthBudgetRef = useRef(10);
    const [budgetModifierForm, setBudgetModifierForm] = useState(<form></form>);
    const [percentages, setPercentages] = useState({});
    const [budget, setBudget] = useState<ISetUpForm>({typesBudget: undefined, monthBudget: 0});
    useEffect(() => {
        querySetUp(setMonthBudget, setTypesBudget, monthBudgetRef).then(
            (result) => {
                console.log('Passing the budget into the state');
                setBudget(result);
            }
        ).catch((error) => {
            console.error('There was an error querying the setup');
            alert("There was an error querying the setup");
        });
    }, [setBudget]);


    const returnHome = <a href={'/'}>Return Home</a>;
    return (
        <>
            {returnHome}
            <br/>
            <br/>
            This is to set up your monthly budget of 2024
            <br/>
            <br/>
            {<SetUpForm typesBudget={budget.typesBudget} monthBudget={budget.monthBudget}/>}
        </>
    )
} // end of SetUP


/**
 * Queries the budget from the backend api
 * @param setMonthBudget
 * @param setTypesBudget
 * @param monthBudgetRef
 */
async function querySetUp(setMonthBudget: React.Dispatch<React.SetStateAction<number>>,
                          setTypesBudget: {
                              (value: React.SetStateAction<typesBudgetTypeDeclaration | undefined>): void;
                              (arg0: any): void;
                          },
                          monthBudgetRef: React.MutableRefObject<number>): Promise<ISetUpForm> {


    const response = await fetch(`http://localhost:8080/getSetUp/2024`, {
        method: 'GET',
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Retreived budget with status code: ' + response.status);
        monthBudgetRef.current = data.setUp.monthBudget;
        setTypesBudget(data.setUp.typesBudget);
        const result = retrievePercentages(data.setUp.typesBudget);
        setMonthBudget(result.total);
        console.log(result.percentages);
        return {
            typesBudget: data.setUp.typesBudget,
            monthBudget: data.setUp.monthBudget
        }
    } else {
        console.error('There was an error querying the setup');
        alert("Response code was: " + response.status);
        return {
            typesBudget: undefined,
            monthBudget: 0
        }
    }

} // end of querySetUP


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


const defualtObjectForTypesBudget: typesBudgetTypeDeclaration = {
    cash:
        0,
    clothes:
        0,
    essential_food:
        251,
    gift:
        0,
    gym:
        40,
    home:
        0,
    income:
        0,
    insurance:
        130,
    investment:
        0,
    medicine:
        5,
    non_essential_food:
        70,
    other:
        50,
    party:
        0,
    phone:
        10,
    recreational_purchase:
        15,
    rent:
        330,
    savings:
        0,
    university:
        50,
    vacation:
        0,
}
