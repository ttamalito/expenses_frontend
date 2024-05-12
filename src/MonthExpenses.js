import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function MonthExpenses() {
    const params = useParams();
    const month = params.month;
    const year = params.year;
    const [allExpensesList, setAllExpensesList] = useState(<ul></ul>);
    const [totalSpent, setTotalSpent] = useState(0);
    useEffect(() => {
        getAllExpenses(month, year, setAllExpensesList, setTotalSpent);
    }, [month, year]);

    return (<>
            All Expenses:
            {allExpensesList}
            Total Spent on month:
            {totalSpent}
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
                        const div = <div>{total} {type} {notes}</div>
                        return <li key={expense._id}>{div}</li>}
                )}
            </ul>
            setAllExpensesList(list);
            // set the total spent
            setTotalSpent(totalSpent);
        })
    }).catch(err => console.error(err))
    // set the total spent

}