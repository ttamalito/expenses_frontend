import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import createUrlParams
    from "./utils/createURLParams";

export default function MonthExpenses() {
    const params = useParams();
    const month = params.month;
    const year = params.year;
    const [allExpensesList, setAllExpensesList] = useState(<ul></ul>);
    const [totalSpent, setTotalSpent] = useState(0);
    const [expensesOfATypeList, setExpensesOfATypeList] = useState(<ul></ul>);
    const [singleTypeFlag, setSingleTypeFLag] = useState(false);
    const [totalSpentOfASingleType, setTotalSpentOfASingleType] = useState(0);

    useEffect(() => {
        getAllExpenses(month, year, setAllExpensesList, setTotalSpent);
    }, [month, year]);

    const seeExpensesOfAType = <form onSubmit={(event) => {
        getExpensesOfAType(event,
            month,
            year,
            setExpensesOfATypeList,
            setSingleTypeFLag,
            setTotalSpentOfASingleType)}}>

        <input type={'radio'} id={'essential_food'} value={'essential_food'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="essential_food">Essential Food</label>

        <input type={'radio'} id={'non_essential_food'} value={'non_essential_food'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="non_essential_food">Non Essential Food</label>

        <input type={'radio'} id={'party'} value={'party'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="party">Party</label>

        <input type={'radio'} id={'phone'} value={'phone'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="phone">Phone</label>

        <input type={'radio'} id={'insurance'} value={'insurance'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="insurance">Insurance</label>

        <input type={'radio'} id={''} value={''} name={'type'} autoComplete={'off'}/>
        <label htmlFor=""></label>

        <input type={'radio'} id={'cash'} value={'cash'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="cash">Cash</label>

        <input type={'radio'} id={'home'} value={'home'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="home">Home</label>

        <input type={'radio'} id={'recreational_purchase'} value={'recreational_purchase'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="recreational_purchase">Recreational Purchase</label>

        <input type={'radio'} id={'rent'} value={'rent'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="rent">Rent</label>

        <input type={'radio'} id={'gift'} value={'gift'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="gift">Gift</label>


        <input type={'radio'} id={'other'} value={'other'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="other">Other</label>

        <input type="text" placeholder={'notes'} name={'notes'} autoComplete={'off'}/>
        <button >See Expenses of a Type</button>

    </form>

    return (<>
            {seeExpensesOfAType}
            {!singleTypeFlag ? 'All Expenses:' : 'All Expenses of a Type'}
            {!singleTypeFlag ? allExpensesList : expensesOfATypeList}
            {!singleTypeFlag ? 'Total Spent on month:' :'Total Spent on month for a single type:'}
            {!singleTypeFlag ? totalSpent : totalSpentOfASingleType}
        </>
    );

}

function getAllExpenses(month, year, setAllExpensesList, setTotalSpent) {


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
            </ul>
            setAllExpensesList(list);
            // set the total spent
            setTotalSpent(totalSpent);
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
                {data.expenses[0].map( expense =>

                    {
                        // add it to the total spent
                        const spent = parseFloat(expense.amount);
                        totalSpent += spent;
                        console.log(expense.amount);
                        console.log(expense._id);
                        const total = `Amount: ${expense.amount}`;
                        const type = `Type: ${expense.type}`;
                        const notes = `Notes: ${expense.notes}`;
                        const div = <div>{total} {type} {notes}</div>
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

