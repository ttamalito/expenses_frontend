
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import createUrlParams
    from "../../utils/createURLParams";
import types from "../../utils/types";
import monthBudgetType from "../../utils/types/monthBudgetType";
import OneExpenseSummary
    from "../../expensesComponents/OneExpenseSummary";
import React from "react";
import typesBudgetTypeDeclaration from "../../utils/typesBudgetTypeDeclaration";
//import {ExpensesDataGrid} from "./spent/expensesDataGrid/ExpensesDataGrid";
import {ExpensesDataGrid} from "../expensesDataGrid/ExpensesDataGrid";
import OneExpenseSummaryTypeDeclaration from "../../expensesComponents/utils/types/OneExpenseSummaryType";
import {retrieveBudgetForAYear} from "../../budget/requests/paths";
import {fetchExpensesOfATypeForAMonthPath, fetchAllExpensesForAMonthPath} from "../requests/paths";
import SelectExpenseTypes from "../shared/SelectExpenseTypes";
/**
 * Renders the MonthExpenses component, displaying all expenses and total spent for a specific month.
 * Allows the user to filter expenses by type and view total spent on a single type.
 *
 * @return {JSX.Element} The JSX element displaying the MonthExpenses component.
 */
export default function MonthExpenses() {
    const params = useParams();
    const month = params.month;
    const year = params.year;
    const [allExpensesList, setAllExpensesList] = useState(<ul></ul>);
    // the first entry is the total spent for all types and the second entry is the budget for the month
    const [totalSpent, setTotalSpent] = useState([0, 0]);
    const [expensesOfATypeList, setExpensesOfATypeList] = useState(<ul></ul>);
    const [singleTypeFlag, setSingleTypeFLag] = useState(false);
    const [totalSpentOfASingleType, setTotalSpentOfASingleType] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);
    const [expenses, setExpenses] = useState<OneExpenseSummaryTypeDeclaration[]>([]);
    // use to keep the budget
    // @ts-ignore
    const [budget, setBudget] = useState<monthBudgetType>({monthBudget: 0, typesBudget: undefined});
    // used to keep track to the selected type when displaying the expenses of a single type
    const [singleType, setSingleType]= useState('');
    useEffect(() => {
        getAllExpenses(month, year, setAllExpensesList, setTotalSpent, setTotalEarned, setExpenses);
        getBudget(year, setBudget);
    }, [month, year]);

    const seeExpensesOfAType = <form onSubmit={(event) => {
        getExpensesOfAType(event,
            month,
            year,
            setExpensesOfATypeList,
            setSingleTypeFLag,
            setTotalSpentOfASingleType, setSingleType, setExpenses)}}>

        <input type={'radio'} id={'essential_food'} value={types.ESSENTIAL_FOOD} name={'type'} autoComplete={'off'}/>
        <label htmlFor="essential_food">Essential Food</label>

        <input type={'radio'} id={'non_essential_food'} value={types.NON_ESSENTIAL_FOOD} name={'type'} autoComplete={'off'}/>
        <label htmlFor="non_essential_food">Non Essential Food</label>

        <input type={'radio'} id={'party'} value={types.PARTY} name={'type'} autoComplete={'off'}/>
        <label htmlFor="party">Party</label>

        <input type={'radio'} id={'phone'} value={types.PHONE} name={'type'} autoComplete={'off'}/>
        <label htmlFor="phone">Phone</label>

        <input type={'radio'} id={'insurance'} value={types.INSURANCE} name={'type'} autoComplete={'off'}/>
        <label htmlFor="insurance">Insurance</label>

        <input type={'radio'} id={'income'} value={types.INCOME} name={'type'} autoComplete={'off'}/>
        <label htmlFor="income">Income</label>

        <input type={'radio'} id={'cash'} value={types.CASH} name={'type'} autoComplete={'off'}/>
        <label htmlFor="cash">Cash</label>
        <br/>
        <input type={'radio'} id={'home'} value={types.HOME} name={'type'} autoComplete={'off'}/>
        <label htmlFor="home">Home</label>

        <input type={'radio'} id={'recreational_purchase'} value={types.RECREATIONAL_PURCHASE} name={'type'} autoComplete={'off'}/>
        <label htmlFor="recreational_purchase">Recreational Purchase</label>

        <input type={'radio'} id={'rent'} value={types.RENT} name={'type'} autoComplete={'off'}/>
        <label htmlFor="rent">Rent</label>

        <input type={'radio'} id={'gift'} value={types.GIFT} name={'type'} autoComplete={'off'}/>
        <label htmlFor="gift">Gift</label>
        <br/>
        <input type={'radio'} id={types.VACATION} value={types.VACATION} name={'type'} autoComplete={'off'}/>
        <label htmlFor={types.VACATION}>Vacation</label>

        <input type={'radio'} id={types.SAVINGS} value={types.SAVINGS} name={'type'} autoComplete={'off'}/>
        <label htmlFor={types.SAVINGS}>Savings</label>

        <input type={'radio'} id={types.INVESTMENT} value={types.INVESTMENT} name={'type'} autoComplete={'off'}/>
        <label htmlFor={types.INVESTMENT}>Investment</label>
        <br/>

        <input type={'radio'} id={types.GYM} value={types.GYM} name={'type'} autoComplete={'off'}/>
        <label htmlFor={types.GYM}>Gym</label>

        <input type={'radio'} id={types.MEDICINE} value={types.MEDICINE} name={'type'} autoComplete={'off'}/>
        <label htmlFor={types.MEDICINE}>Medicine</label>
        <br/>

        <input type={'radio'} id={types.CLOTHES} value={types.CLOTHES} name={'type'} autoComplete={'off'}/>
        <label htmlFor={types.CLOTHES}>Clothes</label>

        <input type={'radio'} id={types.UNIVERSITY} value={types.UNIVERSITY} name={'type'} autoComplete={'off'}/>
        <label htmlFor={types.UNIVERSITY}>University</label>
        <br/>

        <input type={'radio'} id={'other'} value={types.OTHER} name={'type'} autoComplete={'off'}/>
        <label htmlFor="other">Other</label>
        <br/>
        <button >See Expenses of a Type</button>

    </form>

    const returnHome = <a href="/">Return Home</a>;

    return (<>
            {seeExpensesOfAType}
            {<SelectExpenseTypes />}
            <br/>
            {returnHome}
            <br/>
            <br/>
            {!singleTypeFlag ? 'All Expenses:' : 'All Expenses of a Type'}
            {/*{!singleTypeFlag ? allExpensesList : expensesOfATypeList}*/}
            <br/>
            {!singleTypeFlag ? 'Total Spent on month:' :'Total Spent on month for a single type:'}
            {!singleTypeFlag ? totalSpent[0] : totalSpentOfASingleType}
            <br/>
            {!singleTypeFlag ? `Your budget is: ${budget.monthBudget}` : `Your budget for this type is: ${budget.typesBudget[singleType as keyof typesBudgetTypeDeclaration]} euros`};
            <br/>
            {!singleTypeFlag && `You earned/received: ${totalEarned} euros`};
            {/*<ExpensesDataGrid />*/}
            <ExpensesDataGrid expenses={expenses}/>
        </>
    );

}

