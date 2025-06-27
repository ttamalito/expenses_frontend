import createUrlParams from '../../utils/createURLParams';
import { modifyBudgetForAYear } from './paths';
import {
  createErrorAlert,
  createSuccessAlert,
  IShowAlertWrapper,
} from '../../wrappers/IShowAlertWrapper';
/**
 * Submits the data to change the budget
 * @param event
 * @param setMonthBudgetValue
 */
export async function modifyBudget(
  event: React.FormEvent<HTMLFormElement>,
  setMonthBudgetValue: (
    value: ((prevState: number) => number) | number,
  ) => void,
): Promise<IShowAlertWrapper> {
  event.preventDefault();

  const urlData = createUrlParams(event.currentTarget);

  let monthBudget = 0;
  for (const pair of urlData) {
    monthBudget += Number(pair[1]);
  }
  setMonthBudgetValue(monthBudget);
  console.log('Month budget is: ' + monthBudget);
  urlData.append('monthBudget', monthBudget.toString());

  const url = modifyBudgetForAYear(2024);

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: urlData,
    });
    console.log(res);
    const data = await res.json();
    if (data.result) {
      return {
        show: true,
        alert: createSuccessAlert(
          'The budget was updated successfully, you can now return to the homepage',
        ),
      };
    } else {
      return {
        show: true,
        alert: createErrorAlert('There was an error updating the budget'),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      show: true,
      alert: createErrorAlert('There was an error updating the budget ' + err),
    };
  }
}
