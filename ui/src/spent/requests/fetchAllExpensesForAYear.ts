import {fetchAllExpensesForAYearPath} from "./paths";
import OneExpenseSummaryTypeDeclaration from "../../expensesComponents/utils/types/OneExpenseSummaryType";


/**
 * Fetch all expenses for a given year.
 *
 * @param {string} year - The year for which to fetch expenses.
 * @returns {Promise<OneExpenseSummaryTypeDeclaration[]>} - A promise that resolves to an array of expense summaries.
 * @throws {Error} - Throws an error if the fetch operation fails.
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