import {fetchAllExpensesForAYearPath} from "./paths";
import OneExpenseSummaryTypeDeclaration from "../../expensesComponents/utils/types/OneExpenseSummaryType";


/**
 * Fetch all expenses for a year
 * @param year
 */
export default async function fetchAllExpensesForAYear(year: string) {

    const url = fetchAllExpensesForAYearPath(year);

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Error fetching all expenses for year ${year}`);
    }


    const data = await response.json();


    const expenses: OneExpenseSummaryTypeDeclaration[] = data.expenses;


    return expenses;
    } // end of fetchAllExpensesForAYear