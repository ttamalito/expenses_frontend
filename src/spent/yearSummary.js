import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import createUrlParams
    from "./utils/createURLParams";
import types from "../utils/types";
/**
 * Renders the MonthExpenses component, displaying all expenses and total spent for a specific month.
 * Allows the user to filter expenses by type and view total spent on a single type.
 *
 * @return {JSX.Element} The JSX element displaying the MonthExpenses component.
 */
export default function yearSummary() {
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
    // use to keep the budget
    const [budget, setBudget] = useState(0);
    // used to keep track to the selected type when displaying the expenses of a single type
    const [singleType, setSingleType]= useState('');
    useEffect(() => {
        getAllExpenses(month, year, setAllExpensesList, setTotalSpent, setTotalEarned);
        getBudget(year, setBudget);
    }, [month, year]);

    const seeExpensesOfAType = <form>

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
            {!singleTypeFlag ? 'Total Spent on month:' :'Total Spent on month for a single type:'}
            {!singleTypeFlag ? totalSpent[0] : totalSpentOfASingleType}
            <br/>
            {!singleTypeFlag ? `Your budget is: ${budget.monthBudget}` : `Your budget for this type is: ${budget.typesBudget[singleType]} euros`};
            <br/>
            {!singleTypeFlag && `You earned/received: ${totalEarned} euros`};
        </>
    );

}