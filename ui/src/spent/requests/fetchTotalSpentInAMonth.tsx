import {fetchTotalSpentInMonthPath} from "./paths";
import {IResponseWrapper} from "../../wrappers/IResponseWrapper";
import {createWarningAlert} from "../../wrappers/IShowAlertWrapper";

/**
 * Fetch the total spent in a month
 * use type === 'all' to get total spent in a month (for all types)
 * Otherwise use a specific type of expense
 * @param year
 * @param month
 * @param type
 */
export default async function fetchTotalSpentInAMonth(year: number, month: number, type: string): Promise<IResponseWrapper<number>> {
    const url = fetchTotalSpentInMonthPath(year, month, type);

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

    let totalSpent = 0;
    let data;
    if (response.ok) {
       data = await response.json();
       totalSpent = data.totalSpent;
    }

    let alert: JSX.Element | undefined = undefined;
    if (response.status === 404) {
        alert = createWarningAlert('There was an error querying the total spent in a month');
    }

    if (response.status === 400) {
        alert = createWarningAlert('You provided wrong query parameters ' + data.message);
    }

    if (response.status === 500) {
       alert = createWarningAlert('Internal Server Error ' + data.message);
    }

    return {response, data: totalSpent, error: undefined, element: undefined, alert};

}