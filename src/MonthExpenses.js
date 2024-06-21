import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import createUrlParams
    from "./utils/createURLParams";
import types from "./utils/types";

export default function MonthExpenses() {
    const params = useParams();
    const month = params.month;
    const year = params.year;
    const [allExpensesList, setAllExpensesList] = useState(<ul></ul>);
    const [totalSpent, setTotalSpent] = useState([0, 0]);
    const [expensesOfATypeList, setExpensesOfATypeList] = useState(<ul></ul>);
    const [singleTypeFlag, setSingleTypeFLag] = useState(false);
    const [totalSpentOfASingleType, setTotalSpentOfASingleType] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);
    useEffect(() => {
        getAllExpenses(month, year, setAllExpensesList, setTotalSpent, setTotalEarned);
    }, [month, year]);

    const seeExpensesOfAType = <form onSubmit={(event) => {
        getExpensesOfAType(event,
            month,
            year,
            setExpensesOfATypeList,
            setSingleTypeFLag,
            setTotalSpentOfASingleType)}}>

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

        <input type={'radio'} id={'home'} value={types.HOME} name={'type'} autoComplete={'off'}/>
        <label htmlFor="home">Home</label>

        <input type={'radio'} id={'recreational_purchase'} value={types.RECREATIONAL_PURCHASE} name={'type'} autoComplete={'off'}/>
        <label htmlFor="recreational_purchase">Recreational Purchase</label>

        <input type={'radio'} id={'rent'} value={types.RENT} name={'type'} autoComplete={'off'}/>
        <label htmlFor="rent">Rent</label>

        <input type={'radio'} id={'gift'} value={types.GIFT} name={'type'} autoComplete={'off'}/>
        <label htmlFor="gift">Gift</label>


        <input type={'radio'} id={'other'} value={types.OTHER} name={'type'} autoComplete={'off'}/>
        <label htmlFor="other">Other</label>
        <button >See Expenses of a Type</button>

    </form>

    return (<>
            {seeExpensesOfAType}
            {!singleTypeFlag ? 'All Expenses:' : 'All Expenses of a Type'}
            {!singleTypeFlag ? allExpensesList : expensesOfATypeList}
            <br/>
            {!singleTypeFlag ? 'Total Spent on month:' :'Total Spent on month for a single type:'}
            {!singleTypeFlag ? totalSpent[0] : totalSpentOfASingleType}
            <br/>
            {!singleTypeFlag ? `Your budget is: ${totalSpent[1]}` : `Your budget for this type is: ${totalSpentOfASingleType}`}
            <br/>
            {!singleTypeFlag && `You earned/received: ${totalEarned} euros`};
        </>
    );

}

function getAllExpenses(month, year, setAllExpensesList, setTotalSpent, setTotalEarned) {


    fetch(`http://localhost:8080/getExpenseForMonth/${month}/${year}`).then(res => {
        console.log(res);
        // get the data
        res.json().then(data => {
            console.log(data);
            let totalSpent = 0;
            const list = <ul>
                {data.expenses.map( expense =>

                    {
                        // add it to the total spent
                        const spent = parseFloat(expense.amount);
                        totalSpent += spent;
                        const total = `Amount: ${expense.amount}`;
                        const type = `Type: ${expense.type}`;
                        const notes = `Notes: ${expense.notes}`;
                        const date = `Date: ${expense.date}`;
                        const div = <div>{total} {type} {notes} {date}</div>
                        return <li key={expense._id}>{div}</li>}
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
 * Queries all the expenses of a single type
 * @param event
 * @param month
 * @param year
 * @param {Function} setExpensesOfATypeList
 * @param {Function} setSingleTypeFLag
 * @param {Function} setTotalSpentOfASingleType
 */
function getExpensesOfAType(event, month, year, setExpensesOfATypeList, setSingleTypeFLag, setTotalSpentOfASingleType) {
    // prevent default
    event.preventDefault();
    const urlData = createUrlParams(event.nativeEvent.srcElement);
    fetch(`http://localhost:8080/getExpensesOfType/${month}/${year}`, {
        method: 'POST',
        body: urlData
    }).then(res => {
        console.log(res);
        // get the data
        res.json().then(data => {
            console.log(data);
            let totalSpent = 0;

            const list = <ul>
                {data.expenses.map( expense =>

                    {
                        // add it to the total spent
                        const spent = parseFloat(expense.amount);
                        totalSpent += spent;
                        console.log(expense.amount);
                        console.log(expense._id);
                        const total = `Amount: ${expense.amount}`;
                        const type = `Type: ${expense.type}`;
                        const notes = `Notes: ${expense.notes}`;
                        const date = `Date: ${expense.date}`;
                        const div = <div>{total} {type} {notes} {date}</div>
                        return <li key={expense._id}>{div}</li>}
                )}
            </ul>;
            setExpensesOfATypeList(list);
            // set the total spent
            setTotalSpentOfASingleType(totalSpent);
            setSingleTypeFLag(true);
        }) // end of res.json().then()
    }).catch(err => console.error(err))
    // set the total spent
} // end of getExpensesOfAType

