import {useEffect, useRef, useState} from "react";
import createUrlParams
    from "./utils/createURLParams";

export default function SetUp() {
    // query the setup
    const [monthBudget, setMonthBudget] = useState(0);
    const [typesBudget, setTypesBudget] = useState({});
    const monthBudgetRef = useRef(10);
    useEffect(() => {
        querySetUp(setMonthBudget, setTypesBudget, monthBudgetRef);
    }, []);

    const setUpForm = <form onSubmit={(event) => {submitSetUp(event)}}>
        <label htmlFor="month_budget">Month Budget:</label>
        <input type="number" placeholder={'Month Budget'} value={monthBudget} id={'month_budget'} name={'monthBudget_static'}/>
        <br/>
        <label htmlFor="monthBudget">Modify Month Budget:</label>
        <input type="number" placeholder={'Modify Month Budget'} id={'monthBudget'} name={'monthBudget'}/>
        <br/>
        <label htmlFor="essential_food_budget">Essential Food</label>
        <input type="number" placeholder={'Essential Food buget'} defaultValue={typesBudget.essential_food}
        id={'essential_food_budget'} name={'essential_food'}/>
        <br/>
        <label htmlFor="non_essential_food">Non Essential Food</label>
        <input type="number" placeholder={'Non Essential Food budget'} defaultValue={typesBudget.non_essential_food}
        id={'non_essential_food'} name={'non_essential_food'}/>
        <br/>
        <label htmlFor="party">Party Budget</label>
        <input type="number" placeholder={'party budget'} defaultValue={typesBudget.party}
        id={'party'} name={'party'}/>
        <br/>
        <label htmlFor="phone">Phone Budget</label>
        <input type="number" placeholder={'phone budget'} defaultValue={typesBudget.phone}
        id={'phone'} name={'phone'}/>
        <br/>
        <label htmlFor="insurance">Insurance Budget</label>
        <input type="number" placeholder={'insurance budget'} defaultValue={typesBudget.insurance}
        id={'insurance'} name={'insurance'}/>
        <br/>
        <label htmlFor="home">Home Budget</label>
        <input type="number" placeholder={'home budget'} defaultValue={typesBudget.home}
        id={'home'} name={'home'}/>
        <br/>
        <label htmlFor="gift">Gifts Budget</label>
        <input type="number" placeholder={'gift budget'} defaultValue={typesBudget.gift}
        id={'gift'} name={'gift'}/>
        <br/>
        <label htmlFor="recreational_purchase">Recreational Purchases Budget</label>
        <input type="number" placeholder={'recreational_purchase budget'}
        defaultValue={typesBudget.recreational_purchase}
        id={'recreational_purchase'} name={'recreational_purchase'}/>
        <br/>
        <label htmlFor="rent">Rent Budget</label>
        <input type="number" placeholder={'rent budget'} defaultValue={typesBudget.rent}
        id={'rent'} name={'rent'}/>
        <br/>
        <label htmlFor="other">Other Budget</label>
        <input type="number" placeholder={'other budget'} defaultValue={typesBudget.other}
        id={'other'} name={'other'}/>
        <br/>
        <button type={'submit'}>Change Budget</button>
    </form>;

    return (
        <>
            This is to set up your budget of 2024

            {setUpForm}
        </>
    )
} // end of SetUP


/**
 * Queries the setup values from the backend
 * @param setMonthBudget
 * @param setTypesBudget
 */
function querySetUp(setMonthBudget, setTypesBudget, monthBudgetRef) {

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
                monthBudgetRef.current = data.setUp.monthBudget;
                setTypesBudget(data.setUp.typesBudget);
            } // the query was successful

        })
    }).catch(err => console.error(err))

} // end of querySetUP

/**
 * Submits the data to change the set up
 * @param event
 */
function submitSetUp(event) {
event.preventDefault();

const urlData = createUrlParams(event.nativeEvent.srcElement);

fetch(`http://localhost:8080/modifySetUp/2024`, {
    method: 'POST',
    body: urlData
}).then(res => {
    console.log(res);
    // get the data
    res.json().then(data => {
        if (data.result) {
            // all good
            window.location.href = '/'; // go to the homepage
        }
        else {
            alert('Something went wrong... check the backend!')
        }
    })
}).catch(err => console.error(err));
}