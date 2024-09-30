import { Gauge } from '@mui/x-charts/Gauge';
import ExpensesTypesTypesDeclarations from "../utils/expensesTypesTypesDeclarations";
import expensesTypes from "../utils/types";
import fetchBudget from "../budget/requests/fetchBudget";
import React, {useEffect} from 'react';
import typesBudgetTypeDeclaration from "../utils/typesBudgetTypeDeclaration";

interface IGaugeChartBudgetProps {
    expenseType: string | undefined;
}

function GaugeChartBudget({expenseType}: IGaugeChartBudgetProps) {
    const [budget, setBudget] = React.useState<number>(0);

    useEffect(() => {
       fetchBudgetOfType(expenseType).then( maxValue => {
              setBudget(maxValue);
       }).catch(error => {console.error(error)});
    });

    return (
        <>
            {(expenseType !== undefined) ? `Total spent on ${expenseType}  according to budget:` : `Total spent on month according to budget:`}
            <Gauge
                width={100}
                height={100}
                value={50}
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