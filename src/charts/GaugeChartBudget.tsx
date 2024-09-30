import { Gauge } from '@mui/x-charts/Gauge';
import ExpensesTypesTypesDeclarations from "../utils/expensesTypesTypesDeclarations";
import expensesTypes from "../utils/types";
import fetchBudget from "../budget/requests/fetchBudget";
import React, {useEffect} from 'react';
import typesBudgetTypeDeclaration from "../utils/typesBudgetTypeDeclaration";
import fetchTotalSpentInAMonth from "../spent/requests/fetchTotalSpentInAMonth";
import {IShowAlertWrapper, defaultShowAlertWrapper} from "../wrappers/IShowAlertWrapper";
interface IGaugeChartBudgetProps {
    expenseType: string | undefined;
}

function GaugeChartBudget({expenseType}: IGaugeChartBudgetProps) {
    const [budget, setBudget] = React.useState<number>(0);
    const [totalSpent, setTotalSpent] = React.useState<number>(0);
    const [showAlert, setShowAlert] = React.useState<IShowAlertWrapper>(defaultShowAlertWrapper);

    useEffect(() => {
       fetchBudgetOfType(expenseType).then( maxValue => {
              setBudget(maxValue);
       }).catch(error => {console.error(error)});

       const dateMilliseconds = Date.now();
       const date = new Date(dateMilliseconds);
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       fetchTotalSpentInAMonth(year, month, expenseType ? expenseType : 'all').then(responseWrapper => {
              if (responseWrapper.response.ok) {
                setTotalSpent(responseWrapper.data * -1); // the total spent is negative
              } else {
                setShowAlert({show: true, alert: responseWrapper.alert as JSX.Element});
              }

       }).catch((error) => {console.error(error)});
    }, [expenseType]);

    return (
        <>
            {(expenseType !== undefined) ? `Total spent on ${expenseType}  according to budget:` : `Total spent on this month according to your budget:`}
            <Gauge
                width={200}
                height={200}
                value={totalSpent}
                valueMax={budget}
                text={
                    ({ value, valueMax }) => `${value} / ${valueMax}`
                }
            />
        </>

    );

}

async function fetchBudgetOfType(expenseType: string | undefined) {
    const responseWrapper = await fetchBudget();

    if (responseWrapper.response.ok) {
        const data = responseWrapper.data;

        if (expenseType) {
            const typesBudget = data.typesBudget as typesBudgetTypeDeclaration;
            const budget = typesBudget[expenseType as keyof typesBudgetTypeDeclaration];
            return budget;
        } else {
            return data.monthBudget;
        }

    }
    return 0;


}


export default GaugeChartBudget;