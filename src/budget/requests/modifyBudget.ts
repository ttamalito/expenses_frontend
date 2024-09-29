import createUrlParams from "../../utils/createURLParams";
import {modifyBudgetForAYear} from "./paths";
/**
 * Submits the data to change the budget
 * @param event
 */
export function modifyBudget(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const urlData = createUrlParams(event.currentTarget);
    //urlData.append('monthBudget', '1600')

    const url = modifyBudgetForAYear(2024);

    fetch(url, {
        method: 'POST',
        body: urlData
    }).then(res => {
        console.log(res);
        // get the data
        res.json().then(data => {
            if (data.result) {
                // all good
                window.location.href = '/'; // go to the homepage
            }
            else {
                alert('Something went wrong... check the backend!')
            }
        })
    }).catch(err => console.error(err));
}