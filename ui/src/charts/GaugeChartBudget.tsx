import { Gauge } from '@mui/x-charts/Gauge';
import ExpensesTypesTypesDeclarations from '../utils/expensesTypesTypesDeclarations';
import expensesTypes from '../utils/types';
import fetchBudget from '../budget/requests/fetchBudget';
import React, { useEffect } from 'react';
import typesBudgetTypeDeclaration from '../utils/typesBudgetTypeDeclaration';
import fetchTotalSpentInAMonth from '../spent/requests/fetchTotalSpentInAMonth';
import {
  IShowAlertWrapper,
  defaultShowAlertWrapper,
  createWarningAlert,
} from '../wrappers/IShowAlertWrapper';
interface IGaugeChartBudgetProps {
  expenseType: string | undefined;
  width: number;
  height: number;
  yearFlag: boolean;
  updateFlag: boolean;
}

/**
 * This function renders a Gauge chart to display the total spent on a specific expense type or the entire month,
 * compared to the budget allocated for that type or the monthly budget.
 *
 * @param expenseType - The type of expense for which the budget is being displayed. If not provided, the total spent on the entire month is shown.
 * @param height - The height of the Gauge chart in pixels.
 * @param width - The width of the Gauge chart in pixels.
 * @param yearFlag - A boolean flag indicating whether the budget is for the entire year or just the month.
 * @param updateFlag - A boolean flag indicating that the Gauge chart should be updated.
 *
 * @returns A React component displaying the Gauge chart and relevant information.
 */
function GaugeChartBudget({
  expenseType,
  height,
  width,
  yearFlag,
  updateFlag,
}: IGaugeChartBudgetProps) {
  const [budget, setBudget] = React.useState<number>(0);
  const [totalSpent, setTotalSpent] = React.useState<number>(0);
  const [showAlert, setShowAlert] = React.useState<IShowAlertWrapper>(
    defaultShowAlertWrapper,
  );

  useEffect(() => {
    if (yearFlag) {
      fetchBudgetOfType(expenseType)
        .then((maxValue) => {
          setBudget(maxValue * 12);
        })
        .catch((error) => {
          console.error(error);
        });

      const dateMilliseconds = Date.now();
      const date = new Date(dateMilliseconds);
      const year = date.getFullYear();
      // TODO: fetch the total spent in a year
    } else {
      fetchBudgetOfType(expenseType)
        .then((maxValue) => {
          setBudget(maxValue);
        })
        .catch((error) => {
          console.error(error);
        });

      const dateMilliseconds = Date.now();
      const date = new Date(dateMilliseconds);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      fetchTotalSpentInAMonth(year, month, expenseType ? expenseType : 'all')
        .then((responseWrapper) => {
          if (responseWrapper.response.ok) {
            setTotalSpent(responseWrapper.data * -1); // the total spent is negative
          } else {
            setShowAlert({
              show: true,
              alert: responseWrapper.alert as JSX.Element,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [updateFlag]);

  const spentMoreThanBudgetAlert = createWarningAlert(
    'You have spent ' +
      Math.floor(totalSpent - budget) +
      ' euros more than your budget',
  );

  return (
    <>
      {expenseType !== undefined
        ? `Total spent on ${expenseType}  according to budget:`
        : `Total spent on this month according to your budget:`}
      {totalSpent > budget && spentMoreThanBudgetAlert}
      <Gauge
        width={width}
        height={height}
        value={totalSpent}
        valueMax={budget}
        text={({ value, valueMax }) => {
          return `${value} / ${valueMax}`;
        }}
      />
    </>
  );
}

/**
 * Fetches the budget for a specific expense type or the  budget for the entire month.
 *
 * @param expenseType - The type of expense for which the budget is being fetched. If not provided, the monthly budget is fetched.
 *
 * @returns A Promise that resolves to the budget amount. If the expense type is provided, the budget for that type is returned.
 *          If no expense type is provided, the monthly budget is returned. If the fetch request fails, the Promise resolves to 0.
 */
async function fetchBudgetOfType(expenseType: string | undefined) {
  const responseWrapper = await fetchBudget();

  if (responseWrapper.response.ok) {
    const data = responseWrapper.data;

    if (expenseType) {
      const typesBudget = data.typesBudget as typesBudgetTypeDeclaration;
      const budget =
        typesBudget[expenseType as keyof typesBudgetTypeDeclaration];
      return budget;
    } else {
      return data.monthBudget;
    }
  }
  return 0;
}

export default GaugeChartBudget;
