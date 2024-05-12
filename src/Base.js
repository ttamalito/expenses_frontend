
export default function Base() {

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
        <input type="number" placeholder={'month'} name={'month'}/>
        <input type="number" placeholder={'year'} name={'year'}/>
        <input type="text" placeholder={'type'} name={'type'} autoComplete={'off'}/>
        <input type="text" placeholder={'notes'} name={'notes'} autoComplete={'off'}/>
        <button >Add Expense</button>

    </form>
    return (
        <div className="App">
            <h1>Hello World</h1>
            {h2}
            {getExpenseForMonth}
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
