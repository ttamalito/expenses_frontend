import {useParams} from "react-router-dom";
import {useEffect} from "react";

export default function MonthExpenses() {
    const params = useParams();
    const month = params.month;
    const year = params.year;
    useEffect(() => {
        getAllExpenses(month, year);
    }, [month, year]);



}

function getAllExpenses(month, year) {
    fetch(`http://localhost:8080/getExpenseForMonth/${month}/${year}`).then(res => {
        console.log(res);
        // get the data
        res.json().then(data => {
            console.log(data);
        })
    }).catch(err => console.error(err))
}