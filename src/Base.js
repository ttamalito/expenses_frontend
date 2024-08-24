import types from "./utils/types";
import {goToLink} from "./utils/goToLinkFromForm";

export default function Base() {
    // setup the maximum for expenses and other settings
    const setUp = <a href={'/setUp'}>Set Up your expenses </a>
    // view the expenses
    const h2 = <h2>See expenses for a specific month</h2>
    const getExpenseForMonth = <form onSubmit={(event) => {expenseForAMonth(event)}}
    >
        <input type="number" placeholder={'month'} name={'month'}/>
        <input type="number" placeholder={'year'} name={'year'}/>
        <button>See Expenses</button>
</form>

    // add an expense
    const form = <form onSubmit={(event) => {submitData(event)}}>
        <input type="text" placeholder={'amount'} name={'amount'} autoComplete={'off'}/>
        <br/>
        <input type="number" placeholder={'month'} name={'month'}/>
        <input type="number" placeholder={'year'} name={'year'}/>
        <br/>
        <input type="text" placeholder={'date'} name={'date'}/>
        <br/>
        <label htmlFor="">Expense or Income?:</label>
        <input type={'radio'} id={'expense'} value={'expense'} name={'transaction'} autoComplete={'off'}/>
        <label htmlFor="expense">Expense</label>

        <input type={'radio'} id={'income'} value={'income'} name={'transaction'} autoComplete={'off'}/>
        <label htmlFor="income">Income</label>
        <br/>
        <label htmlFor="">Type of transaction:</label>
        <input type={'radio'} id={'essential_food'} value={'essential_food'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="essential_food">Essential Food</label>

        <input type={'radio'} id={'non_essential_food'} value={'non_essential_food'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="non_essential_food">Non Essential Food</label>
        <br/>
        <input type={'radio'} id={'party'} value={'party'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="party">Party</label>

        <input type={'radio'} id={'phone'} value={'phone'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="phone">Phone</label>
        <br/>
        <input type={'radio'} id={'insurance'} value={'insurance'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="insurance">Insurance</label>

        <input type={'radio'} id={'income'} value={'income'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="income">Income</label>

        <input type={'radio'} id={'home'} value={'home'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="home">Home</label>
        <br/>
        <input type={'radio'} id={'recreational_purchase'} value={'recreational_purchase'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="recreational_purchase">Recreational Purchase</label>

        <input type={'radio'} id={'rent'} value={'rent'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="rent">Rent</label>
        <br/>
        <input type={'radio'} id={'gift'} value={'gift'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="gift">Gift</label>


        <input type={'radio'} id={'other'} value={'other'} name={'type'} autoComplete={'off'}/>
        <label htmlFor="other">Other</label>
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
        <input type="text" placeholder={'notes'} name={'notes'} autoComplete={'off'}/>
        <br/>
        <button >Add Expense</button>

    </form>

    const yearlySummary = <form onSubmit={(event) => {
        goToLink(event, 'year', 'summary');
    }}>
        <label htmlFor="year">Go To Yearly Summary</label>
        <br/>
        <input type="number" placeholder={'year'} name={'year'}/>
        <button>Go To Summary</button>
    </form>


    return (
        <div className="App">
            <h1>Expenses Manager</h1>
            {setUp}
            {h2}
            <br/>

            {getExpenseForMonth}
            <br/>
            {yearlySummary}
            <br/>
            {'Add a transaction'}
            {form}
        </div>
    );
}

function expenseForAMonth(event) {
    event.preventDefault();
    const urlData = createUrlParams(event.nativeEvent.srcElement);
    const month = urlData.get('month');
    const year = urlData.get('year');
    window.location.href = `/expensesMonth/${month}/${year}`
}

function submitData(event) {
    event.preventDefault();
    const urlData = createUrlParams(event.nativeEvent.srcElement);

    fetch(`http://localhost:8080/addExpense`, {
        method: "POST",
        body: urlData,
    }).then(res => {
        console.log(res);

        // get the data
        res.json().then(data => {
            console.log(data);
            if (data.result) {
                // allgucci
                alert('Your expense was recorded');
                event.target.reset()
            }
        })
    }).catch(err => console.error(err));
} // end of submitdata

function createUrlParams(form) {
    // get the form data
    const formData = new FormData(form);

    // create the urlParams
    const urlData = new URLSearchParams();
    for (const pair of formData) {
        console.log(pair[0], pair[1]);
        urlData.append(pair[0], pair[1]);
    }

    return urlData;
}