/**
 * Retrieves all expenses for a specific month and updates the total spent and total earned.
 *
 * @param {string} month - The month for which expenses are to be retrieved.
 * @param {string} year - The year for which expenses are to be retrieved.
 * @param {Function} setAllExpensesList - A function to set the list of all expenses.
 * @param {Function} setTotalSpent - A function to set the total spent.
 * @param {Function} setTotalEarned - A function to set the total earned.
 */
function getAllExpenses(month: string | undefined, year: string | undefined, setAllExpensesList: {
    (value: React.SetStateAction<React.JSX.Element>): void;
    (arg0: React.JSX.Element): void;
}, setTotalSpent: { (value: React.SetStateAction<number[]>): void; (arg0: any[]): void; },
                        setTotalEarned: { (value: React.SetStateAction<number>): void; (arg0: number): void; },
                        setExpenses: { (value: React.SetStateAction<OneExpenseSummaryTypeDeclaration[]>): void; (arg0: any[]): void; }) {


    const url = fetchAllExpensesForAMonthPath(year as string, month as string);
    fetch(url).then(res => {
        console.log(res);
        // get the data
        res.json().then(data => {
            // console.log(data);
            let totalSpent = 0;
            setExpenses(data.expenses);
            const list = <ul>
                {data.expenses.map( (expense: { amount: any; _id: any; type: string; notes: string; date: string; }) =>

                    {
                        // add it to the total spent
                        const spent = parseFloat(expense.amount);
                        totalSpent += spent;
                        // const total = `Amount: ${expense.amount}`;
                        // const type = `Type: ${expense.type}`;
                        // const notes = `Notes: ${expense.notes}`;
                        // const date = `Date: ${expense.date}`;
                        // const div = <div>{total} {type} {notes} {date}</div>
                        const expenseSummary = <OneExpenseSummary expense={expense} />
                        return <li key={expense._id}>{expenseSummary}</li>}
                )}
            </ul>;
            // get the amount of money received in the month
            let income = 0;
            for (const value of data.incomes) {
                income += parseFloat(value.amount);
            }

            setAllExpensesList(list);
            // set the total spent
            setTotalSpent([totalSpent, data.monthBudget]);
            // setTotal Received
            setTotalEarned(income)
        })
    }).catch(err => console.error(err))
    // set the total spent

} // end of getExpenses

