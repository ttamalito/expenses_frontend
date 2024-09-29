
import ISetUpForm from "../types/ISetUpForm";
import {retrieveBudgetForAYear} from "./paths";
import {IResponseWrapper} from "../../wrappers/IResponseWrapper";
import InternalAPINotFound from "../../fallback/InternalAPINotFound";
import React from "react";
import InternalError from "../../fallback/InternalError";
/**
 * Queries the budget from the backend api
 * @param setMonthBudget
 * @param setTypesBudget
 * @param monthBudgetRef
 */
async function fetchBudget(): Promise<IResponseWrapper<ISetUpForm>> {

    const url = retrieveBudgetForAYear(2024);

    const response = await fetch(url, {
        method: 'GET',
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Retreived budget with status code: ' + response.status);
        const budgetData: ISetUpForm = {
            monthBudget: data.setUp.monthBudget,
            typesBudget: data.setUp.typesBudget
        }
        return {
            response: response,
            data: budgetData,
            error: undefined,
            element: undefined
        }
    } else if (response.status === 404) {
        console.error('Url not found');
        const internalApiNotFound = <InternalAPINotFound url={url}/>
        const budgetData: ISetUpForm = {
            monthBudget: 0,
            typesBudget: undefined
        }
        return {
            response: response,
            data: budgetData,
            error: undefined,
            element: internalApiNotFound
        }
    } else if (response.status === 500) {
        console.error('Internal server error');
        const error = new Error('Internal server error');
        const internalApiNotFound = <InternalError error={error} url={url} />
        const budgetData: ISetUpForm = {
            monthBudget: 0,
            typesBudget: undefined
        }
        return {
            response: response,
            data: budgetData,
            error: undefined,
            element: internalApiNotFound
        }
    }

    const error = new Error('Unknown error');
    const budgetData: ISetUpForm = {
        monthBudget: 0,
        typesBudget: undefined
    }
    return {
        response: response,
        data: budgetData,
        error: error,
        element: undefined
    }

} // end of querySetUP

export default fetchBudget;