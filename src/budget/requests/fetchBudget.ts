
import ISetUpForm from "../types/ISetUpForm";
import customFetch from "../../utils/fetchRequests";
import {retrieveBudgetForAYear} from "./paths";

/**
 * Queries the budget from the backend api
 * @param setMonthBudget
 * @param setTypesBudget
 * @param monthBudgetRef
 */
async function fetchBudget(): Promise<ISetUpForm> {

    const url = retrieveBudgetForAYear(2024);

    const response = await fetch(url, {
        method: 'GET',
    });

    if (response === undefined) {
        throw new Error('Response is undefined!');
    }

    if (response.ok) {
        const data = await response.json();
        console.log('Retreived budget with status code: ' + response.status);
        return {
            typesBudget: data.setUp.typesBudget,
            monthBudget: data.setUp.monthBudget
        }
    } else {
        console.error('There was an error querying the setup');
        return {
            typesBudget: undefined,
            monthBudget: 0
        }
    }

} // end of querySetUP

export default fetchBudget;