/**
 * Retrieves the budget for a specific year and updates the budget state.
 *
 * @param {string} year - The year for which the budget is to be retrieved.
 * @param {Function} setBudget - A function to set the budget state.
 * @returns {void}
 */
function getBudget(year: string | undefined,
                   setBudget: { (value: React.SetStateAction<monthBudgetType>): void; (arg0: any): void; }) {

    const url = retrieveBudgetForAYear(parseInt(year as string));
    fetch(url, {
        method: 'GET',
    }).then(res => {
        console.log(res);
        // get the data
        res.json().then(data => {
            if (data.result) {
                console.log(data.setUp);
                setBudget(data.setUp);
            } // the query was successful

        })
    }).catch(err => console.error(err))
} // end of getBudget

/**
 * Queries all the expenses of a single type
 * @param event
 * @param month
 * @param year
 * @param {Function} setExpensesOfATypeList
 * @param {Function} setSingleTypeFLag
 * @param {Function} setTotalSpentOfASingleType
 * @param setSingleType
 * @param {Function} setExpenses
 */
function getExpensesOfAType(event: React.FormEvent<HTMLFormElement>,
                            month: string | undefined,
                            year: string | undefined,
                            setExpensesOfATypeList: { (value: React.SetStateAction<React.JSX.Element>): void; (arg0: React.JSX.Element): void; },
                            setSingleTypeFLag: { (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; },
                            setTotalSpentOfASingleType: { (value: React.SetStateAction<number>): void; (arg0: number): void; },
                            setSingleType: { (value: React.SetStateAction<string>): void; (arg0: string): void; },
                            setExpenses: { (value: React.SetStateAction<OneExpenseSummaryTypeDeclaration[]>): void; (arg0: any[]): void; }) {
    // prevent default
    event.preventDefault();
    const urlData = createUrlParams(event.currentTarget);
    const url = fetchExpensesOfATypeForAMonthPath(year as string, month as string)
    fetch(url, {
        method: 'POST',
        body: urlData
    }).then(res => {
        console.log(res);
        // get the data
        res.json().then(data => {
            console.log(data);
            let totalSpent = 0;
            setExpenses(data.expenses);

            const list = <ul>
                {data.expenses.map( (expense: { amount: any; _id: any; type: string; notes: string; date: string; }) =>

                    {
                        // add it to the total spent
                        const spent = parseFloat(expense.amount);
                        totalSpent += spent;
                        console.log(expense.amount);
                        console.log(expense._id);
                        // const total = `Amount: ${expense.amount}`;
                        // const type = `Type: ${expense.type}`;
                        // const notes = `Notes: ${expense.notes}`;
                        // const date = `Date: ${expense.date}`;
                        const div = <OneExpenseSummary expense={expense} />//<div>{total} {type} {notes} {date}</div>
                        return <li key={expense._id}>{div}</li>}
                )}
            </ul>;
            setExpensesOfATypeList(list);
            // set the total spent
            setTotalSpentOfASingleType(totalSpent);
            setSingleTypeFLag(true);
            const singleTypeSelected = urlData.get('type');
            if (!singleTypeSelected) {
                alert('No correct types was selected')
                throw new Error('No type was selected');

            }
            setSingleType(singleTypeSelected);
        }) // end of res.json().then()
    }).catch(err => console.error(err))
    // set the total spent
} // end of getExpensesOfAType

