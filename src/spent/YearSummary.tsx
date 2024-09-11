import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BACKEND_URL} from "../constants";
import types from "../utils/types";
import createUrlParams
    from "../utils/createURLParams";
import {
    createListOfExpenses
} from "./utils/createListOfExpenses";
import React from "react";
import fetchTotalEarnedInYear from "./utils/fetchTotalEarnedInYear";
/**
 * Renders the MonthExpenses component, displaying all expenses and total spent for a specific month.
 * Allows the user to filter expenses by type and view total spent on a single type.
 *
 * @return {JSX.Element} The JSX element displaying the MonthExpenses component.
 */
export default function YearSummary() {
    const params = useParams();
    const year = params.year;
    const [allExpensesList, setAllExpensesList] = useState(<ul></ul>);
    // the first entry is the total spent for all types and the second entry is the budget for the month
    const [totalSpent, setTotalSpent] = useState(0);
    const [expensesOfATypeList, setExpensesOfATypeList] = useState(<ul></ul>);
    const [singleTypeFlag, setSingleTypeFLag] = useState(false);
    const [totalSpentOfASingleType, setTotalSpentOfASingleType] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);
    // use to keep the budget
    const [budget, setBudget] = useState(0);
    // used to keep track to the selected type when displaying the expenses of a single type
    const [singleType, setSingleType]= useState('');
    useEffect(() => {
        getTotalSpentOnAYear(year, setTotalSpent);
        retrieveTotalEarnedInAYear(year, setTotalEarned);
    }, [year]);

    const seeExpensesOfAType = <form onSubmit={(event) => getExpensesOfAType(
        event,
        year,
        setExpensesOfATypeList,
        setSingleTypeFLag,
        setSingleType,
        setTotalSpentOfASingleType
    )}>

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
            <br/>
            {returnHome}
            <br/>
            <br/>
            {!singleTypeFlag ? 'All Expenses:' : 'All Expenses of a Type'}
            {!singleTypeFlag ? allExpensesList : expensesOfATypeList}
            <br/>
            {!singleTypeFlag ? 'Total Spent on a year:' :'Total Spent on a year for a single type:'}
            {!singleTypeFlag ? totalSpent : totalSpentOfASingleType}
            <br/>
            {!singleTypeFlag ? `Your monthly budget is: {budget.monthBudget}` : `Your monthly budget for '${singleType}' this type is: {budget.typesBudget[singleType]} euros`};
            <br/>
            {!singleTypeFlag && `You earned/received: ${totalEarned} euros`};
        </>
    );

} // end of component

/**
 * Retrieves the total amount spent for a specific year from the backend API.
 *
 * @param {string} year - The year for which the total spent is to be retrieved.
 * @param {Function} setTotalSpent - A function to set the total amount spent for the year.
 */
function getTotalSpentOnAYear(year: string | undefined, setTotalSpent: { (value: React.SetStateAction<number>): void; (arg0: number): void; }) {
    fetch(`${BACKEND_URL}/expenses/total-spent?year=${year}`, {
        method: 'GET',
        credentials: "include",
    }).then(res => {
        console.log('Getting the total spent');
        console.log(res);
        if (res.status === 500) {
            console.log('Failed to get the total spent');
            alert('Failed to get the total spent');
            setTotalSpent(0);
        }
        if (res.status === 200) {
            res.json().then(data => {
                console.log(data);
                setTotalSpent(data.totalSpent);
            })
        }
    }).catch(err => console.error(err));
} // end of getTotalSpentOnAYear

/**
 * Queries all the expenses of a single type
 * @param event
 * @param year
 * @param setExpensesOfATypeList
 * @param setSingleTypeFLag
 * @param setSingleType
 * @param setTotalSpentOfASingleType
 */

function getExpensesOfAType(event: React.FormEvent<HTMLFormElement>, 
    year: string | undefined,  
    setExpensesOfATypeList: { (value: React.SetStateAction<React.JSX.Element>): void; (arg0: React.JSX.Element): void; }, 
    setSingleTypeFLag: { (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; }, 
    setSingleType: { (value: React.SetStateAction<string>): void; (arg0: string): void; }, 
    setTotalSpentOfASingleType: { (value: React.SetStateAction<number>): void; (arg0: any): void; }) {
    event.preventDefault();
    // get the type from the event
    const urlData = createUrlParams(event.nativeEvent.srcElement);
    const type = urlData.get('type');
    if (!type) {
        throw new Error('No type provided');
    }
    setSingleType(type);
    console.log(type);
    fetch(`${BACKEND_URL}/expenses/single-type?year=${year}&type=${type}`, {
        method: 'GET',
        credentials: "include",
    }).then(res => {
        console.log(res);
        if (res.status === 500) {
            console.log('Failed to get the expenses of a type');
            alert('Failed to get the expenses of a type');
            setExpensesOfATypeList(<ul></ul>);
        }
        if (res.status === 200) {
            res.json().then(data => {
                console.log(data);
                const expenses = createListOfExpenses(data.expenses)
                const expensesList = expenses.list;
                const totalSpent = expenses.totalSpent;
                setExpensesOfATypeList(expensesList);
                setSingleTypeFLag(true);
                setTotalSpentOfASingleType(totalSpent);
            })
        }
    }).catch(err => console.error(err));
} // end of getExpensesOfAType

function retrieveTotalEarnedInAYear(year: string | undefined , setTotalEarned: { (value: React.SetStateAction<number>): void; (arg0: number): void; }) {
    if (!year) {
        alert('No year provided');
        throw new Error('No year provided');
    }
    const yearAsNumber = parseInt(year);
    if (isNaN(yearAsNumber)) {
        alert('Invalid year');
        throw new Error('Invalid year');
    }
    fetchTotalEarnedInYear(yearAsNumber).then(totalEarned => {
        if (totalEarned === undefined) {
            alert('Failed to get the total earned');
            return;
        }
        setTotalEarned(totalEarned);
    }).catch(err => console.error(err));

} // end of retrieveTotalEarnedInAYear