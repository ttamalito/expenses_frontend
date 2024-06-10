import {useEffect, useState} from "react";

export default function SetUp() {
    // query the setup
    const [monthBudget, setMonthBudget] = useState(0);
    const [typesBudget, setTypesBudget] = useState({});
    useEffect(() => {
        querySetUp(setMonthBudget, setTypesBudget);
    }, []);

    const setUpForm = <form>
        <label htmlFor="month_budget">Month Budget:</label>
        <input type="number" placeholder={'Month Budget'} value={monthBudget} id={'month_budget'} name={'monthBudget'}/>
        <br/>
        <label htmlFor="essential_food_budget">Essential Food</label>
        <input type="number" placeholder={'Essential Food buget'} value={typesBudget.essential_food}
        id={'essential_food_budget'} name={'essential_food'}/>
        <br/>
        <label htmlFor="non_essential_food">Non Essential Food</label>
        <input type="number" placeholder={'Non Essential Food budget'} value={typesBudget.non_essential_food}
        id={'non_essential_food'} name={'non_essential_food'}/>
        <br/>
        <label htmlFor="party">Party Budget</label>
        <input type="number" placeholder={'party budget'} value={typesBudget.party}
        id={'party'} name={'party'}/>
        <br/>
        <label htmlFor="phone">Phone Budget</label>
        <input type="number" placeholder={'phone budget'} value={typesBudget.phone}
        id={'phone'} name={'phone'}/>
        <br/>

    </form>;

    return (
        <>
            This is to set up your budget of 2024
            Month budget: {monthBudget}
            Types Dubget: {typesBudget.essential_food}
            {setUpForm}
        </>
    )
} // end of SetUP



function querySetUp(setMonthBudget, setTypesBudget) {

    // send the request
    fetch(`http://localhost:8080/getSetUp/2024`, {
        method: 'GET',
    }).then(res => {
        console.log(res);
        // get the data
        res.json().then(data => {
            if (data.result) {
                console.log(data);
                setMonthBudget(data.setUp.monthBudget);
                setTypesBudget(data.setUp.typesBudget);
            } // the query was successful

        })
    }).catch(err => console.error(err))

} // end of querySetUP