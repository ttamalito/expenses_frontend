
import ISetUpForm from "../types/ISetUpForm";

/**
 * Queries the budget from the backend api
 * @param setMonthBudget
 * @param setTypesBudget
 * @param monthBudgetRef
 */
async function fetchBudget(): Promise<ISetUpForm> {


    const response = await fetch(`http://localhost:8080/getSetUp/2024`, {
        method: 'GET',
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Retreived budget with status code: ' + response.status);
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

export default fetchBudget;